namespace Blood_Bank_Management_System.Models
{
    public class Donor
    {
        [System.ComponentModel.DataAnnotations.Key]
        public string firstName { get; set; }
        public string lastName { get; set; }
        public int donorId { get; set; }
        public string donorEmail { get; set; }
        public string password { get; set; }
        public string address { get; set; }
        public string phoneNumber { get; set; }
        public string bloodType { get; set; }
        public string dateOfBirth { get; set; }
        
    }
}
