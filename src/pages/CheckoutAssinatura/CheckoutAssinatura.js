import { useState } from "react";
import { motion } from "framer-motion";

// Componentes internos simples
const Button = ({ children, ...props }) => (
  <button
    {...props}
    className={`bg-blue-600 text-white px-4 py-2 rounded-xl text-lg ${props.className || ""}`}
  >
    {children}
  </button>
);

const Card = ({ children, ...props }) => (
  <div {...props} className={`bg-white p-4 rounded-2xl shadow-md ${props.className || ""}`}>{children}</div>
);

const CardContent = ({ children, ...props }) => (
  <div {...props} className={`p-2 ${props.className || ""}`}>{children}</div>
);

export default function CheckoutAssinatura({ plano }) {
  if (!plano) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold p-6">
        Selecione um plano antes de continuar.
      </div>
    );
  }

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    confirmarEmail: "",
    senha: "",
    cpf: "",
    telefone: "",
    numeroCartao: "",
    nomeCartao: "",
    validade: "",
    cvv: "",
    parcelas: "1",
    aceitarTermos: false,
  });

  const [metodo, setMetodo] = useState("card");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    try {
      const payload = {
        planoId: plano.id,
        planoNome: plano.nome,
        preco: plano.preco,
        user: {
          nome: formData.nome,
          email: formData.email,
          cpf: formData.cpf,
          telefone: formData.telefone,
        },
        metodo,
        pagamento: metodo === "card" ? {
          card: {
            number: formData.numeroCartao,
            holder: formData.nomeCartao,
            exp: formData.validade,
            cvv: formData.cvv,
            parcelas: formData.parcelas,
          },
        } : { type: metodo },
      };

      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000"}/api/payments/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await resp.json();
      if (!resp.ok) throw new Error(data.message || "Erro ao iniciar pagamento");

      if (data.gateway === "stripe") setMsg("Stripe iniciado. Use clientSecret no frontend.");
      else if (data.gateway === "mercadopago" && data.initPoint) window.location.href = data.initPoint;
      else if (data.gateway === "paypal" && data.approvalUrl) window.location.href = data.approvalUrl;
      else setMsg(data.message || "Pagamento iniciado (fake/dev).");

    } catch (err) {
      console.error(err);
      setMsg(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-4xl">
        <Card className="shadow-xl p-4 rounded-2xl">
          <CardContent>
            <h1 className="text-3xl font-bold mb-6 text-center">Finalizar Assinatura</h1>

            <div className="bg-white p-4 rounded-2xl shadow mb-6">
              <h2 className="font-bold text-2xl">{plano.nome}</h2>
              <p className="text-gray-500 mb-1">{plano.apelido}</p>
              <p className="text-lg font-semibold">R$ {plano.preco} / mês</p>
              <p className="text-gray-600 mt-2">{plano.descricao}</p>
              {plano.beneficios && plano.beneficios.length > 0 && (
                <ul className="mt-3 space-y-1">
                  {plano.beneficios.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">• {b}</li>
                  ))}
                </ul>
              )}
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <h2 className="text-xl font-semibold mb-3">Informações Pessoais</h2>
              </div>

              <input className="w-full p-2 rounded-xl border" placeholder="Nome Completo" name="nome" onChange={handleChange} required />
              <input className="w-full p-2 rounded-xl border" placeholder="Telefone" name="telefone" onChange={handleChange} required />
              <input type="email" className="w-full p-2 rounded-xl border" placeholder="E-mail" name="email" onChange={handleChange} required />
              <input type="email" className="w-full p-2 rounded-xl border" placeholder="Confirmar E-mail" name="confirmarEmail" onChange={handleChange} required />
              <input type="password" className="w-full p-2 rounded-xl border" placeholder="Senha" name="senha" onChange={handleChange} required />
              <input className="w-full p-2 rounded-xl border" placeholder="CPF ou CNPJ" name="cpf" onChange={handleChange} required />

              <div className="col-span-2 mt-4">
                <h2 className="text-xl font-semibold mb-3">Método de Pagamento</h2>
                <div className="flex gap-3 flex-wrap">
                  {["card","pix","boleto","paypal","pagseguro_fake"].map((m) => (
                    <label key={m}>
                      <input type="radio" name="metodo" value={m} checked={metodo===m} onChange={() => setMetodo(m)} /> {m === "card" ? "Cartão" : m === "pix" ? "Pix" : m === "boleto" ? "Boleto" : m === "paypal" ? "PayPal" : "PagSeguro (fake)"}
                    </label>
                  ))}
                </div>
              </div>

              {metodo === "card" && (
                <>
                  <div className="col-span-2 mt-2">
                    <h3 className="font-medium mb-2">Dados do Cartão</h3>
                  </div>
                  <input className="w-full p-2 rounded-xl border" placeholder="Número do Cartão" name="numeroCartao" onChange={handleChange} required />
                  <input className="w-full p-2 rounded-xl border" placeholder="Nome no Cartão" name="nomeCartao" onChange={handleChange} required />
                  <input className="w-full p-2 rounded-xl border" placeholder="Validade (MM/AA)" name="validade" onChange={handleChange} required />
                  <input className="w-full p-2 rounded-xl border" placeholder="CVV" name="cvv" onChange={handleChange} required />
                  <select className="w-full p-2 rounded-xl border" name="parcelas" onChange={handleChange}>
                    <option value="1">1x</option>
                    <option value="2">2x</option>
                    <option value="3">3x</option>
                  </select>
                </>
              )}

              <div className="col-span-2 flex items-center gap-2 mt-2">
                <input type="checkbox" name="aceitarTermos" onChange={handleChange} required />
                <p className="text-sm">Li e concordo com os <a className="underline">Termos de Uso</a> e <a className="underline">Política de Privacidade</a>.</p>
              </div>

              {msg && <div className="col-span-2 text-sm text-blue-700">{msg}</div>}

              <div className="col-span-2 mt-6">
                <Button type="submit" disabled={loading}>
                  {loading ? "Processando..." : metodo === "card" ? "Pagar com Cartão" : metodo === "pix" ? "Gerar Pix" : metodo === "boleto" ? "Gerar Boleto" : metodo === "paypal" ? "Pagar com PayPal" : "Pagar (Fake)"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}