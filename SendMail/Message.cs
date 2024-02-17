using MimeKit;
using MailKit.Net.Smtp;


namespace BloodBankManagmemntSystem.SendMail
{
    public class Message
    {
        public string Subject { get; set; }
        public string Content { get; set; }
        public string To{ get; set; }
        public Message(IEnumerable<string> to, string subject, string content)
        {
            Subject = subject;
            Content = content;
        }

        public Message()
        {
        }
    }
}
