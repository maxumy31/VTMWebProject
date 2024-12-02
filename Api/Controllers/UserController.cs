using Hashing;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Models;
using Repository;
using Repository.DTO;
using Auth;
using Microsoft.AspNetCore.Authorization;
using Validation;


namespace Api.Controllers;

[Route("[controller]")]
[ApiController]
public class UserController:ControllerBase
{
    private readonly ILogger<UserController> _logger;
    private readonly IRepository _context;
    private readonly IPasswordHasherService _hasher;
    private readonly IAuthService _auth;
    private readonly IStringValidator _validator;

    public UserController(IRepository context,ILogger<UserController> logger, IPasswordHasherService hasher, 
        IAuthService auth, IStringValidator validator)
    {
        _hasher = hasher;
        _logger = logger;
        _context = context;
        _auth = auth;
        _validator = validator;
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

    [HttpGet("")]
    public async Task<RestDTO<User?>> GetUserByAuth()
    {
        _logger.LogInformation("debug");
        RestDTO<User?> dto = new RestDTO<User?>();
        dto.Links = GenerateUserLinkPool();

        var idClaim = HttpContext.User.FindFirst("id");
        if(idClaim == null) return dto;
        var id = idClaim.Value;

        _logger.LogInformation("Cookie found");
        if(id == null) return dto;
        User user = await _context.GetUserByIdAsync(new Guid(id));
        
        dto.Data = user;
        

        return dto;
    }

    


    [HttpPost(Name="")]
    [ResponseCache(NoStore =true)]
    public async Task<RestDTO<User?>> CreateUser(UserDTO request)
    {
        RestDTO<User?> dto = new RestDTO<User?>();
        dto.Links = GenerateUserLinkPool();

        if(!_validator.validLogin(request.Login))
        {
            return dto;
        }
        if (!_validator.validPassword(request.Password))
        {
            return dto;
        }

        var existingUser = await _context.GetUserByUsernameAsync(request.Login);
        if(existingUser != null) 
        {
            return dto;
        }

        User user = new User(request.Login,_hasher.HashPassword(request.Password));


        var result = await _context.AddNewUserAsync(user);
        _logger.LogInformation("Created new user");

        

        if(!result)
        {
            return dto;
        }
        
        dto.Data = await _context.GetUserByUsernameAsync(user.Login);
        return dto;
    }

    [HttpGet("/Characters/")]
    public async Task<RestDTO<Character[]?>> GetCharacterIdsForUserID(Guid userID)
    {
        var chars = await _context.GetCharactersByUserIdAsync(userID);

        RestDTO<Character[]> dto = new RestDTO<Character[]>();
        dto.Links = GenerateUserLinkPool();

        if(chars == null)
        {
            return dto;
        }

        dto.Data = chars;
        return dto;
    }

}