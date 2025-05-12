using GameLibrary.API.Entities;

namespace GameLibrary.API.Validation;

public interface IValidator<T>
{
    ValidationResult Validate(T entity);
}
