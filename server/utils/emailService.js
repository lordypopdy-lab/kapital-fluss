import { Resend } from "resend";

const resendApiKey = "re_7aVbrNEf_8RJ1xUDuAZFdxnrePtD2wxnj";

if (!resendApiKey) {
  throw new Error("RESEND_API_KEY is not defined in .env");
}

const resend = new Resend(resendApiKey);

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const response = await resend.emails.send({
      from: "deelordpopdy@gmail.com",
      to,
      subject,
      html,
    });
    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
