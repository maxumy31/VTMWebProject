namespace Validation;
using Validation.COR;
public class StringValidator : IStringValidator
{
    public bool validPassword(string password)
    {
        IValidator length = new LengthValidator(20,5) as IValidator;


        return length.check(password).Item1;

    }
    public bool validLogin(string login)
    {
        IValidator length = new LengthValidator(20,5) as IValidator;

        return length.check(login).Item1;
    }
}