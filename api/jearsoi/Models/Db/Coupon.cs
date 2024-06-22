using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace jearsoi.Models.Db
{
    [Table("coupons")]
    public class Coupon
    {
        [Key]
        public Guid CouponId { get; set; }

        [Required]
        [Column(TypeName = "Bit")]
        public bool IsUsed { get; set; } = false;


        public int CpTypeId { get; set; }
        public CouponType? CouponType { get; set; }

        public string? UserId { get; set; }
        public AppUser? User { get; set; }
    }
}
