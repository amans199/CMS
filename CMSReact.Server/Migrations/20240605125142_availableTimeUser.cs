using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CMSReact.Server.Migrations
{
    /// <inheritdoc />
    public partial class availableTimeUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AvailableTimeFrom",
                table: "Users",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AvailableTimeNote",
                table: "Users",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AvailableTimeTo",
                table: "Users",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AvailableWeekDays",
                table: "Users",
                type: "TEXT",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "AvailableTimeFrom", "AvailableTimeNote", "AvailableTimeTo", "AvailableWeekDays" },
                values: new object[] { "", "", "", "[]" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AvailableTimeFrom",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "AvailableTimeNote",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "AvailableTimeTo",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "AvailableWeekDays",
                table: "Users");
        }
    }
}
