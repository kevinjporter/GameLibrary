using GameLibrary.API.Entities;

namespace GameLibrary.API.Validation;

public class GenreValidator : IValidator<Genre>
{
    public ValidationResult Validate(Genre entity)
    {
        if (entity == null)
        {
            return new ValidationResult(false, "Genre is null or empty");
        }

        if (string.IsNullOrWhiteSpace(entity.Name))
        {
            return new ValidationResult(false, "Genre name is required");
        }

        return new ValidationResult();
    }
}
