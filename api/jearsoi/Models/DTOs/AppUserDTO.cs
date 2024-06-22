namespace jearsoi.Models.DTOs
{
    public class AppUserDTO
    {
        public string Email { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }
        public string? Avatar {  get; set; }
        public string Role { get; set; } = string.Empty;
    }
}
