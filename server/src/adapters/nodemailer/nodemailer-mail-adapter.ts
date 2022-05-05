import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "e7c39607dbe75b",
    pass: "35b7ff35114684",
  },
});
export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Felipe <fmaiavieira@gmail.com>",
      subject,
      html: body,
    });
  }
}
// [
//   `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
//   `<p>Tipo de feedback: ${type}</p>`,
//   `<p>Comentário: ${comment}</p>`,
//   `<div>`,
// ].join("\n"),
