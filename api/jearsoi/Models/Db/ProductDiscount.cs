using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Numerics;

namespace jearsoi.Models.Db
{
    [Table("productDiscounts")]
    public class ProductDiscount
    {
        [Key]
        public int PDId { get; set; }

        [Range(0, 20000000)]
        public double HardValue { get; set; } = 0;

        [Range(0, 100)]
        public int PercentValue { get; set; } = 0;

        [Required]
        public DateTime StartTime { get; set; }

        [Required]
        public DateTime EndTime { get; set; }


        public Guid ProductId {  get; set; }
        public Product? Product { get; set; }
    }
}
