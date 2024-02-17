﻿using MimeKit;
using MailKit.Net.Smtp;


namespace BloodBankManagmemntSystem.SendMail
{
    public class Message
    {
        //public List<MailboxAddress> To { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
        public string To{ get; set; }
        public Message(IEnumerable<string> to, string subject, string content)
        {
           // To = new List<MailboxAddress>();
           // To.AddRange(to.Select(x => new MailboxAddress(x)));
            Subject = subject;
            Content = content;
        }

        public Message()
        {
        }
    }
}
