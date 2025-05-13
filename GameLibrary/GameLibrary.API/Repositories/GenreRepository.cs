using GameLibrary.API.Contexts;
using GameLibrary.API.Entities;
using GameLibrary.API.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

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

    public async Task<List<Genre>> GetAllAsync()
    {
        return await _dbContext.Genres.OrderBy(g => g.Name).ToListAsync();
    }

    public async Task InsertAsync(Genre genre)
    {
        _dbContext.Genres.Add(genre);
        await _dbContext.SaveChangesAsync();
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
