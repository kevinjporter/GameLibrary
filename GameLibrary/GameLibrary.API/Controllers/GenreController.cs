using GameLibrary.API.DTO;
using GameLibrary.API.Entities;
using GameLibrary.API.Repositories.Interfaces;
using GameLibrary.API.Validation;
using Microsoft.AspNetCore.Mvc;
using System.Web.Http;
using HttpGetAttribute = Microsoft.AspNetCore.Mvc.HttpGetAttribute;
using HttpPostAttribute = Microsoft.AspNetCore.Mvc.HttpPostAttribute;
using HttpPutAttribute = Microsoft.AspNetCore.Mvc.HttpPutAttribute;
using HttpDeleteAttribute = Microsoft.AspNetCore.Mvc.HttpDeleteAttribute;
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

    [HttpGet]
    [Route("{genreId}")]
    public async Task<IActionResult> Get([FromUri] int genreId)
    {
        try
        {
            var genre = await genreRepository.GetByIdAsync(genreId);

            return Ok(genre);
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

    [HttpPut]
    public async Task<IActionResult> Update(GenreDto genreDto)
    {
        try
        {
            var genre = new Genre
            {
                Id = genreDto.Id,
                Name = genreDto.Name
            };

            var validationResult = genreValidator.Validate(genre);

            await genreRepository.UpdateAsync(genre);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }

        return Ok();
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(int genreId)
    {
        try
        {
            await genreRepository.DeleteAsync(genreId);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }

        return Ok();
    }
}
