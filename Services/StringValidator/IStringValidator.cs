namespace Validation;
public interface IStringValidator
{
    bool validPassword(string password);
    bool validLogin(string login);
}