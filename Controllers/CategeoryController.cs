﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NIMAP_INFOTECH_TASK.Controllers
{
    public class CategeoryController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
