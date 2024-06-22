using Azure;
using jearsoi.Models;
using jearsoi.Models.Db;
using jearsoi.Services.Implements;
using jearsoi.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace jearsoi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderController(IOrderSVC orderSVC) : Controller
    {
        private readonly IOrderSVC _orderSVC = orderSVC;

        [HttpGet("{id}")]
        public ApiResponse GetById(Guid id)
        {
            return _orderSVC.GetById(id);
        }

        [HttpGet("processing")]
        [Authorize(Roles = "admin")]
        public ApiResponse GetAll()
        {
            return _orderSVC.GetProcessing();
        }

        [HttpGet("userhistory")]
        [Authorize(Roles = "user")]
        public ApiResponse GetUserHistory()
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
                return _orderSVC.GetUserHistory(user);
            }
        }
        [HttpGet("userprocessing")]
        [Authorize(Roles = "user")]
        public ApiResponse GetUserProcessing()
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
                return _orderSVC.GetUserProcessing(user);
            }
        }

        [HttpGet("history")]
        [Authorize(Roles = "admin")]
        public ApiResponse Get()
        {
            return _orderSVC.GetHistory();
        }


        [HttpPost()]
        public async Task<ApiResponse> Add([FromBody]OrderDTO objDTO)
        {
            var userObj = HttpContext.Items["User"];
            if (userObj != null)
            {
                var user = userObj as AppUser;
                if (user != null)
                {
                    objDTO.UserId = user.Id;
                }
            }
            return await _orderSVC.Add(objDTO);
        }

        [HttpPut("updatedeliverystatus")]
        [Authorize(Roles = "admin")]
        public ApiResponse UpdateDeliveryStatus([FromBody]StatusUpdateModel obj)
        {
            return _orderSVC.UpdateDeliveryStatus(obj.Id, obj.Status);
        }

        [HttpPut("updatepaymentstatus")]
        [Authorize]
        public ApiResponse UpdatePaymentStatus([FromBody] StatusUpdateModel obj)
        {
            return _orderSVC.UpdatePaymentStatus(obj.Id, obj.Status);
        }
    }
}
