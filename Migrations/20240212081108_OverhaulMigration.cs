using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BloodBankManagmemntSystem.Migrations
{
    public partial class OverhaulMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Country",
                table: "Employees",
                newName: "State");

            migrationBuilder.RenameColumn(
                name: "Country",
                table: "Donors",
                newName: "State");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "State",
                table: "Employees",
                newName: "Country");

            migrationBuilder.RenameColumn(
                name: "State",
                table: "Donors",
                newName: "Country");
        }
    }
}
