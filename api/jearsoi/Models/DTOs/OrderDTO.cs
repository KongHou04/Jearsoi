using System.ComponentModel.DataAnnotations;

namespace jearsoi.Models.Db
{
    public class OrderDTO
    {
        public string? OrderId { get; set; }

        public string? Email { get; set; }

        public string Phone { get; set; } = string.Empty;

        public string Address {  get; set; } = string.Empty;

        public DateTime OrderTime { get; set; }

        public double SubTotal { get; set; } = 0;

        public double Discount { get; set; } = 0;

        public double Total { get; set; } = 0;

        public int DeliveryStatus { get; set; }

        public int PaymentStatus { get; set; }

        public string? Note { get; set; }


        public List<OrderDetailDTO> OrderDetails { get; set; } = [];

        public string? UserId {  get; set; }
    }
}
