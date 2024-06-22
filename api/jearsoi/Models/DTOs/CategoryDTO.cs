namespace jearsoi.Models.Db
{
    public class CategoryDTO
    {
        public string? CategoryId {  get; set; }

        public string Name { get; set; } = string.Empty;
        
        public string? Description { get; set; }

        public int Status { get; set; }

        public List<ProductDTO> Products { get; set; } = [];
    }
}
