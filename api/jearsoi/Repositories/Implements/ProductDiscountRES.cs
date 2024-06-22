using jearsoi.Models.DbContexts;
using jearsoi.Models.Db;
using jearsoi.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore.Storage;

namespace jearsoi.Repositories.Implements
{
    public class ProductDiscountRES : BaseRES<JearsoiDbContext>, IProductDiscountRES
    {
        public ProductDiscountRES(JearsoiDbContext dbContext) : base(dbContext)
        {
        }

        public ProductDiscount? Add(ProductDiscount obj)
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

        public IEnumerable<ProductDiscount> Get() => _dbContext.ProductDiscounts;

        public ProductDiscount? GetById(int id) => _dbContext.ProductDiscounts.FirstOrDefault(o => o.PDId == id);

        public ProductDiscount? Update(ProductDiscount obj)
        {
            var updatedObj = GetById(obj.PDId);
            if (updatedObj == null) return null;
            using IDbContextTransaction transaction = _dbContext.Database.BeginTransaction();
            try
            {
                updatedObj.HardValue = obj.HardValue;
                updatedObj.PercentValue = obj.PercentValue;
                updatedObj.StartTime = obj.StartTime;
                updatedObj.EndTime = obj.EndTime;

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
