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
        public IActionResult Login([FromBody]DonorLoginObject login)
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
                return Ok(new {message = "Login Successful!", redirectTo = "/donor-dashboard" });
            }
            return BadRequest();
        }


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
