using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System.Reflection.Metadata;
using Microsoft.EntityFrameworkCore.Design;

namespace BloodBankManagmemntSystem.Data
{

    public class BloodDbContextFactory : IDesignTimeDbContextFactory<BloodDbContext>
    {
        public BloodDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<BloodDbContext>();
            optionsBuilder.UseSqlite("Data Source=BloodDtatabase.db");

            return new BloodDbContext(optionsBuilder.Options);
        }
    }
}
