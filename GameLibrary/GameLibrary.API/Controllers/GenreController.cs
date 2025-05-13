using GameLibrary.API.Entities;
using GameLibrary.API.Repositories.Interfaces;
using GameLibrary.API.Validation;
using Microsoft.AspNetCore.Mvc;
using System.Web.Http;
using HttpGetAttribute = Microsoft.AspNetCore.Mvc.HttpGetAttribute;
using HttpPostAttribute = Microsoft.AspNetCore.Mvc.HttpPostAttribute;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace GameLibrary.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GenreController : ControllerBase
{
    private IGenreRepository genreRepository;
    private IValidator<Genre> genreValidator;
    
    public GenreController(IGenreRepository genreRepository, IValidator<Genre> genreValidator)
    {
        this.genreRepository = genreRepository;
        this.genreValidator = genreValidator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            var genres = await genreRepository.GetAllAsync();

            return Ok(genres);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost]
    public async Task<IActionResult> Insert(Genre genre)
    {
        try
        {
            var validationResult = genreValidator.Validate(genre);

            if (!validationResult.IsValid) return BadRequest(validationResult.Message);

            await genreRepository.InsertAsync(genre);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }

        return Ok();
    }
}
