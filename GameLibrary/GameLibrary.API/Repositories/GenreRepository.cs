using GameLibrary.API.Contexts;
using GameLibrary.API.Entities;
using GameLibrary.API.Repositories.Interfaces;

namespace GameLibrary.API.Repositories;

public class GenreRepository : IGenreRepository, IDisposable
{
    private GameLibraryDbContext _dbContext;
    private bool disposed;

    public GenreRepository(GameLibraryDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    #region IGenreRepository

    public void InsertGenre(Genre genre)
    {
        _dbContext.Genres.Add(genre);
        _dbContext.SaveChanges();
    }

    #endregion

    #region IDisposable
    
    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }

    protected virtual void Dispose(bool disposing)
    {
        if (!this.disposed)
        {
            if (disposing)
            {
                _dbContext.Dispose();
            }
        }
        this.disposed = true;
    }

    #endregion
}
