using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace Repository;
public abstract class RepositoryBase<T> : IRepositoryBase<T> where T : class
{
    protected RepositoryContext context;

    public RepositoryBase(RepositoryContext ctx)
    {
        context = ctx;
    }
    public void Create(T entity)
    {
        context.Set<T>().Add(entity);
    }

    public void Delete(T entity)
    {
        context.Set<T>().Remove(entity);
    }

    public IQueryable<T> FindAll(bool track)
    {
        return track? context.Set<T>() : context.Set<T>().AsNoTracking();
    }

    public IQueryable<T> FindIf(Expression<Func<T, bool>> expression, bool track)
    {
        return track? context.Set<T>().Where(expression) : context.Set<T>().Where(expression).AsNoTracking();
    }

    public void Update(T entity)
    {
        context.Set<T>().Update(entity);
    }
}