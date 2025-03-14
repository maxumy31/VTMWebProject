using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class AddedForeignKeyInUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Character_Users_UserId",
                table: "Character");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Character",
                table: "Character");

            migrationBuilder.RenameTable(
                name: "Character",
                newName: "Characters");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Characters",
                newName: "UserID");

            migrationBuilder.RenameIndex(
                name: "IX_Character_UserId",
                table: "Characters",
                newName: "IX_Characters_UserID");

            migrationBuilder.AlterColumn<Guid>(
                name: "UserID",
                table: "Characters",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Skills",
                table: "Characters",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Characters",
                table: "Characters",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Characters_Users_UserID",
                table: "Characters",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "UserID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Characters_Users_UserID",
                table: "Characters");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Characters",
                table: "Characters");

            migrationBuilder.DropColumn(
                name: "Skills",
                table: "Characters");

            migrationBuilder.RenameTable(
                name: "Characters",
                newName: "Character");

            migrationBuilder.RenameColumn(
                name: "UserID",
                table: "Character",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Characters_UserID",
                table: "Character",
                newName: "IX_Character_UserId");

            migrationBuilder.AlterColumn<Guid>(
                name: "UserId",
                table: "Character",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Character",
                table: "Character",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Character_Users_UserId",
                table: "Character",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserID");
        }
    }
}
