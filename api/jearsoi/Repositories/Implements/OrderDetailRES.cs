using jearsoi.Models.DbContexts;
using jearsoi.Models.Db;
using jearsoi.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore.Storage;

namespace jearsoi.Repositories.Implements
{
    public class OrderDetailRES : BaseRES<JearsoiDbContext>, IOrderDetailRES
    {
        public OrderDetailRES(JearsoiDbContext dbContext) : base(dbContext)
        {
        }

        public OrderDetail? Add(OrderDetail obj)
        {
            using IDbContextTransaction transaction = _dbContext.Database.BeginTransaction();
            try
            {
                _dbContext.Add(obj);
                _dbContext.SaveChanges();
                transaction.Commit();
                return obj;
            }
            catch
            {
                transaction.Rollback();
                return null;
            }
        }

        public bool Delete(int id)
        {
            var obj = GetById(id);
            if (obj == null) return false;
            using IDbContextTransaction transaction = _dbContext.Database.BeginTransaction();
            try
            {
                _dbContext.Remove(obj);
                _dbContext.SaveChanges();
                transaction.Commit();
                return true;
            }
            catch
            {
                transaction.Rollback();
                return false;
            }
        }

        public IEnumerable<OrderDetail> Get() => _dbContext.OrderDetails;

        public OrderDetail? GetById(int id) => _dbContext.OrderDetails.FirstOrDefault(o => o.ODID == id);

        public OrderDetail? Update(OrderDetail obj)
        {
            var updatedObj = GetById(obj.ODID);
            if (updatedObj == null) return null;
            using IDbContextTransaction transaction = _dbContext.Database.BeginTransaction();
            try
            {
                updatedObj.ProductName = obj.ProductName;
                updatedObj.Quantity = obj.Quantity;
                updatedObj.UnitPrice = obj.UnitPrice;
                updatedObj.Note = obj.Note;
                updatedObj.ProductId = obj.ProductId;

                _dbContext.Update(updatedObj);
                _dbContext.SaveChanges();
                transaction.Commit();
                return obj;
            }
            catch
            {
                transaction.Rollback();
                return null;
            }
        }
    }
}
