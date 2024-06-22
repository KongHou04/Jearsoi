using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace jearsoi.Models.Db
{
    [Table("products")]
    public class Product
    {
        [Key]
        public Guid ProductId { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [Range(0, 5000000)]
        public double Price { get; set; }

        public string? ImgUrl { get; set; }

        [Required]
        [Range(0, 1)]
        public int Status { get; set; }

        [StringLength(250)]
        public string? Description { get; set; }


        public Guid CategoryId { get; set; }
        public Category? Category { get; set; }

        public ICollection<ProductDiscount> ProductDiscounts { get; set; } = [];

        public ICollection<OrderDetail> OrderDetails { get; set; } = [];
    }
}
