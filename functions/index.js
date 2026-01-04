const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const nodemailer = require("nodemailer");

// Configure the email sender
// INSTRUCTIONS:
// 1. Go to Google Account > Security > 2-Step Verification > App Passwords
// 2. Generate a new password named "Firebase"
// 3. Paste the 16-character code below inside the quotes (remove spaces if you want, though Gmail handles them)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "guydznshv@gmail.com",
    pass: "zpcu pjra ublv teps", 
  },
});

exports.onLeadCreated = onDocumentCreated("leads/{leadId}", async (event) => {
  const lead = event.data ? event.data.data() : null;

  if (!lead) {
    console.log("No data found");
    return;
  }

  const mailOptions = {
    from: "Ben HaMeganen Website <guydznshv@gmail.com>",
    to: "guydznshv@gmail.com",
    subject: `פנייה חדשה מאתר בן המגנן: ${lead.name}`,
    html: `
      <div style="direction: rtl; font-family: Arial, sans-serif;">
        <h2>התקבלה פנייה חדשה!</h2>
        <p><strong>שם:</strong> ${lead.name}</p>
        <p><strong>טלפון:</strong> <a href="tel:${lead.phone}">${lead.phone}</a></p>
        <p><strong>עיר:</strong> ${lead.city}</p>
        <p><strong>שירות מבוקש:</strong> ${lead.service}</p>
        <p><strong>הודעה:</strong></p>
        <p style="background: #f4f4f4; padding: 10px; border-radius: 5px;">${lead.message}</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
});