using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models;

public class User
{   
    
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column("UserID")]
    public Guid ID{get;set;}

    [Required]
    [MaxLength(20)]
    public string Login{get;set;}

    [Required]
    public string Password{get;set;}

    public ICollection<Character>? Characters{get;set;}

    public User(string login,string password)
    {
        Login = login;
        Password = password;
        Characters = [];
    }
}