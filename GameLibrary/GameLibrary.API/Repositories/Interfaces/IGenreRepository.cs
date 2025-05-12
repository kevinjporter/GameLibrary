using GameLibrary.API.Entities;

namespace GameLibrary.API.Repositories.Interfaces;

public interface IGenreRepository
{
    Task InsertGenreAsync(Genre genre);
}
