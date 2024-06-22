using Microsoft.AspNetCore.Mvc;

namespace jearsoi.Models.Db
{
    public class ProductDTO
    {
        public string? ProductId { get; set; }

        public string Name { get; set; } = string.Empty;

        public double Price { get; set; }

        public string? ImgUrl { get; set; }

        [FromForm(Name = "imgFile")]
        public IFormFile? ImgFile { get; set; }

        public int Status { get; set; }

        public string? Description { get; set; }


        public string? CategoryId { get; set; }

        public ICollection<ProductDiscountDTO> ProductDiscounts = [];
    }
}
