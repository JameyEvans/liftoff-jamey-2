using Newtonsoft.Json.Linq;
using sib_api_v3_sdk.Api;
using sib_api_v3_sdk.Model;
using System.Diagnostics;

namespace BloodBankManagmemntSystem.Services
{
    public class EmailSender
    {
        public EmailSender() { }

        public static void SendEmail( string senderEmail, string senderName, string recieverEmail, string recieverName, string subject, string message) {


            var apiInstance = new TransactionalEmailsApi();
         
            SendSmtpEmailSender sender = new SendSmtpEmailSender(senderName, senderEmail);
            SendSmtpEmailTo reciever1 = new SendSmtpEmailTo(recieverEmail, recieverName);
            List<SendSmtpEmailTo> To = new List<SendSmtpEmailTo>();
            To.Add(reciever1);
           
            string HtmlContent = null;
            string TextContent = message;
            
            try
            {
                var sendSmtpEmail = new SendSmtpEmail(sender, To, null, null, HtmlContent, TextContent, subject);
                CreateSmtpEmail result = apiInstance.SendTransacEmail(sendSmtpEmail);
               Console.WriteLine("Bravo response:" + result.ToJson());
            }
            catch (Exception e)
            {
                Console.WriteLine("We have an exception: " + e.Message);
      
            }

        }
    }
}
