﻿using MimeKit;
using MimeKit.Text;

namespace BloodBankManagmemntSystem.SendMail
{
    public class EmailSender : IEmailSender
    {
        private readonly EmailConfiguration _emailConfig;
        public EmailSender(EmailConfiguration emailConfig)
        {
            _emailConfig = emailConfig;
        }
        public void SendEmail(Message message)
        {
            var emailMessage = CreateEmailMessage(message);
            Send(emailMessage);
        }
        private MimeMessage CreateEmailMessage(Message message)
        {
            //var emailMessage = new MimeMessage();
            //// emailMessage.From.Add(new MailboxAddress(_emailConfig.From));
            //emailMessage.From.Add(new MailboxAddress("email", _emailConfig.From));
            //emailMessage.To.AddRange(message.To);
            //emailMessage.Subject = message.Subject;
            //emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Text) { Text = message.Content };

            var emailMessage = new MimeMessage();
            emailMessage.From.Add(MailboxAddress.Parse("bbmblaunch@gmail.com"));
            emailMessage.To.Add(MailboxAddress.Parse(message.To.ToString()));
            emailMessage.Subject = message.Subject;
            emailMessage.Body = new TextPart(TextFormat.Plain) { Text = message.Content };



            //var emailMessage = new MimeMessage();
            //emailMessage.From.Add(MailboxAddress.Parse("bbmblaunch@gmail.com"));
            //emailMessage.To.Add(MailboxAddress.Parse("dr.suman1jan@gmail.com"));
            //emailMessage.Subject = "Test Email Subject";
            //emailMessage.Body = new TextPart(TextFormat.Plain) { Text = "Example Plain Text Message Body" };

            return emailMessage;
        }

        private void Send(MimeMessage mailMessage)
        {
            using (var client = new MailKit.Net.Smtp.SmtpClient())
            {
                try
                {
                    client.CheckCertificateRevocation = false;
                    
                    client.Connect(_emailConfig.SmtpServer, _emailConfig.Port, true);
                   //client.Connect("smtp.gmail.com", 465, true);
                    client.AuthenticationMechanisms.Remove("XOAUTH2");
                    client.Authenticate("bbmblaunch@gmail.com", "lfdm jslw qfsi ktob");

                    client.Send(mailMessage);
                }
                catch
                {
                    //log an error message or throw an exception or both.
                    throw;
                }
                finally
                {
                    client.Disconnect(true);
                    client.Dispose();
                }
            }
        }

    }
}