<<<<<<< HEAD
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
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
app.Run();
=======
using MaisApoio.Aplicacao;
using MaisApoio.MaisApoio.Repositorio.Repositorio;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("Aberto", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

builder.Services.AddScoped<BeneficiarioRepositorio>();
builder.Services.AddScoped<BeneficiarioAplicacao>();

builder.Services.AddScoped<EnderecoRepositorio>();
builder.Services.AddScoped<EnderecoAplicacao>();

builder.Services.AddScoped<CodigoValidacaoUsuarioRepositorio>();

var app = builder.Build();

app.UseCors("Aberto");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
>>>>>>> 446259f3b0b8deb5f2d75cc0ec93e0e98929605e
