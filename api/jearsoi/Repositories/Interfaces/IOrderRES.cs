using jearsoi.Models.Db;

namespace jearsoi.Repositories.Interfaces
{
    public interface IOrderRES : IBaseRES<Order, Guid>
    {
        public IEnumerable<Order> GetByUser(Guid? customerId = null, string? phone = null);
    }
}
