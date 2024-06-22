using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace jearsoi.migrations
{
    /// <inheritdoc />
    public partial class jearsoidb_09 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Status",
                table: "orders",
                newName: "PaymentStatus");

            migrationBuilder.AddColumn<int>(
                name: "DeliveryStatus",
                table: "orders",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeliveryStatus",
                table: "orders");

            migrationBuilder.RenameColumn(
                name: "PaymentStatus",
                table: "orders",
                newName: "Status");
        }
    }
}
