using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using Repository;
using Repository.DTO;
using Hashing;
using Microsoft.AspNetCore.Identity.Data;
using Auth;
namespace Api.Controllers;

[Route("[controller]")]
[ApiController]
public class AuthController : ControllerBase{

    private readonly IRepository _context;
    private readonly ILogger<UserController> _logger;

    private readonly IPasswordHasherService _hasher;

    private readonly IAuthService _auth;

    public AuthController(IRepository context,ILogger<UserController> logger, IAuthService auth, IPasswordHasherService hasher)
    {
        _logger = logger;
        _context = context;
        _auth = auth;
        _hasher = hasher;
    }

        [NonAction]
    public List<LinkDTO> GenerateUserLinkPool()
    {
        string path = "http://localhost:5012/";
        return new List<LinkDTO>
        {
            new LinkDTO(path + "Login","self","GET"),
            new LinkDTO(path + "Login","self","DELETE"),

        };
    }

    [HttpPost("")]
    public async Task<RestDTO<bool>> Login(UserDTO user)
    {
        RestDTO<bool> dto = new RestDTO<bool>();
        dto.Links = GenerateUserLinkPool();

        var foundUser = await _context.GetUserByUsernameAsync(user.Login);
        if(foundUser == null) return dto;
        bool passwordCompare = false;
        try
        {
        passwordCompare = _hasher.VerifyPassword(foundUser.Password,user.Password);
        }
        catch (Exception e)
        {
            return dto;
        }
        if(!passwordCompare) return dto;

        await _auth.SetAuthAsync(HttpContext,foundUser);
        _logger.LogInformation("Cookie was set");
        dto.Data = true;

        return dto;
    }

    [HttpDelete("")]
    public async Task<RestDTO<bool>> Logout()
    {
        RestDTO<bool> dto = new RestDTO<bool>();
        dto.Links = GenerateUserLinkPool();
        dto.Data = true;
        await _auth.ClearAuthAsync(HttpContext);
        return dto;
    }

}