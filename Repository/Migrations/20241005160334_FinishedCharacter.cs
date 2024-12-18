using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class FinishedCharacter : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Backgrounds",
                table: "Characters",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Bloodpool",
                table: "Characters",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Disciplines",
                table: "Characters",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Experience",
                table: "Characters",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "Health",
                table: "Characters",
                type: "bytea",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OtherTraits",
                table: "Characters",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PathName",
                table: "Characters",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<byte>(
                name: "PathValue",
                table: "Characters",
                type: "smallint",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Virtues",
                table: "Characters",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "WillPower",
                table: "Characters",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "WillPowerLimit",
                table: "Characters",
                type: "integer",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Backgrounds",
                table: "Characters");

            migrationBuilder.DropColumn(
                name: "Bloodpool",
                table: "Characters");

            migrationBuilder.DropColumn(
                name: "Disciplines",
                table: "Characters");

            migrationBuilder.DropColumn(
                name: "Experience",
                table: "Characters");

            migrationBuilder.DropColumn(
                name: "Health",
                table: "Characters");

            migrationBuilder.DropColumn(
                name: "OtherTraits",
                table: "Characters");

            migrationBuilder.DropColumn(
                name: "PathName",
                table: "Characters");

            migrationBuilder.DropColumn(
                name: "PathValue",
                table: "Characters");

            migrationBuilder.DropColumn(
                name: "Virtues",
                table: "Characters");

            migrationBuilder.DropColumn(
                name: "WillPower",
                table: "Characters");

            migrationBuilder.DropColumn(
                name: "WillPowerLimit",
                table: "Characters");
        }
    }
}
