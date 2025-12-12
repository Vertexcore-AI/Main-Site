"use server";

import nodemailer from "nodemailer";

export async function sendConsultationEmail(data: {
  businessType: string;
  companySize: string;
  budget: string;
  projectType: string[];
  timeline: string;
  goals: string[];
  name: string;
  email: string;
  company: string;
  phone: string;
  note?: string;
}) {
  const {
    businessType,
    companySize,
    budget,
    projectType,
    timeline,
    goals,
    name,
    email,
    company,
    phone,
    note,
  } = data;

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
    subject: `New Consultation Request from ${name}`,
    html: `
      <h2>New Consultation Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Business Type:</strong> ${businessType}</p>
      <p><strong>Company Size:</strong> ${companySize}</p>
      <p><strong>Budget:</strong> ${budget}</p>
      <p><strong>Timeline:</strong> ${timeline}</p>
      <p><strong>Services Needed:</strong> ${projectType.join(", ")}</p>
      <p><strong>Goals:</strong> ${goals.join(", ")}</p>
      <p><strong>Additional Note:</strong></p>
      <p>${note || "No notes provided."}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: "Failed to send email" };
  }
}
