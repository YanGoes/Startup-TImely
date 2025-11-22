const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

module.exports = {
  createPixPayment: async ({ amount, external_reference, description }) => {
    // Cria preferência simples com pagamento via pix (pode variar conforme MP)
    const preference = {
      items: [{ title: description || "Assinatura", quantity: 1, currency_id: "BRL", unit_price: Number(amount) }],
      external_reference,
      payment_methods: { excluded_payment_methods: [], excluded_payment_types: [] },
    };
    const resp = await mercadopago.preferences.create(preference);
    // Nota: dependendo das APIs MP, para pix você usa /v1/payments com payment_method_id 'pix' ou integrações novas
    return { preferenceId: resp.body.id, initPoint: resp.body.init_point, sandboxInitPoint: resp.body.sandbox_init_point };
  },

  createBoleto: async ({ amount, payer, description }) => {
    // Exemplo via payments (v1/payments) - ajustar de acordo com docs do MP
    const payment_data = {
      transaction_amount: Number(amount),
      description: description || "Boleto Assinatura",
      payment_method_id: "bolbradesco", // exemplo, escolha correto
      payer,
    };
    const resp = await mercadopago.payment.create(payment_data);
    return resp;
  },
};