using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System.Reflection.Metadata;
using Microsoft.EntityFrameworkCore.Design;

using RegisterModel = BloodBankManagmemntSystem.Models.RegisterModel;

namespace BloodBankManagmemntSystem.Data
{
    public class BloodDbContext : DbContext
    {
        //public DbSet<RegisterModel>? registerModel { get; set; }

        //public BloodDbContext(DbContextOptions<BloodDbContext> options) : base(options)
        //{
        //}
        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    //set up your connection for one to many (employer to jobs)
        //    base.OnModelCreating(modelBuilder);

        //}

        public DbSet<RegisterModel> registerModel { get; set; }
        //public DbSet<Post> Posts { get; set; }

        public string DbPath { get; }

        public BloodDbContext()
        {
            var folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Environment.GetFolderPath(folder);
            DbPath = System.IO.Path.Join(path, "BloodDB.db");

        }

        // The following configures EF to create a Sqlite database file in the
        // special "local" folder for your platform.
        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite($"Data Source={DbPath}");
    }
}
