

using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Repository;

public class RepositoryContext : DbContext
{
    public RepositoryContext(DbContextOptions options):base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }

    public DbSet<User>? Users{get;set;}
    public DbSet<Character>? Characters{get;set;}
}