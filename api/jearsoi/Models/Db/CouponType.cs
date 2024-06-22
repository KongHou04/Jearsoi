using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace jearsoi.Models.Db
{
    [Table("couponTypes")]
    public class CouponType
    {
        [Key]
        public int CpTypeId { get; set; }

        [Required]
        [Range(0, 2000000)]
        public double HardValue { get; set; } = 0;

        [Required]
        [Range(0, 100)]
        public int PercentValue { get; set; } = 0;

        [Required]
        public DateTime StartTime { get; set; }

        [Required]
        public DateTime EndTime { get; set; }


        public ICollection<Coupon> Coupons { get; set; } = [];
    }
}
