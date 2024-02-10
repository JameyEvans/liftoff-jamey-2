using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Runtime.ExceptionServices;
using System.Xml.Linq;

namespace BloodBankManagmemntSystem.Models
{
 
    public class Donor
    {
        [Key]
        public  int Id { get; set; }    
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Gender { get; set; }
        public string? DateOfBirth { get; set; }
        public string? BloodType { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? Country { get; set; }
        public string? Email { get; set; }   
        public string? Phone {  get; set; }
        public string? Password { get; set; }

    }
}
