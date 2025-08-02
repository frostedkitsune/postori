import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import * as nodemailer from "nodemailer";
import { emailSchema } from "../utils/validator";

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "localhost",
  port: parseInt(process.env.SMTP_PORT || "587", 10),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
  },
});

const email = new Hono().post(
  "/send",
  zValidator("json", emailSchema),
  async (c) => {
    try {
      const { to, subject, text, html, from } = c.req.valid("json");
      const mailResponse = await transporter.sendMail({
        from,
        to: to.join(", "),
        subject,
        text,
        html,
      });
      console.log(mailResponse);
      return c.json({}, 200);
    } catch (error) {
      console.error("Email send endpoint error:", error);
      return c.json({}, 500);
    }
  },
);

export default email;
