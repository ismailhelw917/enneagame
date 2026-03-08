import express from "express";
import { createServer as createViteServer } from "vite";
import Stripe from "stripe";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getStripe = () => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY environment variable is required");
  }
  return new Stripe(key);
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/create-checkout-session", async (req, res) => {
    try {
      const stripe = getStripe();
      const baseUrl = process.env.APP_URL || 'http://localhost:3000';
      
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Enneagaming Tactical Intel - Full Access",
                description: "Complete behavioral analytics and tactical win conditions for all Enneagram types.",
              },
              unit_amount: 99, // $0.99 (matching UI)
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${baseUrl}/intel?payment=success`,
        cancel_url: `${baseUrl}/intel`,
      });

      res.json({ url: session.url });
    } catch (error) {
      const stripeError = error as Error;
      console.error("Stripe error:", stripeError);
      res.status(500).json({ error: stripeError.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
