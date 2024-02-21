using BloodBankManagmemntSystem.Data;
using BloodBankManagmemntSystem.Models;
using BloodBankManagmemntSystem.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata;
using System.Diagnostics;
using System.Net;
using static BloodBankManagmemntSystem.Controllers.DonorController;

namespace BloodBankManagmemntSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeeController : ControllerBase
    {

        // establish database context 
        private BloodDbContext context;
        private readonly string senderEmail;
        private readonly string senderName;

        public EmployeeController(BloodDbContext dbcontext, IConfiguration configuration)
        {
            context = dbcontext;
            this.senderEmail = configuration["BrevoApi:SenderEmail"]!;
            this.senderName = configuration["BrevoApi:SenderName"];
        }
        public class EmployeeLoginObject
        {
            public string UserName { get; set; }
            public string Password { get; set; }
        }

        public class DonorListSearchObject
        {
            public string SearchParameter { get; set; }
            public string SearchTerm { get; set; }
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
                State = model.State,
                Email = model.Email,
                Phone = model.Phone,
                Password = model.Password
            };
            try
            {
                context.Employees.Add(newEmployee);
                context.SaveChanges();
                //Send confirmation email
                string recieverEmail = newEmployee.Email!;
                string recieverName = newEmployee.FirstName + newEmployee.LastName;
                string subject = "Account Created Succesfully.";
                string message = "Dear " + recieverName + "\n" +
                    "We have have created your account in Blood Management system." + "\n" +
                    "Thank you for being member of system." + "\n" +
                    "Best Regards" + "\n" +
                    "Blood Management System";

                EmailSender.SendEmail(senderEmail, senderName, recieverEmail, recieverName, subject, message);
            }
            catch (Exception ex)
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

        [HttpGet("GetDonorList")]
        public IActionResult GetDonorList()
        {
            List<Donor> fullDonorList = context.Donors.ToList();
            return Ok(fullDonorList);
        }

        [HttpGet("GetEmployeeList")]
        public IActionResult GetEmployeeList()
        {
            List<Employee> employeeList = context.Employees.ToList();
            return Ok(employeeList);
        }

        [HttpGet("SearchDonorList")]
        public IActionResult SearchDonorList([FromQuery] string searchParam, string searchTerm)
        {

            List<Donor> fullDonorList = context.Donors.ToList();
            List<Donor> searchResults = new List<Donor>();

            // In some other life I could definitely clean this up *but this life is not that life*
            switch (searchParam)
            {
                case "id":
                    foreach (Donor donor in fullDonorList)
                    {
                        if (donor.Id.ToString() == searchTerm)
                        {
                            searchResults.Add(donor);
                        }
                    }
                    return Ok(searchResults);
                case "name":
                    foreach (Donor donor in fullDonorList)
                    {
                        string fullName = $"{donor.FirstName} {donor.FirstName}";

                        if (fullName.ToLower().Contains(searchTerm.ToLower()))
                        {
                            searchResults.Add(donor);
                        }
                    }
                    return Ok(searchResults);

                    // TODO: ADJUST THIS IF YOU HAVE TIME
                case "gender":
                    if (searchTerm.ToLower() == "m" || searchTerm.ToLower() == "male")
                    {
                        foreach(Donor donor in fullDonorList)
                        {
                            if (donor.Gender == "male")
                            {
                                searchResults.Add(donor);
                            }
                        }
                    }
                    else if (searchTerm.ToLower() == "f" || searchTerm.ToLower() == "female")
                    {
                        foreach(Donor donor in fullDonorList)
                        {
                            if (donor.Gender == "female")
                            {
                                searchResults.Add(donor);
                            }
                        }
                    }
                    else
                    {
                        foreach(Donor donor in fullDonorList)
                        {
                            if (donor.Gender == "other")
                            {
                                searchResults.Add(donor);
                            }
                        }
                    }
                    
                    return Ok(searchResults);
                case "bloodType":
                    foreach (Donor donor in fullDonorList)
                    {
                        if (donor.BloodType.ToLower() == searchTerm.ToLower())
                        {
                            searchResults.Add(donor);
                        }
                    }
                    return Ok(searchResults);
                case "address":
                    foreach(Donor donor in fullDonorList)
                    {
                        if (donor.Address.ToLower().Contains(searchTerm.ToLower()))
                        {
                            searchResults.Add(donor);
                        }
                    }
                    return Ok(searchResults);
                case "city":
                    foreach (Donor donor in fullDonorList)
                    {
                        if (donor.City.ToLower().Contains(searchTerm.ToLower()))
                        {
                            searchResults.Add(donor);
                        }
                    }
                    return Ok(searchResults);
                case "state":
                    foreach (Donor donor in fullDonorList)
                    {
                        if (donor.State.ToLower().Contains(searchTerm.ToLower()))
                        {
                            searchResults.Add(donor);
                        }
                    }
                    return Ok(searchResults);  
                default: 
                    return Ok(searchResults);

            }
        }
    }
}