using Common.Helpers;
using Common.IServices;
using Common.Models;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Common.Helpers.RequestResult;

namespace NIMAP_INFOTECH_TASK.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IBaseSerivce<ProductMaster> baseSerivce;

        public ProductController(IBaseSerivce<ProductMaster> _baseSerivce)
        {
            baseSerivce = _baseSerivce;
        }

        [HttpGet]
        public IActionResult GetProductList([FromQuery] QueryStringParameters parameters) 
        {
            var result =  new List<ProductViewModel>();
            var data = baseSerivce.Get(parameters);
            data.ForEach(e => result.Add(new ProductViewModel()
            {
                CategeoryName=e.Category.Name,
                CatgeoryId=e.CategoryId,
                PorductId=e.Id,
                PorductName=e.ProductName
            }));

            var metadata = new
            {
                data.TotalCount,
                data.PageSize,
                data.CurrentPage,
                data.TotalPages,
                data.HasNext,
                data.HasPrevious,
                result
            };
            return Ok(JsonConvert.SerializeObject(metadata));
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] ProductMaster category) 
        {
            if (!ModelState.IsValid)
            {
                return Ok(new RequestResult()
                {
                    Message = "something wnet wrong while adding product",
                    StatusCode = (int)Status.BadRequest
                });
            }
            else {
                return Ok(await baseSerivce.Add(category));
            }
        
        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> Update(int Id, [FromBody] ProductMaster category)
        {
            if (!ModelState.IsValid)
            {
                return Ok(new RequestResult()
                {
                    Message = "something wnet wrong while Update product",
                    StatusCode = (int)Status.BadRequest
                });
            }
            else
            {
                return Ok(await baseSerivce.Update(Id,category));
            }

        }  

        [HttpDelete("{Id}")]
        public async Task<IActionResult> Delete(int Id)
        {
            if (!ModelState.IsValid)
            {
                return Ok(new RequestResult()
                {
                    Message = "something wnet wrong while Delete product",
                    StatusCode = (int)Status.BadRequest
                });
            }
            else
            {
                return Ok(await baseSerivce.Delete(Id));
            }

        }
    }
}
