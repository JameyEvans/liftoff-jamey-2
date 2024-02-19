using System.Diagnostics;
using System.Security.Cryptography.X509Certificates;
using System.Security.Policy;
using BloodBankManagmemntSystem.ComponentModel;
using BloodBankManagmemntSystem.Data;
using BloodBankManagmemntSystem.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace BloodBankManagmemntSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DonorController : ControllerBase
    {
        // establish database context
        private BloodDbContext context;

        public DonorController(BloodDbContext dbcontext)
        {
            context = dbcontext;
        }

        // create class for login objects
        public class DonorLoginObject
        {
            public string UserName { get; set; }
            public string Password { get; set; }
        }

        public int LoggedInDonorId { get; set; }

        [HttpPost("Register")]
        public ActionResult Register(Donor model)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Donor newDonor = new Donor
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Gender = model.Gender,
                DateOfBirth = model.DateOfBirth,
                BloodType = model.BloodType,
                Address = model.Address,
                City = model.City,
                State = model.State,
                Email = model.Email,
                Phone = model.Phone,
                Password = model.Password
            };

            Donor loggedInDonor = new Donor();

            try
            {
                context.Donors.Add(newDonor);
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error" + ex.Message);
            }

            return Ok(model);
        }


        [HttpPost("Login")]
        public IActionResult Login([FromBody] DonorLoginObject login)
        {
            Donor matchedDonor = null;

            List<Donor> donors = context.Donors.ToList();
            foreach (Donor donor in donors)
            {
                if (login.UserName == donor.Email)
                {
                    matchedDonor = donor;
                    break;
                }
            }
            if (matchedDonor != null && matchedDonor.Password == login.Password)
            {
                LoggedInDonorId = matchedDonor.Id;
                //return Ok(new JsonResult(new { message = "Login Successful!", redirectTo = "/donor-dashboard" }));
                return Ok(new { message = "Login Successful!", redirectTo = "/donor-dashboard" });
            }
            return BadRequest();
        }

        ///Use Find() to locate the logged in user in the database by their Id
        [HttpGet("FindLoggedInDonor")]

        public IActionResult FindLoggedInDonor()
        {
            //Donor? TestDonor = context.Donors.First(donor => donor.Id == LoggedInDonorId);
            Donor TestDonor = context.Donors.Find(1);
            if (TestDonor != null)
            {
                return Ok(TestDonor);
            }
            return StatusCode(404, "Donor not found");
        }

           /* var loggedInDonor2 = BloodDbContext.Donors
                  .Where(s => s.Id == Donors.Id)
                  .Include(s => s.FirstName)
                  .FirstOrDefault();
           */

          ///Iterate through the user's data and add them as parameters to a loggedInDonor object of the Donor class


            //// PUT api/<UserController>/5
            //[HttpPut("{id}")]
            //public void Put(int id, [FromBody] string value)
            //{
            //}

            //// DELETE api/<UserController>/5
            //[HttpDelete("{id}")]
            //public void Delete(int id)
            //{
            //}
        }
}
