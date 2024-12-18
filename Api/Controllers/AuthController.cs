using Microsoft.AspNetCore.Mvc;
using Models;
using Repository;
using DTO;
using Hashing;
using Auth;
namespace Api.Controllers;

[Route("[controller]")]
[ApiController]
public class AuthController : ControllerBase{

    //Репозиторий, интерфейс, реализация которого взаимодействует с бд
    //и осуществляет необходимые манипуляции с данными
    private readonly IRepository _context;
    //Логгер, осуществляет логирование
    private readonly ILogger<AuthController> _logger;
    //Интерфейс, реализация которого хэширует пароли для их дальнейшего хранения,
    //а также позволяет сравнивать пароли
    private readonly IPasswordHasherService _hasher;
    //Интерфейс, реализация которого отвечает за работу
    //С авторизацией пользователя. В данный момент
    //реализуется аутентификация с помощью куки
    private readonly IAuthService _auth;

    public AuthController(IRepository context,ILogger<AuthController> logger, IAuthService auth, IPasswordHasherService hasher)
    {
        _logger = logger;
        _context = context;
        _auth = auth;
        _hasher = hasher;
    }

    //Генерирует набор ссылок для паттеран HateOAS
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

    //Проверяет, правильно ли введены данные пользователя
    //Если правильно, то ставит авторизационное куки
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

    //Снимает авторизационное куки
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