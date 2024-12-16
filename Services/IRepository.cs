using System.Linq.Expressions;
using Models;
namespace Repository;

public interface IRepository
{
    public Task<bool> AddNewUserAsync(User user);
    public Task<User?> GetUserByUsernameAsync(string username);
    public Task<User?> GetUserByIdAsync(Guid id);

    public Task<bool> AddNewCharacterAsync(Character c);
    public Task<Character?> GetCharacterByIdAsync(Guid id);
    public Task<Character[]?> GetCharactersByUserIdAsync(Guid id);
    public Task<bool> UpdateCharacterById(Guid id, Character c);
    public Task<bool> DeleteCharacterById(Guid id);


}  