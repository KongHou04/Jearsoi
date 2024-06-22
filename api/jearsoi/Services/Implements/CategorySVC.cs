using AutoMapper;
using jearsoi.Helpers;
using jearsoi.Models;
using jearsoi.Models.Db;
using jearsoi.Repositories.Interfaces;
using jearsoi.Services.Interfaces;

namespace jearsoi.Services.Implements
{
    public class CategorySVC(IMapper mapper, ICategoryRES categoryRES) : ICategorySVC
    {
        private readonly ICategoryRES _categoryRES = categoryRES;
        private readonly IMapper _mapper = mapper;


        public ApiResponse Get()
        {
            var apiResponse = new ApiResponse();
            var data = _categoryRES.Get();
            if (data == null)
            {
                apiResponse.Msg = "Cannot get categories";
            }
            else
            {
                apiResponse.IsSuccess = true;
                apiResponse.Msg = "Get categories successfully";
                apiResponse.Data = _mapper.Map<IEnumerable<Category>, IEnumerable<CategoryDTO>>(data);
            }
            return apiResponse;
        }

        public ApiResponse Add(CategoryDTO objDTO)
        {
            var apiResponse = new ApiResponse();
            var errors = DTOValidator.ValidateCategory(objDTO);
            if (errors.Count() > 0)
            {
                apiResponse.Errors = errors;
                apiResponse.Msg = "Data is invalid";
                return apiResponse;
            }

            var obj = _mapper.Map<CategoryDTO, Category>(objDTO);
            var result = _categoryRES.Add(obj);
            if (result == null)
            {
                apiResponse.Msg = "Cannot add new category";
                apiResponse.Errors.Add("Unexpected errors form server");
            }
            else
            {
                apiResponse.IsSuccess = true;
                apiResponse.Msg = "Add new category successfully";
                apiResponse.Data = result;
            }

            return apiResponse;
        }

        public ApiResponse Update(CategoryDTO objDTO)
        {
            var apiResponse = new ApiResponse();
            var errors = DTOValidator.ValidateCategory(objDTO, false);
            if (errors.Count() > 0)
            {
                apiResponse.Errors = errors;
                apiResponse.Msg = "Data is invalid";
                return apiResponse;
            }

            var obj = _mapper.Map<CategoryDTO, Category>(objDTO);
            var result = _categoryRES.Update(obj);
            if (result == null)
            {
                apiResponse.Msg = "Cannot update new category";
                apiResponse.Errors.Add("Unexpected errors form server");
            }
            else
            {
                apiResponse.IsSuccess = true;
                apiResponse.Msg = "Update new category successfully";
                apiResponse.Data = result;
            }

            return apiResponse;
        }

        public ApiResponse Delete(Guid id)
        {
            var apiResponse = new ApiResponse();

            var result = _categoryRES.Delete(id);
            if (result == false)
            {
                apiResponse.Msg = "Cannot delete the category";
                apiResponse.Errors.Add("Unexpected errors from server");
            }
            else
            {
                apiResponse.IsSuccess = true;
                apiResponse.Msg = "Delete the category successfully";
                apiResponse.Data = result;
            }
            return apiResponse;
        }

    }
}
