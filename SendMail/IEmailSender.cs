namespace BloodBankManagmemntSystem.SendMail
{
    public interface IEmailSender
    {
        void SendEmail(Message message);
    }
}
