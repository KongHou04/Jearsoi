namespace jearsoi.Models.Db
{
    public class CouponTypeDTO
    {
        public int CpTypeId { get; set; }

        public double HardValue { get; set; } = 0;

        public int PercentValue { get; set; } = 0;

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        public ICollection<CouponDTO> Coupons = [];
    }
}
