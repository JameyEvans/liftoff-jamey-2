using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System.Reflection.Metadata;
using Microsoft.EntityFrameworkCore.Design;

using Donor = BloodBankManagmemntSystem.Models.Donor;
using BloodBankManagmemntSystem.Models;

namespace BloodBankManagmemntSystem.Data
{
    public class BloodDbContext : DbContext
    {
        public DbSet<Donor>? Donors { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Donation> Donations { get; set; }

        public BloodDbContext(DbContextOptions<BloodDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Donation>()
                .HasOne(d => d.Donor)
                .WithMany(p => p.DonationHistory);
        }

        // this sets the database route 
        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite($"Data Source=BloodDatabase.db");
    }
}