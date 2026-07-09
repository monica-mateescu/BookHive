import { EMAIL_FROM, RESEND_API_KEY } from '#config';
import { Resend } from 'resend';

const resend = new Resend(RESEND_API_KEY);

type SendEmail = {
  to: string;
  subject: string;
  html: string;
};

export const sendEmail = async ({ to, subject, html }: SendEmail) => {
  await resend.emails.send({
    from: `BookSpine <${EMAIL_FROM}>`,
    to,
    subject,
    html
  });
};
