using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CMSReact.Server.Migrations
{
    /// <inheritdoc />
    public partial class invoicesAppointments4522 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Dosage",
                table: "Prescriptions");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Dosage",
                table: "Prescriptions",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
