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
