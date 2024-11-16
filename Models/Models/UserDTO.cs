using System.ComponentModel.DataAnnotations;

namespace Models;

public class UserDTO
{
    public required string Password{get;set;}
    public required string Login{get;set;}

    public UserDTO(string login,string password)
    {
        Password = password;
        Login = login;
    }
}