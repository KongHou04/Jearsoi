using AutoMapper;
using DotK_TechShop.Services;
using jearsoi.Models;
using jearsoi.Models.Db;
using jearsoi.Models.DTOs;
using jearsoi.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace jearsoi.Services.Implements
{
    public class AccountSVC(
        IConfiguration configuration, 
        EmailSender emailSender,
        UserManager<AppUser> userManager, 
        SignInManager<AppUser> signInManager, 
        RoleManager<IdentityRole> roleManager,
        IMapper mapper
        ) : IAccountSVC
    {
        public async Task<ApiResponse> Login(LoginModel model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return new ApiResponse { Msg = "Invalid login attempt." };
            }

            var result = await signInManager.CheckPasswordSignInAsync(user, model.Password, false);
            if (!result.Succeeded)
            {
                return new ApiResponse { Msg = "Invalid login attempt." };
            }

            // Tạo JWT token
            var token = await GenerateJwtToken(user);
            var refreshToken = GenerateRefreshToken();
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.Now.AddDays(7);
            await userManager.UpdateAsync(user);
            return new ApiResponse { Msg = "Login successful", IsSuccess = true, Data = new TokenModel { JwtToken = token, RefreshToken = refreshToken } };
        }

        public async Task<ApiResponse>Register(RegisterModel model)
        {
            var newUser = new AppUser
            {
                Email = model.Email,
                FullName = model.FullName,
                PhoneNumber = model.PhoneNumber,
                PasswordHash = model.Password,
                UserName = model.Email
            };

            var user = await userManager.FindByEmailAsync(newUser.Email);
            if (user is not null) return new ApiResponse { Msg = "User registed already" };
            var createUser = await userManager.CreateAsync(newUser!, model.Password);
            if (!createUser.Succeeded) return new ApiResponse { Msg = "Error occured. Please try again" };

            var checkAdmin = await roleManager.FindByNameAsync("Admin");
            if (checkAdmin is null)
            {
                await roleManager.CreateAsync(new IdentityRole("admin"));
                await userManager.AddToRoleAsync(newUser, "admin");
                return new ApiResponse { Msg = "Account created", IsSuccess = true};
            }
            else
            {
                var checkUser = await roleManager.FindByNameAsync("user");
                if (checkUser is null) 
                    await roleManager.CreateAsync(new IdentityRole("user"));
                await userManager.AddToRoleAsync(newUser, "user");
                try
                {
                    await emailSender.SendEmailAsync(newUser.Email, "Account created", "Now you can access our website to check and manage your orders!!");
                }
                catch (Exception ex) { }
                return new ApiResponse { Msg = "Account created", IsSuccess = true };
            }
        }

        private async Task<string> GenerateJwtToken(AppUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email!),
            };

            var roles = await userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: configuration["Jwt:Issuer"],
                audience: configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(15),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<TokenModel?> RefreshToken(TokenModel model)
        {
            if (model is null || string.IsNullOrWhiteSpace(model.RefreshToken))
            {
                return null;
            }

            var principal = GetPrincipalFromExpiredToken(model.JwtToken);
            var userId = principal?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            var user = await userManager.FindByIdAsync(userId!);
            if (user == null || user.RefreshToken != model.RefreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
            {
                return null;
            }

            var newAccessToken = await GenerateJwtToken(user);
            var newRefreshToken = GenerateRefreshToken();

            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiryTime = DateTime.Now.AddDays(7); // Example expiry time
            await userManager.UpdateAsync(user);

            return new TokenModel
            {
                JwtToken = newAccessToken,
                RefreshToken = newRefreshToken
            };
        }

        private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateIssuerSigningKey = true,
                ValidateLifetime = true,
                ValidIssuer = configuration["Jwt:Issuer"],
                ValidAudience = configuration["Jwt:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!))
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out var securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;

            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                throw new SecurityTokenException("Invalid token");
            }

            return principal;
        }

        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        public async Task<ApiResponse> GetUserInfo(string email)
        {
            var apiResponse = new ApiResponse();

            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
            {
                apiResponse.Errors.Add("Unexpected error occured from server");
                apiResponse.Msg = "Unexpected error occured from server";
                return apiResponse;
            }
            var roles = await userManager.GetRolesAsync(user);
            var userDTO = mapper.Map<AppUser, AppUserDTO>(user);
            userDTO.Role = roles.First();
            apiResponse.IsSuccess = true;
            apiResponse.Data = userDTO;
            apiResponse.Msg = "Get user information successfully";
            return apiResponse;
        }
    }
}
