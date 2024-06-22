namespace jearsoi.Models.Db
{
    public class OrderDetailDTO
    {
        public int ODID { get; set; }

        public string ProductName { get; set; } = string.Empty;

        public int Quantity { get; set; } = 1;

        public double UnitPrice { get; set; } = 0;

        public string? Note { get; set; }


        public string? OrderId { get; set; }

        public string? ProductId { get; set; }
    }
}
