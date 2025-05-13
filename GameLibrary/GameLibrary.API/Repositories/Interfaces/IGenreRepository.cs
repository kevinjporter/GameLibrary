using GameLibrary.API.Entities;

namespace GameLibrary.API.Repositories.Interfaces;

public interface IGenreRepository
{
    Task<List<Genre>> GetAllAsync();
    Task InsertAsync(Genre genre);
}
