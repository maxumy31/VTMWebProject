using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using Repository;
using Repository.DTO;

namespace Api.Controllers;

[Route("[controller]")]
[ApiController]
public class CharacterController : ControllerBase
{
    private readonly ILogger<UserController> _logger;
    private readonly IRepository _context;

    public CharacterController(IRepository context,ILogger<UserController> logger)
    {
        _logger = logger;
        _context = context;
    }

    [NonAction]
    public List<LinkDTO> GenerateCharacterLinkPool()
    {
        string path = "http://localhost:5012/";
        return new List<LinkDTO>
        {
            new LinkDTO(path + "Character","self","POST"),

        };
    }

    [HttpPost("")]
    public async Task<RestDTO<Character?>> CreateCharacter(CharacterDTO character)
    {
        var userExisting = await _context.GetUserByIdAsync(character.UserID);
        Character newCharacter = new Character();
        newCharacter.CharacterData = character.CharacterData;
        newCharacter.UserID = character.UserID;
        var ready = await _context.AddNewCharacterAsync(newCharacter);
        _logger.LogInformation("New character created");

        return new RestDTO<Character?>
        {
            Data = newCharacter,
            Links = GenerateCharacterLinkPool()
        };

    }

    [HttpGet("")]
    public async Task<RestDTO<Character>> GetCharacterById(Guid id)
    {
        return new RestDTO<Character>
        {
            Data = await _context.GetCharacterByIdAsync(id),
            Links = GenerateCharacterLinkPool()
        };
    }

    [HttpPut("")]
    public async Task<RestDTO<bool>> UpdateCharacterById(Character c)
    {
        var result = await _context.UpdateCharacterById(c.ID,c);
        if(result) _logger.LogInformation("Character was updated");
        return new RestDTO<bool>
        {
            Data = result,
            Links = GenerateCharacterLinkPool()
        };
    }

    [HttpDelete("")]
    public async Task<RestDTO<bool>> DeleteCharacterById(Guid id)
    {
        bool result = await _context.DeleteCharacterById(id);
        if(result) _logger.LogInformation("Character was deleted");
        return new RestDTO<bool>
        {
            Data = result,
            Links = GenerateCharacterLinkPool()
        };

    }

}