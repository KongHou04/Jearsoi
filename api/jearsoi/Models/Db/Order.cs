using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace jearsoi.Models.Db
{
    [Table("orders")]
    public class Order
    {
        [Key]
        public Guid OrderId { get; set; }

        [Required]
        [StringLength(10)]
        [RegularExpression(@"^[0-9]*$")]
        public string Phone { get; set; } = string.Empty;

        [Required]
        [StringLength(255)]
        public string Address { get; set; } = string.Empty;

        [Required]
        public DateTime OrderTime { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public double SubTotal { get; set; } = 0;

        [Required]
        [Range(0, int.MaxValue)]
        public double Discount { get; set; } = 0;

        [Required]
        [Range(0, double.MaxValue)]
        public double Total { get; set; } = 0;

        [Required]
        [Range(0, 3)]
        public int DeliveryStatus { get; set; } = 0;

        [Required]
        [Range(0, 2)]
        public int PaymentStatus { get; set; } = 0;

        [StringLength(255)]
        public string? Note { get; set; }


        public ICollection<OrderDetail> OrderDetails { get; set; } = [];

        public string? UserId {  get; set; }
        public AppUser? User { get; set; }
    }
}
