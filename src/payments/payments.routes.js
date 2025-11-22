const express = require("express");
const router = express.Router();
const paymentsController = require("./payments.controller");

// Criar assinaturas (fluxo único: cria usuário + assinatura + inicia pagamento)
router.post("/subscribe", paymentsController.subscribe);

// Pagamento por cartão (tokenizado / gateway)
router.post("/credit-card", paymentsController.payWithCard);

// Pix (gera payload/qr)
router.post("/pix", paymentsController.payWithPix);

// Boleto
router.post("/boleto", paymentsController.payWithBoleto);

// PayPal (cria order e retorna approval url)
router.post("/paypal/create-order", paymentsController.paypalCreateOrder);
router.post("/paypal/capture-order", paymentsController.paypalCaptureOrder);

// Webhooks para gateways
router.post("/webhook/stripe", express.raw({ type: "application/json" }), paymentsController.webhookStripe);
router.post("/webhook/mercadopago", paymentsController.webhookMercadoPago);
router.post("/webhook/paypal", paymentsController.webhookPayPal);

module.exports = router;