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
    public class CategeoryController : ControllerBase
    {
        private readonly IBaseSerivce<CategoryMaster> baseSerivce;
        private readonly ICategeoryService categeoryService;

        public CategeoryController(IBaseSerivce<CategoryMaster> _baseSerivce, ICategeoryService _categeoryService)
        {
            baseSerivce = _baseSerivce;
            categeoryService = _categeoryService;
        }


        [HttpGet]
        public IActionResult GetCategeroyList([FromQuery] QueryStringParameters parameters)
        {
            var result = new List<ProductViewModel>();
            var data = baseSerivce.Get(parameters);
          
            data.ForEach(e => result.Add(new ProductViewModel()
            {
                CategeoryName = e.Name,
                CatgeoryId = e.Id,
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
        public async Task<IActionResult> Add([FromBody] CategoryMaster category)
        {
            if (!ModelState.IsValid)
            {
                return Ok(new RequestResult()
                {
                    Message = "something wnet wrong while adding product",
                    StatusCode = (int)Status.BadRequest
                });
            }
            else
            {
                return Ok(await baseSerivce.Add(category));
            }

        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> Update(int Id, [FromBody] CategoryMaster category)
        {
            if (!ModelState.IsValid)
            {
                return Ok(new RequestResult()
                {
                    Message = "something wnet wrong while Update catgeroy",
                    StatusCode = (int)Status.BadRequest
                });
            }
            else
            {
                return Ok(await baseSerivce.Update(Id, category));
            }

        }

        [HttpDelete("{Id}")]
        public async Task<IActionResult> Delete(int Id)
        {
            if (!ModelState.IsValid)
            {
                return Ok(new RequestResult()
                {
                    Message = "something wnet wrong while Delete catgeroy",
                    StatusCode = (int)Status.BadRequest
                });
            }
            else
            {
                return Ok(await baseSerivce.Delete(Id));
            }

        }

        [HttpGet("get-categries")]
        public async Task<IActionResult> GetCategries() 
        {
            return Ok(await categeoryService.GetCategeory());
        }

    }
}
