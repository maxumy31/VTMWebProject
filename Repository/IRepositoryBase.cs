using System.Linq.Expressions;
namespace Repository;

public interface IRepositoryBase<T>
{
    IQueryable<T> FindAll(bool track);
    IQueryable<T> FindIf(Expression<Func<T,bool>> expression,bool track);
    void Create(T entity);
    void Update(T entity);
    void Delete(T entity);
}