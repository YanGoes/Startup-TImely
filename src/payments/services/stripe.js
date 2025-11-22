const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = {
  // Cria PaymentIntent para pagamento via cartão/assinatura (one-time)
  createPaymentIntent: async ({ amount, currency = "BRL", metadata = {} }) => {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ["card"],
      metadata,
    });
    return { paymentIntent, clientSecret: paymentIntent.client_secret };
  },

  // Confirma PaymentIntent com paymentMethodId (usado se você enviar PM do frontend)
  confirmPaymentIntentWithPM: async ({ paymentIntentId, paymentMethodId }) => {
    const confirm = await stripe.paymentIntents.confirm(paymentIntentId, { payment_method: paymentMethodId });
    return confirm;
  },

  // Construção do evento para webhook (raw request necessário)
  constructEvent: (req) => {
    const sig = req.headers["stripe-signature"];
    return stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  },
};