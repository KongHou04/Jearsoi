using jearsoi.Models.DbContexts;
using jearsoi.Models.Db;
using jearsoi.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore.Query.Internal;
using Microsoft.EntityFrameworkCore.SqlServer.Storage.Internal;
using Microsoft.EntityFrameworkCore.Storage;
using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace jearsoi.Repositories.Implements
{
    public class ProductRES : BaseRES<JearsoiDbContext>, IProductRES
    {
        public ProductRES(JearsoiDbContext dbContext) : base(dbContext)
        {
        }

        public Product? Add(Product obj)
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

        public IEnumerable<Product> Get() => _dbContext.Products;

        public Product? GetById(Guid id) => _dbContext.Products.FirstOrDefault(o => o.ProductId == id);

        public IEnumerable<Product> GetOperating()
        {
            return _dbContext.Products.Include(o => o.Category).Where(product =>
                product.Status != 1 && product.Category != null && product.Category.Status != 1
            );
        }

        public Product? Update(Product obj)
        {
            var updatedObj = GetById(obj.ProductId);
            if (updatedObj == null) return null;
            using IDbContextTransaction transaction = _dbContext.Database.BeginTransaction();
            try
            {
                updatedObj.Name = obj.Name;
                updatedObj.Price = obj.Price;
                updatedObj.ImgUrl = obj.ImgUrl;
                updatedObj.Description = obj.Description;
                updatedObj.CategoryId = obj.CategoryId;

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
