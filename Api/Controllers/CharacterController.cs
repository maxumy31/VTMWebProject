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
    private readonly RepositoryContext _context;

    public CharacterController(RepositoryContext context,ILogger<UserController> logger)
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
    public async Task<RestDTO<Character>> CreateCharacter(Character c,Guid userID)
    {
        var query = _context.Characters;
        await query.AddAsync(c);
        await _context.SaveChangesAsync();

        return new RestDTO<Character>
        {
            Data=c,
            Links = GenerateCharacterLinkPool()
        };
    }

    [HttpGet("{id}")]
    public async Task<RestDTO<Character>> GetCharacterById(Guid id)
    {
        var query = _context.Characters;
        return new RestDTO<Character>
        {
            Data = await query.Where(c=>c.ID == id).FirstOrDefaultAsync(),
            Links = GenerateCharacterLinkPool()
        };
    }

    [HttpPut("")]
    public async Task<RestDTO<Character>> UpdateCharacterById(Character c)
    {
        var query = _context.Characters;
        var existingCharacter = await query.Where(ch => ch.ID == c.ID).FirstOrDefaultAsync();
        if(existingCharacter == null)
        {
            return new RestDTO<Character>
            {
                Links = GenerateCharacterLinkPool(),
                Data = null
            };
        }

        query.Entry(existingCharacter).CurrentValues.SetValues(c);

        await _context.SaveChangesAsync();

        return new RestDTO<Character>
        {
            Data = await query.Where(ch=>ch.ID == c.ID).AsNoTracking().FirstOrDefaultAsync(),
            Links = GenerateCharacterLinkPool()
        };
    }

    [HttpDelete("{id}")]
    public async Task<RestDTO<Character>> DeleteCharacterById(Guid id)
    {
        var query = _context.Characters;
        Character toDelete = await query.Where(c => c.ID == id).FirstOrDefaultAsync();
        bool result = query.Remove(toDelete) != null ? true : false;
        await _context.SaveChangesAsync();
        if(result)
        {
            return new RestDTO<Character>
            {
                Data = toDelete,
                Links = GenerateCharacterLinkPool()
            };
        }
        else
        {
            return new RestDTO<Character>
            {
                Data = null,
                Links = GenerateCharacterLinkPool()
            };
        }
    }

}