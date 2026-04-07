package com.academic.finkiopendesk.service;

import com.academic.finkiopendesk.model.User;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
//import org.springframework.mail.SimpleMailMessage;

import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

// v1
//    public void sendActivationEmail(User user, String token) {
//        String activationUrl = "http://localhost:5173/register/activate?token=" + token;
//
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo(user.getEmail());
//        message.setSubject("Activate your FinkiOpenDesk Student account");
//        message.setText(
//                "Hello, " + user.getEmail() +
//                        "\n\nPlease click the following link to set your password and activate your account:\n" +
//                        activationUrl + "\n\n" +
//                        "This link will expire in 30 minutes."
//        );
//
//        mailSender.send(message);
//    }

    public void sendFormalActivationEmail(User user, String token) {
        String activationUrl = "http://localhost:5173/register/activate?token=" + token;

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(user.getEmail());
            helper.setSubject("Activate your FinkiOpenDesk Student account");

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

            helper.setText(html, true);

            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }
}