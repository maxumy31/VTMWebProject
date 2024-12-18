using Microsoft.AspNetCore.Mvc;
using Models;
using Repository;
using DTO;
using Services.CharacterService;

namespace Api.Controllers;

[Route("[controller]")]
[ApiController]
public class CharacterController : ControllerBase
{
    //Логгер, осуществляет логирование
    private readonly ILogger<UserController> _logger;
    //Репозиторий, интерфейс, реализация которого взаимодействует с бд
    //и осуществляет необходимые манипуляции с данными
    private readonly IRepository _context;
    private readonly ICharacterService _characterService;

    public CharacterController(IRepository context,ILogger<UserController> logger, ICharacterService characterService)
    {
        _logger = logger;
        _context = context;
        _characterService = characterService;
    }

    //Генерирует набор ссылок для паттеран HateOAS
    [NonAction]
    public List<LinkDTO> GenerateCharacterLinkPool()
    {
        string path = "http://localhost:5012/";
        return new List<LinkDTO>
        {
            new LinkDTO(path + "Character","self","POST"),
            new LinkDTO(path + "Character","self","POST"),
            new LinkDTO(path + "Character","self","DELETE"),
        };
    }

    //Метод принимает данные о персонаже в виде его id и данных в виде строки
    //Создает его и возвращает данные о созданном персонаже
    [HttpPost("")]
    public async Task<RestDTO<Character?>> CreateCharacter(CharacterDTO character)
    {
        var userExisting = await _context.GetUserByIdAsync(character.UserID);
        Character newCharacter = new Character();
        newCharacter.CharacterData = character.CharacterData;
        newCharacter.UserID = character.UserID;

        return new RestDTO<Character?>
        {
            Data = await _characterService.CreateCharacterAsync(newCharacter),
            Links = GenerateCharacterLinkPool()
        };

    }

    //Метод принимает id персонажа
    //И возвращает персонажа, если его id кому-то соответствует
    [HttpGet("")]
    public async Task<RestDTO<Character>> GetCharacterById(Guid id)
    {
        var character = await _characterService.GetCharacterByIdAsync(id);
        return new RestDTO<Character>
        {
            Data = character,
            Links = GenerateCharacterLinkPool()
        };
    }

    //Метод принимает новое состояние персонажа и по id, полученному из 
    //запроса и обновляет это состояние
    //Возвращает, удалось ли обновить
    [HttpPut("")]
    public async Task<RestDTO<bool>> UpdateCharacterById(Character c)
    {
        var result = await _characterService.UpdateCharacterByIdAsync(c.ID,c);
        if(result) _logger.LogInformation("Character was updated");
        return new RestDTO<bool>
        {
            Data = result,
            Links = GenerateCharacterLinkPool()
        };
    }

    //Метод удаляет персонажа по его id
    //Возвращает, удалось ли удалиить
    [HttpDelete("")]
    public async Task<RestDTO<bool>> DeleteCharacterById(Guid id)
    {
        bool result = await _characterService.DeleteCharacterByIdAsync(id);
        if(result) _logger.LogInformation("Character was deleted");
        return new RestDTO<bool>
        {
            Data = result,
            Links = GenerateCharacterLinkPool()
        };

    }

}