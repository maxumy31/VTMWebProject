namespace Hashing;


public interface IPasswordHasherService
{
    public string HashPassword(string password);
    public bool CheckPassword(string hashedPassword, string password);
}