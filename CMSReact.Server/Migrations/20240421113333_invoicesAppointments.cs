using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CMSReact.Server.Migrations
{
    /// <inheritdoc />
    public partial class invoicesAppointments : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Prescriptions_AppointmentId",
                table: "Prescriptions");

            migrationBuilder.DropIndex(
                name: "IX_Invoices_AppointmentId",
                table: "Invoices");

            migrationBuilder.AddColumn<int>(
                name: "InvoiceId",
                table: "Appointments",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PrescriptionId",
                table: "Appointments",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Prescriptions_AppointmentId",
                table: "Prescriptions",
                column: "AppointmentId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_AppointmentId",
                table: "Invoices",
                column: "AppointmentId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Prescriptions_AppointmentId",
                table: "Prescriptions");

            migrationBuilder.DropIndex(
                name: "IX_Invoices_AppointmentId",
                table: "Invoices");

            migrationBuilder.DropColumn(
                name: "InvoiceId",
                table: "Appointments");

            migrationBuilder.DropColumn(
                name: "PrescriptionId",
                table: "Appointments");

            migrationBuilder.CreateIndex(
                name: "IX_Prescriptions_AppointmentId",
                table: "Prescriptions",
                column: "AppointmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_AppointmentId",
                table: "Invoices",
                column: "AppointmentId");
        }
    }
}
