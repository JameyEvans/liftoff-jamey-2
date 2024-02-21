using BloodBankManagmemntSystem.Data;
using Microsoft.EntityFrameworkCore;

namespace BloodBankManagmemntSystem.Models
{
    public class Donation
    {

        public Donor Donor { get; set; }
        public int DonorId { get; set; }

        public int DonationID { get; set; }
        public string? Date { get; set; }
        public string? Time { get; set; }
        public string? ServicingEmployeeName { get; set; }
        public string? Location { get; set; }

    }
}
