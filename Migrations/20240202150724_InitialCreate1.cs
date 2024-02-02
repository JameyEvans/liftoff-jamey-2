using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BloodBankManagmemntSystem.Migrations
{
    public partial class InitialCreate1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_registerModel",
                table: "registerModel");

            migrationBuilder.AlterColumn<string>(
                name: "FirstName",
                table: "registerModel",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "registerModel",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0)
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_registerModel",
                table: "registerModel",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_registerModel",
                table: "registerModel");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "registerModel");

            migrationBuilder.AlterColumn<string>(
                name: "FirstName",
                table: "registerModel",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_registerModel",
                table: "registerModel",
                column: "FirstName");
        }
    }
}
