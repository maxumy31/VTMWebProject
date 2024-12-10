namespace Validation.COR;


public class NumberValidator : IValidator
{
    int count = 0;

    IValidator? next;
    public NumberValidator(int numCount) {count = numCount;}
    public (bool, string) check(string str)
    {
        int nums = str.Count(c => char.IsDigit(c));
        if(nums <= count)
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
        else
        {
            return (false,"Недостаточно цифр в строке");
        }
    }

    public void setNext(IValidator v)
    {
        next = v;
    }

}