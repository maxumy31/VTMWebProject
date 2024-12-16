using Models;

namespace Services.UserService;

    public interface IUserService
    {
        Task<User?> GetUserByIdAsync(string userId);
        Task<User?> CreateUserAsync(User request);
        Task<Character[]?> GetCharactersByUserIdAsync(Guid userId);
    }
