using jearsoi.Models.Db;
using jearsoi.Models;

namespace jearsoi.Services.Interfaces
{
    public interface IProductSVC
    {
        public ApiResponse Get();
        public ApiResponse GetOperating();

        public ApiResponse Add(ProductDTO objDTO);

        public ApiResponse Update(ProductDTO objDTO);

        public ApiResponse Delete(Guid id);
    }
}
