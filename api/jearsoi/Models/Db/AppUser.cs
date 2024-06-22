using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace jearsoi.Models.Db
{
    public class AppUser : IdentityUser
    {
        [Required]
        [StringLength(100)]
        public string FullName { get; set; } = string.Empty;

        [Required]
        [StringLength(255)]
        public string Address { get; set; } = string.Empty;

        [StringLength(255)]
        public string? Avatar { get; set; }

        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }

        public ICollection<Order> Orders { get; set; } = [];

        public ICollection<Coupon> Coupons { get; set; } = [];
    }
}
