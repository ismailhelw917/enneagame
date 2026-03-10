import express from "express";
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

// Start the server
async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // Health check for Cloud Run
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // API Routes
  app.post("/api/create-checkout-session", async (req, res) => {
    try {
      const stripe = getStripe();
      const baseUrl = process.env.APP_URL || `http://localhost:${PORT}`;
      
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
              unit_amount: 99, // $0.99
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

  app.post("/api/create-donation-session", async (req, res) => {
    try {
      const { amount, label } = req.body;
      const stripe = getStripe();
      const baseUrl = process.env.APP_URL || `http://localhost:${PORT}`;
      
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: `Donation: ${label}`,
                description: "Thank you for supporting Enneagaming research and development.",
              },
              unit_amount: amount,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${baseUrl}/donations?payment=success`,
        cancel_url: `${baseUrl}/donations`,
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
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
