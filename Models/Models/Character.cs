
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models;

public class Character
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid ID{get;set;}

    [Required]
    public string? Attibutes{get;set;}
    [Required]
    public string? Skills{get;set;}
    [ForeignKey("User")]
    public Guid UserID{get;set;}

    public byte[]? Health{get;set;}

    public int? Experience{get;set;}
    public int? Bloodpool{get;set;}
    public int? WillPower{get;set;}
    public int? WillPowerLimit{get;set;}
    public byte? PathValue{get;set;}
    public string? PathName{get;set;}

    public string? Disciplines{get;set;}
    public string? Backgrounds{get;set;}
    public string? OtherTraits{get;set;}
    public string? Virtues{get;set;}


}