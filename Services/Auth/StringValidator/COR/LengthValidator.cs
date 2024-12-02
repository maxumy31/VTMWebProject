namespace Validation.COR;


public class LengthValidator : IValidator
{
    int maxSize = 0;
    int minSize = 0;
    IValidator? next;
    public LengthValidator(int max, int min) {maxSize = max; minSize = min;}
    public (bool, string) check(string str)
    {
        if(str.Length > maxSize || str.Length < minSize)
        {
            return (false,"Неправильный размер строки");
        }
        else
        {
            if(next != null)
            {
                return next.check(str);
            }
            else
            {
                return (true,str);
            }
        }
    }

    public void setNext(IValidator v)
    {
        next = v;
    }

    
}