import Mailgun from 'mailgun.js';
import formData from 'form-data';

export default {

    SendEmail: (emailObject) => {
        const mailgun = new Mailgun(formData);
        const domainKey = process.env.MAILGUN_DOMAIN;
        const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY});
        const sender = `Dokument-Handler <mailgun@${domainKey}>`;
        mg.messages.create(domainKey, {
            from: sender,
            to: [emailObject.receiver],
            subject: emailObject.subject,
            text: emailObject.text,
            html: emailObject.html
        });
    }
}
