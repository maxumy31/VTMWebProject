
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models;

public class Character
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid ID{get;set;}

    public string CharacterData{get;set;}

    [ForeignKey("User")]
    [Required]
    public Guid UserID{get;set;}

    public Character()
    {
        CharacterData = "";
    }


}