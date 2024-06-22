using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace jearsoi.Migrations
{
    /// <inheritdoc />
    public partial class jearsoidb_02 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "OrderTotal",
                table: "orders",
                newName: "Total");

            migrationBuilder.RenameColumn(
                name: "FinalTotal",
                table: "orders",
                newName: "SubTotal");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "orders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "categories",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "products");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "categories");

            migrationBuilder.RenameColumn(
                name: "Total",
                table: "orders",
                newName: "OrderTotal");

            migrationBuilder.RenameColumn(
                name: "SubTotal",
                table: "orders",
                newName: "FinalTotal");
        }
    }
}
