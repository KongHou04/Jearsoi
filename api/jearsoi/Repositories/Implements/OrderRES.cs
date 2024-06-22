using jearsoi.Models.DbContexts;
using jearsoi.Models.Db;
using jearsoi.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore;

namespace jearsoi.Repositories.Implements
{
    public class OrderRES : BaseRES<JearsoiDbContext>, IOrderRES
    {
        public OrderRES(JearsoiDbContext dbContext) : base(dbContext)
        {
        }

        public Order? Add(Order obj)
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

        public bool Delete(Guid id)
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

        public IEnumerable<Order> Get() => _dbContext.Orders.Include(o => o.OrderDetails);

        public Order? GetById(Guid id) => _dbContext.Orders.Include(o => o.OrderDetails).ThenInclude(o => o.Product).FirstOrDefault(o => o.OrderId == id);

        public IEnumerable<Order> GetByUser(Guid? customerId = null, string? phone = null)
        {
            if (customerId == null && phone == null)
                return [];
            var id = customerId.ToString();
            var data1 = _dbContext.Orders.Include(o => o.OrderDetails).Where(o => o.UserId == id || o.Phone == phone).ToList();
            return data1;
        }

        public Order? Update(Order obj)
        {
            var updatedObj = GetById(obj.OrderId);
            if (updatedObj == null) return null;
            using IDbContextTransaction transaction = _dbContext.Database.BeginTransaction();
            try
            {
                updatedObj.Phone = obj.Phone;
                updatedObj.Address = obj.Address;
                updatedObj.OrderTime = obj.OrderTime;
                updatedObj.SubTotal = obj.SubTotal;
                updatedObj.Discount = obj.Discount;
                updatedObj.Total = obj.Total;
                updatedObj.Note = obj.Note;

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
