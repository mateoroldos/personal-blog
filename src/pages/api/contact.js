import { z } from "zod";
import { RESEND_API_KEY } from "astro:env/server";

export const prerender = false;

export const POST = async context => {
  const data = await context.request.formData();
  const email = data.get("email");
  const message = data.get("message");

  const schema = z.object({
    email: z.string().email(),
    message: z.string().min(5).max(500),
  });

  try {
    schema.parse({ email, message });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Invalid input",
        error,
      }),
      { status: 400 }
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "hello@emestudio.xyz",
      to: "mateo@emestudio.xyz",
      subject: "Message from personal site",
      html: `${email}: ${message}`,
    }),
  });

  if (!response.ok) {
    return new Response(
      JSON.stringify({
        message: "Failed to send email",
      }),
      { status: 500 }
    );
  }

  return new Response(
    JSON.stringify({
      message: "Success!",
    }),
    { status: 200 }
  );
};
