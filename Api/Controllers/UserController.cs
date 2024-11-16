
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Models;
using Repository;
using Repository.DTO;

namespace Api.Controllers;

[Route("[controller]")]
[ApiController]
public class UserController:ControllerBase
{
    private readonly ILogger<UserController> _logger;
    private readonly RepositoryContext _context;

    public UserController(RepositoryContext context,ILogger<UserController> logger)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet("")]
    public async Task<RestDTO<User[]>> GetAllUsers()
    {
        var query = _context.Users;
        return new RestDTO<User[]>
        {   
            Data = await query.ToArrayAsync(),
            Links = GenerateUserLinkPool()
        };
    }

    [HttpGet("{id}")]
    public async Task<RestDTO<User?>> GetUserByID(Guid id)
    {
        var query = _context != null ? _context.Users : null;
        if(_context == null) throw new Exception("Null database context");
        return new RestDTO<User?>
        {
            Data = await query.Where(u => u.ID == id).FirstOrDefaultAsync(),
            Links = GenerateUserLinkPool()
        };
    }

    [NonAction]
    public List<LinkDTO> GenerateUserLinkPool()
    {
        string path = "http://localhost:5012/";
        return new List<LinkDTO>
        {
            new LinkDTO(path + "User","self","GET"),
            new LinkDTO(path + "User/{id}","self","GET"),
            new LinkDTO(path + "User","self","POST"),
            new LinkDTO(path + "Characters/{userID}","self","Get")
        };
    }

    [HttpPost(Name="")]
    [ResponseCache(NoStore =true)]
    public async Task<RestDTO<UserDTO?>> CreateUser(UserDTO user)
    {
        RestDTO<UserDTO?> dto = new RestDTO<UserDTO?>();

        var query = _context != null ? _context.Users : null;
        if(_context == null) throw new Exception("Null database context");

        var existingUser = await query.Where(u=>u.Login == user.Login).FirstOrDefaultAsync();
        if(existingUser != null)
        {
            dto.Data = null;
            dto.Links = GenerateUserLinkPool();
            return dto;
        }
        
        await query.AddAsync(new User(user.Login,user.Password));
        await _context.SaveChangesAsync();
        dto.Data = user;
        dto.Links = GenerateUserLinkPool();
        return dto;
    }

    [HttpDelete("{id}")]
    public async Task<RestDTO<User?>> DeleteUserByID(Guid id)
    {
        var query = _context.Users;
        User? toDelete = await query.Where(c => c.ID == id).AsNoTracking().FirstOrDefaultAsync();
        bool result = query.Remove(toDelete) != null ? true : false;
        await _context.SaveChangesAsync();
        if(result)
        {
            return new RestDTO<User?>
            {
                Data = toDelete,
                Links = GenerateUserLinkPool()
            };
        }
        else
        {
            return new RestDTO<User?>
            {
                Data = toDelete,
                Links = GenerateUserLinkPool()
            };
        }
    }

    [HttpGet("/Characters/{userID}")]
    public async Task<RestDTO<Character[]?>> GetCharacterIdsForUserID(Guid userID)
    {
        Character[] chars = await _context.Characters.Where(c=>c.UserID == userID).AsNoTracking().AsQueryable().ToArrayAsync();
        return new RestDTO<Character[]?>
        {
            Data = chars,
            Links = GenerateUserLinkPool()
        };
    }

}