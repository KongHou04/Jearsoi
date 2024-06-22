using jearsoi.Models;
using jearsoi.Models.DTOs;

namespace jearsoi.Services.Interfaces
{
    public interface IAccountSVC
    {
        public Task<ApiResponse> Register(RegisterModel model);
        public Task<ApiResponse> Login(LoginModel model);
        public Task<TokenModel?> RefreshToken(TokenModel model);
        public Task<ApiResponse> GetUserInfo(string email);
    }
}
