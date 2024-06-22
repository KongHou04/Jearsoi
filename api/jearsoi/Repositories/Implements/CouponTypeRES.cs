using jearsoi.Models.Db;
using jearsoi.Models.DbContexts;
using jearsoi.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore.Storage;

namespace jearsoi.Repositories.Implements
{
    public class CouponTypeRES : BaseRES<JearsoiDbContext>, ICouponTypeRES
    {
        public CouponTypeRES(JearsoiDbContext dbContext) : base(dbContext)
        {
        }

        public CouponType? Add(CouponType obj)
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

        public IEnumerable<CouponType> Get() => _dbContext.CouponTypes;

        public CouponType? GetById(int id) => _dbContext.CouponTypes.FirstOrDefault(o => o.CpTypeId == id);

        public CouponType? Update(CouponType obj)
        {
            var updatedObj = GetById(obj.CpTypeId);
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
