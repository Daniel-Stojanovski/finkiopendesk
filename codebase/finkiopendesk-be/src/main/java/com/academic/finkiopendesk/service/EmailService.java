package com.academic.finkiopendesk.service;

import com.academic.finkiopendesk.model.User;
import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final String sendGridApiKey;

    public EmailService(@Value("${spring.mail.password}") String sendGridApiKey) {
        this.sendGridApiKey = sendGridApiKey;
    }

    public void sendFormalActivationEmail(User user, String token) {

        String activationUrl =
                "https://finkiopendesk.onrender.com/#/register/activate?token=" + token;

        Email from = new Email("opendeskproject.testing@gmail.com");
        Email to = new Email(user.getEmail());
        String subject = "Activate your account";

        String html = """
            <html>
                <body style="font-family: Arial, sans-serif;">
                    <p>Hello, %s</p>

                    <p>Please click the button below to set your password and activate your account:</p>

                    <a href="%s"
                       style="display:inline-block;
                              padding:12px 20px;
                              background-color:#4CAF50;
                              color:white;
                              text-decoration:none;
                              border-radius:5px;">
                        Activate Account
                    </a>

                    <p style="margin-top:20px;">
                        This link will expire in 30 minutes.
                    </p>
                </body>
            </html>
        """.formatted(user.getEmail().split("@")[0], activationUrl);

        Content content = new Content("text/html", html);

        Mail mail = new Mail(from, subject, to, content);

        SendGrid sg = new SendGrid(sendGridApiKey);

        try {
            Request request = new Request();
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());

            sg.api(request);

        } catch (Exception ex) {
            throw new RuntimeException("Failed to send email", ex);
        }
    }
}