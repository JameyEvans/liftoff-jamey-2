using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Runtime.ExceptionServices;
using System.Xml.Linq;

namespace BloodBankManagmemntSystem.Models
{
 
    public class RegisterModel
    {
        [Key]
        public  int Id { get; set; }    
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }     
        public string? Password { get; set; }
        public string? ConfirmPassword { get; set; }
        public string? Gender { get; set; }
        public string? City { get; set; }
        public string? Country { get; set; }
    }
}
