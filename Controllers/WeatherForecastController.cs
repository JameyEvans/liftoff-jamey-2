using BloodBankManagmemntSystem.SendMail;
using MailKit.Net.Imap;
using MailKit.Security;
using Microsoft.AspNetCore.Mvc;
using MimeKit.Text;
using MimeKit;

namespace BloodBankManagmemntSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<WeatherForecastController> _logger;
        private IEmailSender _emailSender;
        public WeatherForecastController(ILogger<WeatherForecastController> logger, IEmailSender emailSender)
        {
            _logger = logger;
            _emailSender = emailSender;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {


            //using (var client =new ImapClient()) {
            //    client.Connect("imap.gmail.com", 993, SecureSocketOptions.SslOnConnect);
            //    client.Authenticate("bbmblaunch@gmail.com", "lfdm jslw qfsi ktob");
            //    //var message = new Message(new string[] { "bbmblaunch@gmail.com" }, "Test email", "This is the content from our email.");
            //    var message = new Message();
            //    message.Subject = "User Regidtration Completed!.";
            //    message.Content= "User Registration completed. Please login to see more details.";
            //    message.To = "dr.suman1jan@gmail.com";
            //     _emailSender.SendEmail(message);

            //}



            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
                {
                    Date = DateTime.Now.AddDays(index),
                    TemperatureC = Random.Shared.Next(-20, 55),
                    Summary = Summaries[Random.Shared.Next(Summaries.Length)]
                })
                .ToArray();
        }
    }
}