using jearsoi.Models.DbContexts;
using jearsoi.Models.Db;
using jearsoi.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore;

namespace jearsoi.Repositories.Implements
{
    public class CategoryRES : BaseRES<JearsoiDbContext>, ICategoryRES
    {
        public CategoryRES(JearsoiDbContext dbContext) : base(dbContext)
        {
        }

        public Category? Add(Category obj)
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

        public IEnumerable<Category> Get() => _dbContext.Categories.Include(o => o.Products);

        public Category? GetById(Guid id) => _dbContext.Categories.FirstOrDefault(o => o.CategoryId == id);

        public Category? Update(Category obj)
        {
            var updatedObj = GetById(obj.CategoryId);
            if (updatedObj == null) return null;
            using IDbContextTransaction transaction = _dbContext.Database.BeginTransaction();
            try
            {
                updatedObj.Name = obj.Name;
                updatedObj.Description = obj.Description;
                updatedObj.Status = obj.Status;

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
