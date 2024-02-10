using BloodBankManagmemntSystem.Data;
using BloodBankManagmemntSystem.Models;
using Microsoft.AspNetCore.Mvc;

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



    }
}