﻿using BloodBankManagmemntSystem.ComponentModel;
using BloodBankManagmemntSystem.Data;
using BloodBankManagmemntSystem.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System.Diagnostics;
using System.Drawing.Drawing2D;
using System.Net.Http;
using System.Xml.Serialization;

namespace BloodBankManagmemntSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DonorController : ControllerBase
    {
        // establish database context
        private BloodDbContext context;

        // import httpclient????
        private readonly HttpClient _httpClient;

        public DonorController(BloodDbContext dbcontext, IHttpClientFactory httpClientFactory)
        {
            context = dbcontext;
            _httpClient = httpClientFactory.CreateClient();
        }

        // create class for login objects 
        public class DonorLoginObject
        {
            public string UserName { get; set; }
            public string Password { get; set; }
        }

        public int LoggedInDonorId { get; set; }

        // geocoding request

        public class Geocode
        {
            public string Address { get; set; }
        }

        public class Coordinates
        {
            public Coordinates() { }

            public double Latitude { get; set; }
            public double Longitude { get; set; }
            public Coordinates(double latitude, double longitude)
            {
                Latitude = latitude;
                Longitude = longitude;
            }
        }

        public class BloodBankDonationDetails
        {
            public BloodBankDonationDetails() { }
            public string Name { get; set; }
            public string PlaceID { get; set; }
            public string Address { get; set; }

            public BloodBankDonationDetails(string name, string id, string address)
            {
                Name = name;
                PlaceID = id;
                Address = address;

            }
        }


        // also the apiKey for google maps
        private string apiKey = "AIzaSyCfRjtPBXDS9k6LvxstSqfRgUTkKk134KQ";

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
                LoggedInDonorId = matchedDonor.Id;
                return Ok(new {message = "Login Successful!", redirectTo = "/donor-dashboard" });
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


        [HttpPost("GeocodeAddress")]
        public async Task<IActionResult> GeocodeAddress([FromBody] Geocode request)
        {
            string baseURL = "https://maps.googleapis.com/maps/api/geocode/json";
            string fullURL = $"{baseURL}?address={Uri.EscapeDataString(request.Address)}&key={apiKey}";

            // send HTTP request
            HttpResponseMessage response = await _httpClient.GetAsync(fullURL);

            if (response.IsSuccessStatusCode)
            {
                string responseContent = await response.Content.ReadAsStringAsync();
                JObject json = JObject.Parse(responseContent);

                if (json["status"].ToString() == "OK")
                {
                    var location = json["results"][0]["geometry"]["location"];

                    Coordinates coordinatesSet = new Coordinates((double)location["lat"], (double)location["lng"]);

                    return Ok(coordinatesSet);
                }
                
                else
                {
                    return NotFound("No results found for the specified address.");
                }
            }
            else
            {
                return StatusCode(500, "Failed to geocode address due to an external API error.");
            }
        }
        [HttpGet("LocateNearbyDonationSites")]
        public async Task<IActionResult> LocateNearbyDonationSites([FromQuery] Coordinates coordinateSet)
        {
            string baseURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
            string fullURL = $"{baseURL}?location={coordinateSet.Latitude},{coordinateSet.Longitude}&radius=5000&type=health&keyword=blood+bank&key={apiKey}";

            HttpResponseMessage response = await _httpClient.GetAsync(fullURL);

            if (response.IsSuccessStatusCode)
            {
                string responseContent = await response.Content.ReadAsStringAsync();
                JObject json = JObject.Parse(responseContent);

                if (json["status"].ToString() == "OK")
                {
                    List<BloodBankDonationDetails> bloodBankList = new List<BloodBankDonationDetails>();

                    JArray resultsArray = (JArray)json["results"];
                    for (int i = 0; i < resultsArray.Count; i++)
                    {
                        var arrayItem = resultsArray[i];
                        bloodBankList.Add(new BloodBankDonationDetails((string)arrayItem["name"], (string)arrayItem["place_id"], (string)arrayItem["vicinity"]));
                    }

                    Debug.WriteLine($"{bloodBankList}");
                    for (int i = 0; i < bloodBankList.Count; i++)
                    {
                        Debug.WriteLine(bloodBankList[i].Name);
                    }
                    return Ok(bloodBankList);
                    
                }
                else
                {
                    return NotFound("No results found for the specified location");
                }
            }
            else
            {
                return StatusCode(500, "Failed to get nearby places due to an external APi error");
            }
        }
        
    }
}
