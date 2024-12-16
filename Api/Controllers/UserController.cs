using Hashing;
using Microsoft.AspNetCore.Mvc;
using Models;
using Repository;
using DTO;
using Auth;
using Validation;
using Services.UserService;

namespace Api.Controllers;

[Route("[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    //Логгер, осуществляет логирование
    private readonly ILogger<UserController> _logger;
    //Репозиторий, интерфейс, реализация которого взаимодействует с бд
    //и осуществляет необходимые манипуляции с данными
    private readonly IRepository _context;
    //Интерфейс, реализация которого хэширует пароли для их дальнейшего хранения,
    //а также позволяет сравнивать пароли
    private readonly IPasswordHasherService _hasher;
    //Интерфейс, реализация которого проверяет, соответствует ли строка необходимым требованиям
    //Позволяет проверять логин и пароль на соответствие некоторым правилам
    private readonly IStringValidator _validator;
    //Интерфейс сервиса с логикой контроллера
    private readonly IUserService _userService;

    public UserController(IRepository context,ILogger<UserController> logger, IPasswordHasherService hasher, 
        IAuthService auth, IStringValidator validator, IUserService userService)
    {
        _hasher = hasher;
        _logger = logger;
        _context = context;
        _validator = validator;
        _userService = userService;
    }

    //Генерирует набор ссылок для паттерна HATEOAS
    [NonAction]
    public List<LinkDTO> GenerateUserLinkPool()
    {
        string path = "http://localhost:5012/";
        return new List<LinkDTO>
        {
            new LinkDTO(path + "User","self","GET"),
            new LinkDTO(path + "User","self","POST"),
            new LinkDTO(path + "Characters","self","Get")
        };
    }

    //Метод позволяет получить пользователя, оперируя данными из
    //аутентификационного куки
    [HttpGet("")]
    public async Task<RestDTO<User?>> GetUserByAuth()
    {
        _logger.LogInformation("debug");
        RestDTO<User?> dto = new RestDTO<User?>();
        dto.Links = GenerateUserLinkPool();

        var idClaim = HttpContext.User.FindFirst("id");
        if(idClaim == null) return dto;
        var id = idClaim.Value;
        if(id == null) return dto;
        _logger.LogInformation("Cookie found");

        
        User user = await _userService.GetUserByIdAsync(id);
        
        dto.Data = user;
        

        return dto;
    }

    

    //Метод позволяет создать пользователя
    //Возвращает данные пользователя при успехе
    [HttpPost(Name="")]
    [ResponseCache(NoStore =true)]
    public async Task<RestDTO<User?>> CreateUser(UserDTO request)
    {
        RestDTO<User?> dto = new RestDTO<User?>();
        dto.Links = GenerateUserLinkPool();

        User user = new User(request.Login,request.Password);
        dto.Data = await _userService.CreateUserAsync(user);
        return dto;
    }

    //Метод возвращает всех персонажей, которые принадлежат пользователю с заданным id
    [HttpGet("/Characters/")]
    public async Task<RestDTO<Character[]>> GetCharacterIdsForUserID(Guid userID)
    {
        RestDTO<Character[]> dto = new RestDTO<Character[]>();
        dto.Links = GenerateUserLinkPool();

        dto.Data = await _userService.GetCharactersByUserIdAsync(userID);
        return dto;
    }

}