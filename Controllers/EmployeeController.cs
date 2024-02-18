using BloodBankManagmemntSystem.Data;
using BloodBankManagmemntSystem.Models;
using BloodBankManagmemntSystem.SendMail;
using MailKit.Net.Imap;
using MailKit.Security;
using Microsoft.AspNetCore.Mvc;

namespace BloodBankManagmemntSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeeController : ControllerBase
    {

        // establish database context 
        private BloodDbContext context;
        private IEmailSender _emailSender;

        public EmployeeController(BloodDbContext dbcontext, IEmailSender emailSender)
        {
            context = dbcontext;
            _emailSender = emailSender;
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


                using (var client = new ImapClient())
                {
                    client.Connect("imap.gmail.com", 993, SecureSocketOptions.SslOnConnect);
                    client.Authenticate("bbmblaunch@gmail.com", "lfdm jslw qfsi ktob");
                    var message = new Message();
                    message.Subject = "User Regidtration Completed!.";
                    message.Content = "User Registration completed. Please login to see more details.";
                    message.To = newEmployee.Email.ToString();
                    _emailSender.SendEmail(message);

                }

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error" + ex.Message);
            }

            return Ok(model);
        }



    }
}