using GameLibrary.API.Entities;

namespace GameLibrary.API.Repositories.Interfaces;

public interface IGenreRepository
{
    Task<List<Genre>> GetAllAsync();
    Task<Genre> GetByIdAsync(int genreId);
    Task InsertAsync(Genre genre);
    Task UpdateAsync(Genre genre);
    Task DeleteAsync(int genreId);
}
