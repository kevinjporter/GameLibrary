using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GameLibrary.API.Entities;

public class Game
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    public required string Title { get; set; }

    [ForeignKey("GenreID")]
    public required Genre Genre { get; set; }

    public int GenreID { get; set; }
}
