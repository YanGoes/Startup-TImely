const fetch = require("node-fetch");
const base = "https://api-m.sandbox.paypal.com"; // use production em produção

const clientId = process.env.PAYPAL_CLIENT_ID;
const secret = process.env.PAYPAL_SECRET;

async function getAccessToken() {
  const auth = Buffer.from(`${clientId}:${secret}`).toString("base64");
  const resp = await fetch(`${base}/v1/oauth2/token`, {
    method: "POST",
    headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: "grant_type=client_credentials",
  });
  const data = await resp.json();
  return data.access_token;
}

module.exports = {
  createOrder: async ({ amount, description }) => {
    const token = await getAccessToken();
    const resp = await fetch(`${base}/v2/checkout/orders`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [{ amount: { currency_code: "BRL", value: amount.toFixed(2) }, description }],
      }),
    });
    const data = await resp.json();
    const approvalUrl = data.links.find((l) => l.rel === "approve")?.href;
    return { id: data.id, approvalUrl, data };
  },

  captureOrder: async (orderId) => {
    const token = await getAccessToken();
    const resp = await fetch(`${base}/v2/checkout/orders/${orderId}/capture`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    return resp.json();
  },
};