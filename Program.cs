using BloodBankManagmemntSystem.Data;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Identity;
using System.Configuration;
using sib_api_v3_sdk.Client;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//Configuration.Default.ApiKey.Add("api-key", "YOUR API KEY");
//var config = builder.Configuration["BrevoApi:ApiKey"];
sib_api_v3_sdk.Client.Configuration.Default.ApiKey.Add("api-key", builder.Configuration["BrevoApi:ApiKey"]);
builder.Services.AddControllersWithViews();


// configure CORS
var specificOrigins = "AppOrigins";

if (builder.Environment.IsDevelopment())
{
    builder.Services.AddCors(options =>
    {
        options.AddPolicy(name: specificOrigins,
            policy =>
            {
                policy.WithOrigins("https://localhost:44412")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
            });
    });
}

// register the DBcontext
builder.Services.AddDbContext<BloodDbContext>(options =>
    options.UseSqlite("Data Source=BloodDatabase.db"));

builder.Services.AddHttpClient();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors(specificOrigins);
app.MapControllers();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
