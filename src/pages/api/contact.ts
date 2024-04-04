import type { APIRoute } from "astro";
import { z } from "zod";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
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

  const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "onboarding@resend.dev",
      to: "mateo@emestudio.xyz",
      subject: "Message from personal site",
      html: `${email}: ${message}`,
    }),
  });

  if (!response.ok) {
    console.error(await response.text());

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
