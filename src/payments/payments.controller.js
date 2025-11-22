const stripeService = require("./services/stripe");
const mpService = require("./services/mercadopago");
const paypalService = require("./services/paypal");

// Mock DB funcs (substitua pela sua camada real)
const Users = require("../models/users"); // opcional
const Subscriptions = require("../models/subscriptions"); // opcional

module.exports = {
  // Fluxo: cria usuário (se necessário), cria assinatura no DB e inicia pagamento
  subscribe: async (req, res) => {
    try {
      const { planoId, planoNome, preco, vencimento, user, metodo, pagamento } = req.body;
      // Validações essenciais
      if (!user?.email || !user?.nome) return res.status(400).json({ message: "Dados do usuário incompletos" });

      // 1) Criar usuário no seu sistema (ou buscar existente)
      // const userCreated = await Users.createOrGet(user);

      // 2) Criar assinatura no DB (status: pending)
      // const subscription = await Subscriptions.create({ userId: userCreated.id, planoId, status: "pending", preco });

      // 3) Iniciar pagamento conforme método
      if (metodo === "card") {
        // pagamento contém token (ex: stripePaymentMethodId) ou dados do cartão (melhor usar token)
        const { paymentIntent, clientSecret } = await stripeService.createPaymentIntent({
          amount: Math.round(preco * 100),
          currency: "BRL",
          metadata: { planoId, planoNome, userEmail: user.email },
        });
        return res.json({ gateway: "stripe", clientSecret, paymentIntentId: paymentIntent.id /* , subscriptionId: subscription.id */ });
      }

      if (metodo === "pix") {
        const mpResp = await mpService.createPixPayment({
          amount: preco,
          external_reference: `${user.email}_${Date.now()}`,
          description: `Assinatura ${planoNome}`,
        });
        return res.json({ gateway: "mercadopago", ...mpResp });
      }

      if (metodo === "boleto") {
        const boletoResp = await mpService.createBoleto({
          amount: preco,
          payer: { email: user.email, identification: { type: user.cpf.length > 11 ? "CNPJ" : "CPF", number: user.cpf } },
          description: `Assinatura ${planoNome}`,
        });
        return res.json({ gateway: "mercadopago", ...boletoResp });
      }

      if (metodo === "paypal") {
        const order = await paypalService.createOrder({ amount: preco, description: `Assinatura ${planoNome}` });
        return res.json({ gateway: "paypal", approvalUrl: order.approvalUrl, orderId: order.id });
      }

      if (metodo === "pagseguro_fake") {
        // Simula aceitação imediata (ambiente de desenvolvimento/university project)
        return res.json({ gateway: "fake", status: "approved", message: "Pagamento simulado OK" });
      }

      return res.status(400).json({ message: "Método de pagamento inválido" });

    } catch (err) {
      console.error("subscribe error:", err);
      return res.status(500).json({ message: "Erro interno", error: err.message });
    }
  },

  payWithCard: async (req, res) => {
    // Se preferir rota separada para processar token de cartão
    try {
      const { amount, currency, paymentMethodId } = req.body;
      const pi = await stripeService.confirmPaymentIntentWithPM({ amount, currency, paymentMethodId });
      return res.json(pi);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  },

  payWithPix: async (req, res) => {
    try {
      const { amount, external_reference } = req.body;
      const mpResp = await mpService.createPixPayment({ amount, external_reference });
      return res.json(mpResp);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  },

  payWithBoleto: async (req, res) => {
    try {
      const { amount, payer } = req.body;
      const resp = await mpService.createBoleto({ amount, payer });
      return res.json(resp);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  },

  // PayPal routes
  paypalCreateOrder: async (req, res) => {
    try {
      const { amount, description } = req.body;
      const order = await paypalService.createOrder({ amount, description });
      res.json(order);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  },

  paypalCaptureOrder: async (req, res) => {
    try {
      const { orderId } = req.body;
      const capture = await paypalService.captureOrder(orderId);
      res.json(capture);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  },

  // Webhooks (ex.: Stripe)
  webhookStripe: async (req, res) => {
    try {
      const event = stripeService.constructEvent(req);
      // Trate event.type (payment_intent.succeeded, charge.refunded, invoice.paid, etc)
      console.log("Stripe webhook event:", event.type);
      // Atualize assinatura no DB conforme metadata/event
      res.json({ received: true });
    } catch (err) {
      console.error("stripe webhook error:", err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  },

  webhookMercadoPago: async (req, res) => {
    // Valide notificação e atualize status
    console.log("MercadoPago webhook:", req.body);
    res.json({ received: true });
  },

  webhookPayPal: async (req, res) => {
    console.log("PayPal webhook:", req.body);
    res.json({ received: true });
  },
};