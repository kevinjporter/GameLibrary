using GameLibrary.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace GameLibrary.API.Contexts;

public class GameLibraryDbContext : DbContext
{
    public GameLibraryDbContext(DbContextOptions<GameLibraryDbContext> options)
        : base(options)
    {
        Database.EnsureCreated();
    }

    public DbSet<Game> Games { get; set; }
    public DbSet<Genre> Genres { get; set; }
}
