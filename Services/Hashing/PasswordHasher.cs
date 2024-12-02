using System.Security.Cryptography;

namespace Hashing;

public class PasswordHasherService : IPasswordHasherService
{
    const int hashSize = 32;
    const int saltSize = 16;
    int iterations = 100000;
    const string delimiter = ":";

    public string HashPassword(string password)
    {
        if (password == null) throw new ArgumentNullException("password");

        byte[] salt = RandomNumberGenerator.GetBytes(saltSize);

        using var pbkdf2 = new Rfc2898DeriveBytes(password, salt, iterations, HashAlgorithmName.SHA256);

        byte[] hash = pbkdf2.GetBytes(hashSize);

        return Convert.ToBase64String(salt) + delimiter + Convert.ToBase64String(hash);
    }
    public bool CheckPassword(string hashedPassword, string password)
    {
        if (hashedPassword == null) throw new ArgumentNullException("hashedPassword");
        if (password == null) throw new ArgumentNullException("password");

        var parts = hashedPassword.Split(delimiter);
        if (parts.Length != 2) throw new FormatException("Неверный формат хэша пароля.");

        byte[] salt = Convert.FromBase64String(parts[0]);
        byte[] hashFromDb = Convert.FromBase64String(parts[1]);

        using var pbkdf2 = new Rfc2898DeriveBytes(password, salt, iterations, HashAlgorithmName.SHA256);
        byte[] hashToVerify = pbkdf2.GetBytes(hashSize);

        return CryptographicOperations.FixedTimeEquals(hashFromDb, hashToVerify);
    }
}