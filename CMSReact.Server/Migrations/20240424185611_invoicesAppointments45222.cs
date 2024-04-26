using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CMSReact.Server.Migrations
{
    /// <inheritdoc />
    public partial class invoicesAppointments45222 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Prescriptions_Appointments_AppointmentId",
                table: "Prescriptions");

            migrationBuilder.DropIndex(
                name: "IX_Prescriptions_AppointmentId",
                table: "Prescriptions");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Prescriptions_AppointmentId",
                table: "Prescriptions",
                column: "AppointmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Prescriptions_Appointments_AppointmentId",
                table: "Prescriptions",
                column: "AppointmentId",
                principalTable: "Appointments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
