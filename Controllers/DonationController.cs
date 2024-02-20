using BloodBankManagmemntSystem.Data;
using BloodBankManagmemntSystem.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using static BloodBankManagmemntSystem.Controllers.EmployeeController;

namespace BloodBankManagmemntSystem.Controllers
{
    public class DonationObject
    {
        public int DonorId { get; set; }
        public string Date { get; set; }
        public string Time {  get; set; }
        public string ServicingEmployee { get; set; }
        public string Location { get; set; }
    }

    [ApiController]
    [Route("[controller]")]
    public class DonationController : Controller
    {
        // establish database context
        private BloodDbContext context;

        public DonationController(BloodDbContext dbcontext)
        {
            context = dbcontext;
        }

        [HttpPost("AddDonation")]
        public IActionResult AddDonation([FromBody]DonationObject donation)
        {
           if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newDonation = new Donation
            {
                DonorId = donation.DonorId,
                Date = donation.Date,
                Time = donation.Time,
                ServicingEmployeeName = donation.ServicingEmployee,
                Location = donation.Location,

            };

            try
            {
                context.Donations.Add(newDonation);
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return Ok(donation);
        }

    }
}
