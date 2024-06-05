using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CMSReact.Server.Migrations
{
    /// <inheritdoc />
    public partial class invoice : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DoctorName",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "PatientName",
                table: "Invoices");

            migrationBuilder.AddColumn<int>(
                name: "DoctorId",
                table: "Invoices",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PatientId",
                table: "Invoices",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DoctorId",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "PatientId",
                table: "Invoices");

            migrationBuilder.AddColumn<string>(
                name: "DoctorName",
                table: "Invoices",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PatientName",
                table: "Invoices",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
