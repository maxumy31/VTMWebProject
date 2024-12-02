namespace Validation.COR;

public interface IValidator
{
    (bool, string) check(string str);
    void setNext(IValidator v);
}