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

    [HttpPost("")]
    public async Task<IActionResult> Login(UserDTO user)
    {
        var foundUser = await _context.GetUserByUsernameAsync(user.Login);
        if(foundUser == null) return NotFound();
        var passwordCompare = _hasher.VerifyPassword(foundUser.Password,user.Password);
        if(!passwordCompare) return NotFound();

        await _auth.SetAuthAsync(HttpContext,foundUser);
        _logger.LogInformation("Cookie was set");

        return Ok("Login succesful");
    }

    [HttpDelete("")]
    public async Task<IActionResult> Logout()
    {
        await _auth.ClearAuthAsync(HttpContext);
        return Ok("Logout finished");
    }

}