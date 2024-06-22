using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace jearsoi.Models.Db
{
    [Table("orderDetails")]
    public class OrderDetail
    {
        [Key]
        public int ODID { get; set; }

        [Required]
        [StringLength(100)]
        public string ProductName { get; set; } = string.Empty;

        [Required]
        [Range(1, 100)]
        public int Quantity { get; set; } = 1;

        [Required]
        [Range(0, 5000000)]
        public double UnitPrice { get; set; } = 0;

        [StringLength(255)]
        public string? Note { get; set; }


        public Guid OrderId { get; set; }
        public Order? Order { get; set; }

        public Guid? ProductId { get; set; }
        public Product? Product { get; set; }
    }
}
