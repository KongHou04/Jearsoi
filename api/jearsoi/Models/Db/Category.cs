using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace jearsoi.Models.Db
{
    [Table("categories")]
    public class Category
    {
        [Key]
        public Guid CategoryId { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [StringLength(255)]
        public string? Description { get; set; }

        [Required]
        [Range(0, 1)]
        public int Status { get; set; }


        public ICollection<Product> Products { get; set; } = [];
    }
}
