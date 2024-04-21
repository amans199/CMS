using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CMSReact.Server.Migrations
{
    /// <inheritdoc />
    public partial class Prescriptions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppointmentUser_Appointments_AppointmentId",
                table: "AppointmentUser");

            migrationBuilder.DropForeignKey(
                name: "FK_AppointmentUser_Users_UserId",
                table: "AppointmentUser");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AppointmentUser",
                table: "AppointmentUser");

            migrationBuilder.RenameTable(
                name: "AppointmentUser",
                newName: "AppointmentUsers");

            migrationBuilder.RenameIndex(
                name: "IX_AppointmentUser_UserId",
                table: "AppointmentUsers",
                newName: "IX_AppointmentUsers_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_AppointmentUser_AppointmentId",
                table: "AppointmentUsers",
                newName: "IX_AppointmentUsers_AppointmentId");

            migrationBuilder.AlterColumn<int>(
                name: "Status",
                table: "Appointments",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AppointmentUsers",
                table: "AppointmentUsers",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Prescriptions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    AppointmentId = table.Column<int>(type: "INTEGER", nullable: false),
                    Medication = table.Column<string>(type: "TEXT", nullable: false),
                    Dosage = table.Column<string>(type: "TEXT", nullable: false),
                    Instructions = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Prescriptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Prescriptions_Appointments_AppointmentId",
                        column: x => x.AppointmentId,
                        principalTable: "Appointments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Prescriptions_AppointmentId",
                table: "Prescriptions",
                column: "AppointmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppointmentUsers_Appointments_AppointmentId",
                table: "AppointmentUsers",
                column: "AppointmentId",
                principalTable: "Appointments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AppointmentUsers_Users_UserId",
                table: "AppointmentUsers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppointmentUsers_Appointments_AppointmentId",
                table: "AppointmentUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_AppointmentUsers_Users_UserId",
                table: "AppointmentUsers");

            migrationBuilder.DropTable(
                name: "Prescriptions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AppointmentUsers",
                table: "AppointmentUsers");

            migrationBuilder.RenameTable(
                name: "AppointmentUsers",
                newName: "AppointmentUser");

            migrationBuilder.RenameIndex(
                name: "IX_AppointmentUsers_UserId",
                table: "AppointmentUser",
                newName: "IX_AppointmentUser_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_AppointmentUsers_AppointmentId",
                table: "AppointmentUser",
                newName: "IX_AppointmentUser_AppointmentId");

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "Appointments",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AppointmentUser",
                table: "AppointmentUser",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AppointmentUser_Appointments_AppointmentId",
                table: "AppointmentUser",
                column: "AppointmentId",
                principalTable: "Appointments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AppointmentUser_Users_UserId",
                table: "AppointmentUser",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
