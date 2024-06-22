using AutoMapper;
using jearsoi.Helpers;
using jearsoi.Models;
using jearsoi.Models.Db;
using jearsoi.Repositories.Implements;
using jearsoi.Repositories.Interfaces;
using jearsoi.Services.Interfaces;
using Microsoft.EntityFrameworkCore.Migrations;

namespace jearsoi.Services.Implements
{
    public class ProductSVC(ImageHelper imageHelper, IMapper mapper, IProductRES ProductRES) : IProductSVC
    {
        private readonly ImageHelper _imageHelper = imageHelper;
        private readonly IProductRES _productRES = ProductRES;
        private readonly IMapper _mapper = mapper;

        public ApiResponse Get()
        {
            var apiResponse = new ApiResponse();
            var data = _productRES.Get();
            if (data == null)
            {
                apiResponse.Msg = "Cannot get products";
            }
            else
            {
                apiResponse.IsSuccess = true;
                apiResponse.Msg = "Get products successfully";
                apiResponse.Data = _mapper.Map<IEnumerable<Product>, IEnumerable<ProductDTO>>(data);
            }
            return apiResponse;
        }

        public ApiResponse GetOperating()
        {
            var apiResponse = new ApiResponse();
            var data = _productRES.GetOperating();
            if (data == null)
            {
                apiResponse.Msg = "Cannot get products";
            }
            else
            {
                apiResponse.IsSuccess = true;
                apiResponse.Msg = "Get products successfully";
                apiResponse.Data = _mapper.Map<IEnumerable<Product>, IEnumerable<ProductDTO>>(data);
            }
            return apiResponse;
        }


        public ApiResponse Add(ProductDTO objDTO)
        {
            var apiResponse = new ApiResponse();
            var errors = DTOValidator.ValidateProduct(objDTO);
            if (errors.Count() > 0)
            {
                apiResponse.Errors = errors;
                apiResponse.Msg = "Data is invalid";
                return apiResponse;
            }

            var obj = _mapper.Map<ProductDTO, Product>(objDTO);
            if (objDTO.ImgFile != null)
                obj.ImgUrl = _imageHelper.CreateImg(objDTO.ImgFile);


            var result = _productRES.Add(obj);
            if (result == null)
            {
                apiResponse.Msg = "Cannot add new product";
                apiResponse.Errors.Add("Unexpected errors from server");
            }
            else
            {
                apiResponse.IsSuccess = true;
                apiResponse.Msg = "Add new product successfully";
                apiResponse.Data = result;
            }
            return apiResponse;
        }

        public ApiResponse Update(ProductDTO objDTO)
        {
            var apiResponse = new ApiResponse();
            var errors = DTOValidator.ValidateProduct(objDTO, false);
            if (errors.Count() > 0)
            {
                apiResponse.Errors = errors;
                apiResponse.Msg = "Data is invalid";
                return apiResponse;
            }

            var obj = _mapper.Map<ProductDTO, Product>(objDTO);
            var oldImgUrl = objDTO.ImgUrl;
            string? newImgUrl = null;
            if (objDTO.ImgFile != null)
            {
                newImgUrl = _imageHelper.CreateImg(objDTO.ImgFile);
                obj.ImgUrl = newImgUrl;
            }



            var result = _productRES.Update(obj);
            if (result == null)
            {
                apiResponse.Msg = "Cannot update new product";
                apiResponse.Errors.Add("Unexpected errors form server");
            }
            else
            {
                if (oldImgUrl != null && newImgUrl != null)
                    _imageHelper.DeleteImg(oldImgUrl);
                apiResponse.IsSuccess = true;
                apiResponse.Msg = "Update new product successfully";
                apiResponse.Data = result;
            }
            return apiResponse;
        }

        public ApiResponse Delete(Guid id)
        {
            var apiResponse = new ApiResponse();
            string? oldImg = null;
            var obj = _productRES.GetById(id);
            if (obj != null)
                oldImg = obj.ImgUrl;

            var result = _productRES.Delete(id);
            if (result == false)
            {
                apiResponse.Msg = "Cannot delete the product";
                apiResponse.Errors.Add("Unexpected errors from server");
            }
            else
            {
                if (oldImg != null)
                    _imageHelper.DeleteImg(oldImg);
                apiResponse.IsSuccess = true;
                apiResponse.Msg = "Delete the product successfully";
                apiResponse.Data = result;
            }
            return apiResponse;
        }

    }
}
