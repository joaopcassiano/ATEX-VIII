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

builder.Services.AddScoped<EnderecoBeneficiarioRepositorio>();
builder.Services.AddScoped<EnderecoBeneficiarioAplicacao>();

builder.Services.AddScoped<DoadorRepositorio>();
builder.Services.AddScoped<DoadorAplicacao>();

builder.Services.AddScoped<EnderecoDoadorRepositorio>();
builder.Services.AddScoped<EnderecoDoadorAplicacao>();

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
