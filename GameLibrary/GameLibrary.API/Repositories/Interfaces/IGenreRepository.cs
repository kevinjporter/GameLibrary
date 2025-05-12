using GameLibrary.API.Entities;

namespace GameLibrary.API.Repositories.Interfaces;

public interface IGenreRepository
{
    void InsertGenre(Genre genre);
}
