using GameLibrary.API.Contexts;
using GameLibrary.API.Entities;
using GameLibrary.API.Repositories;
using GameLibrary.API.Repositories.Interfaces;
using GameLibrary.API.Validation;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var connectionString =
    builder.Configuration.GetConnectionString("DefaultConnection")
        ?? throw new InvalidOperationException("Connection string"
        + "'DefaultConnection' not found.");

var corsName = "AllowWebApiCallsFromReactFrontEnd";

// Add services to the container.
builder.Services.AddDbContext<GameLibraryDbContext>(opts =>
{
    opts.UseSqlServer(connectionString);
});

builder.Services.AddCors(options => {
    options.AddPolicy(name: corsName, policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .WithMethods("GET", "POST", "PUT", "DELETE");
    });
});


builder.Services.AddScoped<IGenreRepository, GenreRepository>();
builder.Services.AddScoped<IValidator<Genre>, GenreValidator>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(corsName);

app.UseAuthorization();

app.MapControllers();

app.Run();
