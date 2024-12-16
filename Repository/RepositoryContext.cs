
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Models;

using Repository;

public class RepositoryContext : DbContext, IRepository
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
    

    public async Task<bool> AddNewUserAsync(User user)
    {
        var existing = await GetUserByUsernameAsync(user.Login);

        if(existing != null)
        {
            return false;
        }

        await Users.AddAsync(new User(user.Login,user.Password));
        await SaveChangesAsync();
        return true;
    }   

    public async Task<User?> GetUserByUsernameAsync(string username)
    {
        return await Users.FirstOrDefaultAsync(u => u.Login == username);
    }

    public async Task<User?> GetUserByIdAsync(Guid id)
    {
        return await Users.Where(u => u.ID == id).FirstOrDefaultAsync();
    }

    public async Task<bool> AddNewCharacterAsync(Character c)
    {
        await Characters.AddAsync(c);
        await SaveChangesAsync();

        return true;
    }

    public async Task<Character?> GetCharacterByIdAsync(Guid id)
    {
        return await Characters.Where(u => u.ID == id).FirstOrDefaultAsync();
    }

    public async Task<Character[]> GetCharactersByUserIdAsync(Guid id)
    {
        var user = await GetUserByIdAsync(id);
        Character[] chars = null;

        if(user == null) return chars;

        chars = await Users.Where(u => u.ID == id).SelectMany(u => u.Characters).ToArrayAsync();
        return chars;
        
    }

    public async Task<bool> UpdateCharacterById(Guid id,Character c)
    {
        var existingCharacter = await Characters.Where(ch => ch.ID == id).FirstOrDefaultAsync();
        if(existingCharacter == null) return false;

        Characters.Entry(existingCharacter).CurrentValues.SetValues(c);

        await SaveChangesAsync();

        return true;

    }
    public async Task<bool> DeleteCharacterById(Guid id)
    {
        Character toDelete = await Characters.Where(c => c.ID == id).FirstOrDefaultAsync();
        if(toDelete == null) return false;
        bool result = Characters.Remove(toDelete) != null ? true : false;
        await SaveChangesAsync();
        return result;
    }
}