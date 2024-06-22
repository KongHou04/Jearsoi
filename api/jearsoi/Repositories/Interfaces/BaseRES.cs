using jearsoi.Models.DbContexts;

namespace jearsoi.Repositories.Interfaces
{
    public class BaseRES<T>
    {
        protected readonly T _dbContext;
        public BaseRES(T dbContext)
        {
            _dbContext = dbContext;
        }
    }
}
