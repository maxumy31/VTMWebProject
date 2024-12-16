using Microsoft.Extensions.Logging;
using Repository;
using Models;
using System;
using System.Threading.Tasks;

namespace Services.CharacterService;

    public class CharacterService : ICharacterService
    {
        private readonly IRepository _context;
        private readonly ILogger<CharacterService> _logger;

        public CharacterService(IRepository context, ILogger<CharacterService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<Character?> CreateCharacterAsync(Character character)
        {
            try
            {
                var userExisting = await _context.GetUserByIdAsync(character.UserID);
                if (userExisting == null)
                {
                    return null;
                }

                var ready = await _context.AddNewCharacterAsync(character);
                if (ready)
                {
                    _logger.LogInformation("New character created for user " + character.UserID);
                    return character;
                }

                return null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<Character?> GetCharacterByIdAsync(Guid id)
        {
            try
            {
                var character = await _context.GetCharacterByIdAsync(id);
                return character;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public async Task<bool> UpdateCharacterByIdAsync(Guid id, Character character)
        {
            try
            {
                var result = await _context.UpdateCharacterById(id, character);
                return result;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public async Task<bool> DeleteCharacterByIdAsync(Guid id)
        {
            try
            {
                var result = await _context.DeleteCharacterById(id);
                return result;
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }

