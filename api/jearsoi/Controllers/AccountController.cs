using jearsoi.Models;
using jearsoi.Models.Db;
using jearsoi.Models.DTOs;
using jearsoi.Services.Implements;
using jearsoi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace jearsoi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController(IAccountSVC accountSVC) : Controller
    {
        [HttpPost("[action]")]
        public Task<ApiResponse> Register([FromBody]RegisterModel model)
        {
            return accountSVC.Register(model);
        }

        [HttpPost("[action]")]
        public Task<ApiResponse> Login([FromBody]LoginModel model)
        {
            return accountSVC.Login(model);
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshToken([FromBody]TokenModel TokenModel)
        {
            var newToken = await accountSVC.RefreshToken(TokenModel);
            if (newToken != null)
            {
                return Ok(newToken);
            }
            else
            {
                return BadRequest("Refresh token is invalid or expired");
            }
        }


        [HttpGet("getinfo")]
        public async Task<ApiResponse> GetUserInfo()
        {
            ApiResponse response = new ApiResponse();
            var userObj = HttpContext.Items["User"];
            if (userObj == null)
            {
                response.Msg = "Cannot get information";
                response.Errors.Add("Unknown user");
                return response;
            }
            var user = userObj as AppUser;
            if (user == null)
            {
                response.Msg = "Cannot get information";
                response.Errors.Add("Unknown user");
                return response;
            }
            else
            {
                return await accountSVC.GetUserInfo(user.Email!);
            }
        }

    }
}
