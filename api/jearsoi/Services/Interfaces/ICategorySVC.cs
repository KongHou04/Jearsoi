using jearsoi.Models;
using jearsoi.Models.Db;

namespace jearsoi.Services.Interfaces
{
    public interface ICategorySVC
    {
        public ApiResponse Get();

        public ApiResponse Add(CategoryDTO objDTO);

        public ApiResponse Update(CategoryDTO objDTO);

        public ApiResponse Delete(Guid id);
    }
}
