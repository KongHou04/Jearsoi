namespace jearsoi.Repositories.Interfaces
{
    public interface IBaseRES <T, Y>
    {
        public T? Add(T obj);
        public T? Update(T obj);
        public bool Delete(Y id);
        public IEnumerable<T> Get();
        public T? GetById(Y id);
    }
}
