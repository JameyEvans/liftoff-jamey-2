using BloodBankManagmemntSystem.Data;
using BloodBankManagmemntSystem.Models;
using Microsoft.AspNetCore.Mvc;
using static BloodBankManagmemntSystem.Controllers.DonorController;

namespace BloodBankManagmemntSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeeController : ControllerBase
    {

        // establish database context 
        private BloodDbContext context;

        public EmployeeController(BloodDbContext dbcontext)
        {
            context = dbcontext;
        }
        public class EmployeeLoginObject
        {
            public string UserName { get; set; }
            public string Password { get; set; }
        }


        [HttpPost("Register")]
        public ActionResult Register(Employee model)
        {
            if (!ModelState.IsValid) 
            { 
                return BadRequest(ModelState); 
            }

            Employee newEmployee = new Employee
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Address = model.Address,
                City = model.City,
                Country = model.Country,
                Email = model.Email,
                Phone = model.Phone,
                Password = model.Password
            };
            try
            {
                context.Employees.Add(newEmployee);
                context.SaveChanges();
            }
            catch(Exception ex)
            {
                return StatusCode(500, "Internal Server Error" + ex.Message);
            }

            return Ok(model);
        }
        [HttpPost("Login")]
        public IActionResult Login([FromBody] EmployeeLoginObject login)
        {
            Employee matchedEmployee = null;

            List<Employee> employees = context.Employees.ToList();
            foreach (Employee employee in employees)
            {
                if (login.UserName == employee.Email)
                {
                    matchedEmployee = employee;
                    break;
                }
            }
            if (matchedEmployee != null && matchedEmployee.Password == login.Password)
            {
                return Ok(new { message = "Login Successful!", redirectTo = "/donor-dashboard" });
            }
            return BadRequest();
        }



    }
}