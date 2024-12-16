using Models;
using System;
using System.Threading.Tasks;

namespace Services.CharacterService;

    public interface ICharacterService
    {
        Task<Character?> CreateCharacterAsync(Character character);
        Task<Character?> GetCharacterByIdAsync(Guid id);
        Task<bool> UpdateCharacterByIdAsync(Guid id, Character character);
        Task<bool> DeleteCharacterByIdAsync(Guid id);
    }

