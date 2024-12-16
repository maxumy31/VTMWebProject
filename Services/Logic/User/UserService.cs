using Microsoft.Extensions.Logging;
using Repository;
using Models;
using Hashing;
using Validation;
using System;


namespace Services.UserService;

    public class UserService : IUserService
    {
        private readonly IRepository _context;
        private readonly IPasswordHasherService _hasher;
        private readonly IStringValidator _validator;
        private readonly ILogger<UserService> _logger;

        public UserService(IRepository context, IPasswordHasherService hasher, IStringValidator validator, ILogger<UserService> logger)
        {
            _context = context;
            _hasher = hasher;
            _validator = validator;
            _logger = logger;
        }

        public async Task<User?> GetUserByIdAsync(string userId)
        {

            if (string.IsNullOrEmpty(userId)) return null;

            return await _context.GetUserByIdAsync(new Guid(userId));
        }

        public async Task<User?> CreateUserAsync(User request)
        {
            if (!_validator.validLogin(request.Login) || !_validator.validPassword(request.Password))
                return null;

            var existingUser = await _context.GetUserByUsernameAsync(request.Login);
            if (existingUser != null)
                return null;

            User user;
            try
            {
                user = new User(request.Login, _hasher.HashPassword(request.Password));
            }
            catch (Exception e)
            {
                _logger.LogError($"Error creating user: {e.Message}");
                return null;
            }

            var result = await _context.AddNewUserAsync(user);
            if (!result)
            {
                return null;
            }

            return await _context.GetUserByUsernameAsync(user.Login);
        }

        public async Task<Character[]?> GetCharactersByUserIdAsync(Guid userId)
        {
            var characters = await _context.GetCharactersByUserIdAsync(userId);

            if (characters != null)
                return characters;

            return null;
        }


    }
