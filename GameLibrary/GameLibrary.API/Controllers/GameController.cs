using GameLibrary.API.Contexts;
using Microsoft.AspNetCore.Mvc;

namespace GameLibrary.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GameController : ControllerBase
{
    private readonly GameLibraryDbContext _dbContext;
    public GameController(GameLibraryDbContext dbContext)
    {
        _dbContext = dbContext;
    }
}
