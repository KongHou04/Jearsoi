using System.ComponentModel.DataAnnotations;

namespace jearsoi.Models
{
    public class LoginModel
    {
        [Required]
        [EmailAddress]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [StringLength(100)]
        [DataType(DataType.Password)]
        public string Password { get; set; } = string.Empty;
    }
}
