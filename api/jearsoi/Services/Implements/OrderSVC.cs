using AutoMapper;
using DotK_TechShop.Services;
using jearsoi.Models;
using jearsoi.Models.Db;
using jearsoi.Repositories.Implements;
using jearsoi.Repositories.Interfaces;
using jearsoi.Services.Interfaces;

namespace jearsoi.Services.Implements
{
    public class OrderSVC(EmailSender emailSender, IOrderRES orderRES, IProductRES productRES, IMapper mapper) : IOrderSVC
    {
        private readonly EmailSender _emailSender = emailSender;
        private readonly IOrderRES _orderRES = orderRES;
        private readonly IProductRES _productRES = productRES;
        private readonly IMapper _mapper = mapper;

        public async Task<ApiResponse> Add(OrderDTO objDTO)
        {
            var apiResponse = new ApiResponse();
            var errors = ValidateOrder(objDTO, 0);
            if(errors.Count > 0)
            {
                apiResponse.Errors = errors;
                apiResponse.Msg = "Data is invalid";
                return apiResponse;
            }

            var obj = _mapper.Map<OrderDTO, Order>(objDTO);
            obj.OrderTime = DateTime.Now;
            var result = _orderRES.Add(obj);
            if (result == null)
            {
                apiResponse.Msg = "Cannot add new order";
                apiResponse.Errors.Add("Unexpected errors from server");
                return apiResponse;
            }
            else
            {
                if (objDTO.Email != null)
                {
                    string subject = "Jearsoi Order confirmation";
                    string body = $"<p>Your order is in queue now! To check your order on our website, use this id: <strong>{result.OrderId}</strong></p>";
                    await _emailSender.SendEmailAsync(objDTO.Email, subject, body);
                }
                apiResponse.IsSuccess = true;
                apiResponse.Msg = "Add new order successfully";
                apiResponse.Data = _mapper.Map<Order, OrderDTO>(result);
            }
            return apiResponse;
        }

        public ApiResponse Delete(Guid id)
        {
            var apiResponse = new ApiResponse();

            var result = _orderRES.Delete(id);
            if (result == false)
            {
                apiResponse.Msg = "Cannot delete the order";
                apiResponse.Errors.Add("Unexpected errors from server");
            }
            else
            {
                apiResponse.IsSuccess = true;
                apiResponse.Msg = "Delete the order successfully";
                apiResponse.Data = result;
            }
            return apiResponse;
        }

        public ApiResponse Get()
        {
            var apiResponse = new ApiResponse();
            var data = _orderRES.Get();
            if (data == null)
            {
                apiResponse.Msg = "Cannot get orders";
            }
            else
            {
                apiResponse.IsSuccess = true;
                apiResponse.Msg = "Get orders successfully";
                apiResponse.Data = _mapper.Map<IEnumerable<Order>, IEnumerable<OrderDTO>>(data);
            }
            return apiResponse;
        }

        public ApiResponse GetProcessing()
        {
            var apiResponse = new ApiResponse();
            var data = _orderRES.Get();
            if (data == null)
            {
                apiResponse.Msg = "Cannot get orders";
            }
            else
            {
                apiResponse.IsSuccess = true;
                apiResponse.Msg = "Get orders successfully";
                var tempData = data.Where(o => !((o.PaymentStatus == 1 && o.DeliveryStatus == 2) || o.PaymentStatus == 2 || o.DeliveryStatus == 3));
                apiResponse.Data = _mapper.Map<IEnumerable<Order>, IEnumerable<OrderDTO>>(tempData);
            }
            return apiResponse;
        }

        public ApiResponse GetHistory()
        {
            var apiResponse = new ApiResponse();
            var data = _orderRES.Get();
            if (data == null)
            {
                apiResponse.Msg = "Cannot get orders";
            }
            else
            {
                apiResponse.IsSuccess = true;
                apiResponse.Msg = "Get orders successfully";
                var tempData = data.Where(o => (o.PaymentStatus == 1 && o.DeliveryStatus == 2) || o.PaymentStatus == 2 || o.DeliveryStatus == 3);
                apiResponse.Data = _mapper.Map<IEnumerable<Order>, IEnumerable<OrderDTO>>(tempData);
            }
            return apiResponse;
        }

        public ApiResponse UpdateDeliveryStatus(Guid id, int status)
        {
            var apiResponse = new ApiResponse();
            var order = _orderRES.GetById(id);
            if (order == null)
            {
                apiResponse.Msg = "Cannot update the order";
                apiResponse.Errors.Add("Unexpected errors from server");
                return apiResponse;
            }
            order.DeliveryStatus = status;
            var result = _orderRES.Update(order);
            if (result == null)
            {
                apiResponse.Msg = "Cannot update the order";
                apiResponse.Errors.Add("Unexpected errors from server");
            }
            else
            {
                apiResponse.IsSuccess = true;
                apiResponse.Msg = "Update the order successfully";
                apiResponse.Data = _mapper.Map<Order, OrderDTO>(result);
            }
            return apiResponse;
        }
        public ApiResponse UpdatePaymentStatus(Guid id, int status)
        {
            var apiResponse = new ApiResponse();
            var order = _orderRES.GetById(id);
            if (order == null)
            {
                apiResponse.Msg = "Cannot update the order";
                apiResponse.Errors.Add("Unexpected errors from server");
                return apiResponse;
            }
            order.PaymentStatus = status;
            var result = _orderRES.Update(order);
            if (result == null)
            {
                apiResponse.Msg = "Cannot update the order";
                apiResponse.Errors.Add("Unexpected errors from server");
            }
            else
            {
                apiResponse.IsSuccess = true;
                apiResponse.Msg = "Update the order successfully";
                apiResponse.Data = _mapper.Map<Order, OrderDTO>(result);
            }
            return apiResponse;
        }

        private List<string> ValidateOrder(OrderDTO objDTO, int? status = null)
        {
            double subTotal = 0;
            List<string> errors = new List<string>();
            if (objDTO.Phone.Length != 10)
                errors.Add("Phone lenght is invalid");
            if (objDTO.DeliveryStatus < 0 || objDTO.DeliveryStatus > 4)
                errors.Add("Delivery status is invalid");
            if (status != null && objDTO.DeliveryStatus != status)
                errors.Add("Delivery status is unexpected");
            if (objDTO.PaymentStatus < 0 || objDTO.PaymentStatus > 4)
                errors.Add("Payment status is invalid");
            if (status != null && objDTO.PaymentStatus != status)
                errors.Add("Payment status is unexpected");
            if (objDTO.Phone.Length == 0)
                errors.Add("Address is required");
            if (objDTO.Address.Length > 255)
                errors.Add("Address is supposed to be smaller than 255 characters");
            if (objDTO.Note != null)
                if (objDTO.Note.Length > 255)
                    errors.Add("Note is supposed to be smaller than 255 characters");
            foreach (var od in objDTO.OrderDetails)
            {
                if (od.UnitPrice <= 0)
                {
                    errors.Add("Some products has invalid price");
                    break;
                }
                if (od.OrderId != null)
                {
                    var product = _productRES.GetById(Guid.Parse(od.OrderId));
                    if (product != null)
                        if (od.UnitPrice != product.Price)
                        {
                            errors.Add("Some products has invalid price");
                            break;
                        }
                }
                subTotal += od.UnitPrice * od.Quantity;
            }
            objDTO.SubTotal = Math.Round(subTotal, 2);
            if (objDTO.SubTotal != subTotal)
                errors.Add("Subtotal was incorrect");
            if (objDTO.Total != (objDTO.SubTotal - objDTO.Discount))
                errors.Add("Total was incorect");
            return errors;
        }

        public ApiResponse GetById(Guid id)
        {
            var apiResponse = new ApiResponse();
            var data = _orderRES.GetById(id);
            if (data == null)
            {
                apiResponse.Msg = "Order with following id does not exist";
            }
            else
            {
                apiResponse.IsSuccess = true;
                apiResponse.Msg = "Get order with following id successfully";
                apiResponse.Data = _mapper.Map<Order, OrderDTO>(data);
            }
            return apiResponse;
        }

        public ApiResponse GetUserHistory(AppUser user)
        {
            var apiResponse = new ApiResponse();
            var data = _orderRES.GetByUser(Guid.Parse(user.Id), user.PhoneNumber);
            if (data == null)
            {
                apiResponse.Msg = "Cannot get orders";
            }
            else
            {
                apiResponse.IsSuccess = true;
                apiResponse.Msg = "Get orders successfully";
                var tempData = data.Where(o => (o.PaymentStatus == 1 && o.DeliveryStatus == 2) || o.PaymentStatus == 2 || o.DeliveryStatus == 3);
                apiResponse.Data = _mapper.Map<IEnumerable<Order>, IEnumerable<OrderDTO>>(tempData);
            }
            return apiResponse;
        }

        public ApiResponse GetUserProcessing(AppUser user)
        {
            var apiResponse = new ApiResponse();
            var data = _orderRES.GetByUser(Guid.Parse(user.Id), user.PhoneNumber);
            if (data == null)
            {
                apiResponse.Msg = "Cannot get orders";
            }
            else
            {
                apiResponse.IsSuccess = true;
                apiResponse.Msg = "Get orders successfully";
                var tempData = data.Where(o => !((o.PaymentStatus == 1 && o.DeliveryStatus == 2) || o.PaymentStatus == 2 || o.DeliveryStatus == 3));
                apiResponse.Data = _mapper.Map<IEnumerable<Order>, IEnumerable<OrderDTO>>(tempData);
            }
            return apiResponse;
        }
    }
}
