using jearsoi.Models.Db;

namespace jearsoi.Repositories.Interfaces
{
    public interface IProductRES : IBaseRES<Product, Guid>
    {
        public IEnumerable<Product> GetOperating();
    }
}
