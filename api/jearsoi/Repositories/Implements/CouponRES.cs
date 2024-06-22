using jearsoi.Models.Db;
using jearsoi.Models.DbContexts;
using jearsoi.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore.Storage;

namespace jearsoi.Repositories.Implements
{
    public class CouponRES : BaseRES<JearsoiDbContext>, ICouponRES
    {
        public CouponRES(JearsoiDbContext dbContext) : base(dbContext)
        {
        }

        public Coupon? Add(Coupon obj)
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

        public IEnumerable<Coupon> Get() => _dbContext.Coupons;

        public Coupon? GetById(Guid id) => _dbContext.Coupons.FirstOrDefault(o => o.CouponId == id);

        public Coupon? Update(Coupon obj)
        {
            var updatedObj = GetById(obj.CouponId);
            if (updatedObj == null) return null;
            using IDbContextTransaction transaction = _dbContext.Database.BeginTransaction();
            try
            {
                updatedObj.IsUsed = obj.IsUsed;
                updatedObj.UserId = obj.UserId;

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
