using MaisApoio.Aplicacao;
using MaisApoio.MaisApoio.Repositorio.Repositorio;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddScoped<BeneficiarioRepositorio>();
builder.Services.AddScoped<BeneficiarioAplicacao>();

builder.Services.AddScoped<EnderecoRepositorio>();
builder.Services.AddScoped<EnderecoAplicacao>();

builder.Services.AddScoped<CodigoValidacaoUsuarioRepositorio>();

builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
