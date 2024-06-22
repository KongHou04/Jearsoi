using jearsoi.Models.Db;
using jearsoi.Models;
using Microsoft.AspNetCore.Mvc;
using jearsoi.Services.Implements;
using jearsoi.Services.Interfaces;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.AspNetCore.Authorization;

namespace jearsoi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController(IProductSVC ProductSVC) : Controller
    {
        private readonly IProductSVC _productSVC = ProductSVC;

        [HttpGet()]
        [Authorize(Roles = "admin")]
        public ApiResponse Get()
        {
            return _productSVC.Get();
        }

        [HttpGet("getoperating")]
        public ApiResponse GetOperatingProducts()
        {
            return _productSVC.GetOperating();
        }

        [HttpPost()]
        [Authorize(Roles = "admin")]
        public ApiResponse Add([FromForm] ProductDTO objDTO)
        {
            return _productSVC.Add(objDTO);
            //return new ApiResponse();
        }

        [HttpPut()]
        [Authorize(Roles = "admin")]
        public ApiResponse Update([FromForm] ProductDTO objDTO)
        {
            return _productSVC.Update(objDTO);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public ApiResponse Delete(Guid id)
        {
            //return new ApiResponse();
            return _productSVC.Delete(id);
        }

    }
}
