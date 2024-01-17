using Microsoft.AspNetCore.Mvc;

namespace BDIMS_Project.Controllers
{
    public class GuestController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult ContactUs()
        {
            return View();
        }
        public IActionResult Login()
        {
            return View();
        }
    }
}
