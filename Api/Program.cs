using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using Repository;
using Hashing;
using Microsoft.AspNetCore.Authentication.Cookies;
using Auth;
using Validation;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

builder.Services.AddSingleton<IAuthService,CookieAuthService>();

//Добавляем логгер в консоль
builder.Logging.AddConsole();

builder.Services.AddSingleton<IStringValidator,StringValidator>();

//Добавляем репозиторий
builder.Services.AddSingleton<RepositoryContextFactory>();
builder.Services.AddScoped(provider =>
{
    var factory = provider.GetRequiredService<RepositoryContextFactory>();
    return factory.CreateDbContext(null) as IRepository; 
});

//Добавляем сервис для хэширования
builder.Services.AddSingleton<IPasswordHasherService,PasswordHasherService>();


//Куки авторизация
builder.Services.AddAuthentication("CookieAuth")
    .AddCookie("CookieAuth", options =>
    {
        //options.LoginPath = "/Account/Login"; 
        options.ExpireTimeSpan = TimeSpan.FromHours(1);
        options.Cookie.HttpOnly = true; 
        options.SlidingExpiration = true;
        options.Cookie.SameSite = SameSiteMode.None;
    });

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie();

//Корс 
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});


var app = builder.Build();

app.UseCors("AllowReactApp");
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/error");
}

app.MapGet("swag",()=>{return "123";});
app.UseHttpsRedirection();


if(app.Configuration.GetValue<bool>("UseDeveloperExceptionPage"))
    app.UseDeveloperExceptionPage();
else
    app.UseExceptionHandler("/error");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.Run();
