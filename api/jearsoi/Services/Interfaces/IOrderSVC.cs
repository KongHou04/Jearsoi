using jearsoi.Models;
using jearsoi.Models.Db;

namespace jearsoi.Services.Interfaces
{
    public interface IOrderSVC
    {
        public ApiResponse Get();
        public ApiResponse GetById(Guid id);
        public ApiResponse GetHistory();
        public ApiResponse GetProcessing();
        public ApiResponse GetUserHistory(AppUser user);
        public ApiResponse GetUserProcessing(AppUser user);
        public Task<ApiResponse> Add(OrderDTO objDTO);
        public ApiResponse UpdateDeliveryStatus(Guid id, int status);
        public ApiResponse UpdatePaymentStatus(Guid id, int status);
        public ApiResponse Delete(Guid id);


    }
}
