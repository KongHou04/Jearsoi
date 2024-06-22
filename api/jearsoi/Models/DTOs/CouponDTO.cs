namespace jearsoi.Models.Db
{
    public class CouponDTO
    {
        public Guid CouponId { get; set; }

        public bool IsUsed { get; set; } = false;


        public int CpTypeId { get; set; }

        public string? UserId { get; set; }
    }
}
