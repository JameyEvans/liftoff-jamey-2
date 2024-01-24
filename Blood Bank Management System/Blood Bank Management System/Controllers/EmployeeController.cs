using Microsoft.AspNetCore.Mvc;

namespace Blood_Bank_Management_System.Controllers
{
    public class EmployeeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
