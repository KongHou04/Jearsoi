using jearsoi.Models;
using jearsoi.Models.Db;
using jearsoi.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace jearsoi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoryController(ICategorySVC categorySVC) : Controller
    {
        private readonly ICategorySVC _categorySVC = categorySVC;

        [HttpGet()]
        public ApiResponse Get()
        {
            return _categorySVC.Get();
        }

        [HttpPost()]
        [Authorize(Roles = "admin")]
        public ApiResponse Add([FromBody]CategoryDTO objDTO)
        {
            return _categorySVC.Add(objDTO);
        }

        [HttpPut()]
        [Authorize(Roles = "admin")]
        public ApiResponse Update([FromBody]CategoryDTO objDTO)
        {
            return _categorySVC.Update(objDTO);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public ApiResponse Delete(Guid id)
        {
            //return new ApiResponse();
            return _categorySVC.Delete(id);
        }
    }
}
