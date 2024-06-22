namespace jearsoi.Models.Db
{
    public class ProductDiscountDTO
    {
        public int PDId { get; set; }

        public double HardValue { get; set; } = 0;

        public int PercentValue { get; set; } = 0;

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }


        public string? ProductId {  get; set; }
    }
}
