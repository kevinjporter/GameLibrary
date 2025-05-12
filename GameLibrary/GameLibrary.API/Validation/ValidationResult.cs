namespace GameLibrary.API.Validation;

public class ValidationResult
{
    public bool IsValid { get; set; }
    public string? Message { get; set; }

    public ValidationResult(bool isValid = true) => IsValid = isValid;

    public ValidationResult(bool isValid, string message)
    {
        this.IsValid = isValid;
        this.Message = message;
    }
}
