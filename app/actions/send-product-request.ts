"use server";

import nodemailer from "nodemailer";

export async function sendProductRequest(data: {
  name: string;
  email: string;
  company: string;
  phone: string;
  product: string;
  message: string;
}) {
  const { name, email, company, phone, product, message } = data;

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_EMAIL,
      pass: process.env.ZOHO_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.ZOHO_EMAIL,
    to: "support@vertexcoreai.com",
    subject: `New Product Request: ${product} from ${name}`,
    html: `
      <h2>New Product/Custom Solution Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "N/A"}</p>
      <p><strong>Company:</strong> ${company || "N/A"}</p>
      <p><strong>Product/Service Needed:</strong> ${product}</p>
      <p><strong>Project Details:</strong></p>
      <p>${message || "No details provided."}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending product request email:", error);
    return { success: false, error: "Failed to send email" };
  }
}
