using jearsoi.Models.Db;

namespace jearsoi.Helpers
{
    public class DTOValidator
    {
        public static List<string> ValidateCategory(CategoryDTO obj, bool isValidateId = true)
        {
            List<string> result = new List<string>();
            if (isValidateId)
            {
                if (obj.CategoryId != null)
                    result.Add("Unexpected categoryId");
            }
            if (obj.Name.Length == 0)
                result.Add("Name cannot be empty");
            if (obj.Description != null)
                if (obj.Description.Length > 255)
                    result.Add("Description is supposed to be smaller than 255 characters");
            return result;
        }

        public static List<string> ValidateProduct(ProductDTO obj, bool isValidateId = true)
        {
            List<string> result = new List<string>();
            if (isValidateId)
            {
                if (obj.ProductId != null)
                    result.Add("Unexpected productId");
            }
            if (obj.Name.Length == 0)
                result.Add("Name is required");
            if (obj.Name.Length > 100)
                result.Add("Name has to be smaller than 100 characters");
            if (obj.Price < 0 || obj.Price > 1000)
                result.Add("Price is supposed to be in range(0, 1000)");
            if (obj.Description != null)
                if (obj.Description.Length > 255)
                    result.Add("Description is supposed to be smaller than 255 characters");
            return result;
        }
    }
}
