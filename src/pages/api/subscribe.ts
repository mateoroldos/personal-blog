import type { APIRoute } from "astro";
import { MAILERLITE_API_KEY } from "astro:env/server";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");

  if (!email || typeof email !== "string") {
    return new Response(
      JSON.stringify({ success: false, message: "Invalid email" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const res = await fetch("https://api.mailerlite.com/api/v2/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-MailerLite-ApiKey": MAILERLITE_API_KEY,
      },
      body: JSON.stringify({
        email,
        resubscribe: true,
        groups: ["152601854688101859"],
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("MailerLite error:", err);
      return new Response(
        JSON.stringify({
          success: false,
          message: "Failed to subscribe, check your email address",
        }),
        {
          status: 502,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Subscribed successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Upsss, an unknown error occurred",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
