import { connectToDatabase } from "../../../lib/mongodb";
const nodemailer = require("nodemailer");
import bcrypt from "bcrypt";

export default async function generatePage(req, res) {
  const { db } = await connectToDatabase();

  if (req.method === "POST") {
    const { email } = req.body;
    // console.log(req.body, "req.body");

    const saltRounds = 10;
    // Hash password
    const emailHash = await bcrypt.hash(email, saltRounds);
    try {
      // Find the existing email
      const newsLetter = await db.collection("newsletter").findOne({});

      if (newsLetter) {
        if (!newsLetter.email.includes(email)) {
          // If the email is not in the array, update the document by pushing the new email
          await db.collection("newsletter").updateOne(
            {},
            {
              $push: {
                email: email,
              },
            }
          );

          // Create a transporter for sending emails
          const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          });

          // Send the email
          transporter.sendMail(
            {
              from: "admission@skillslash.com",
              to: email,
              subject: "Thank you for Subscribing to Skillslash Newsletter!",
              text: "",
              html: `<p><strong>Dear</strong>, </p>
                     <p>We hope this message finds you well. On behalf of the Skillslash team, we extend our heartfelt gratitude for subscribing to our newsletter. By subscribing, you have joined a community of like-minded individuals who share a passion for data science. We look forward to sharing our knowledge and expertise with you by dedicatedly curating high-quality content (articles, webinars, tutorials) and much more. </p>

                     <p>Should you ever have any questions, feedback, or suggestions, please do not hesitate to reach out to us at info@skillslash.com / 083919 11911 .
                     Your input is invaluable in helping us improve and tailor our content to better serve your needs.</p>

                     <p>Once again, thank you for choosing Skillslash as your source for data science insights. We're excited to have you on board, and we look forward to a fruitful and enriching journey together.</p>

                     <p> If you do not want to receive emails like these anymore, you can <a href="${`https://skillslash.com/unsubscribe?email=${emailHash}`}">unsubscribe</a>.</p>

                     <p>Best regards</p>`,
            },
            function (err, info) {
              if (err) {
                console.log(err);
                res.status(500).json({ error: err.message });
              } else {
                console.log(`Email sent successfully. ${info.messageId}`);
                res
                  .status(200)
                  .json({ msg: "email added and sent", status: 200 });
              }
            }
          );
        } else {
          console.log("email exist");
          res.status(200).json({ msg: "email exists", status: 401 });
        }
      } else {
        // If no email exists, create a new one with the email array containing the new email
        await db.collection("newsletter").insertOne({
          email: [email],
        });
        res.status(200).json({ msg: "email added", status: 200 });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (req.method === "DELETE") {
    const { email } = req.query; // Assuming you pass the email hash in the request body
    // console.log(email, 93);

    const allEmail = await db.collection("newsletter").find({}).toArray();
    // console.log(allEmail, "allemail");

    allEmail.map(async (emailAll) => {
      const saltRounds = 10;
      const emailCompare = bcrypt.hash(emailAll, saltRounds);
      // await bcrypt.compare(email, emailAll
      if (emailCompare === email) {
        try {
          const result = await db.collection("newsletter").updateOne(
            {},
            {
              $pull: {
                email: email,
              },
            }
          );

          if (result.deletedCount === 1) {
            res.status(200).json({ message: "User deleted successfully" });
          } else {
            res.status(404).json({ message: "User not found" });
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  }
}
