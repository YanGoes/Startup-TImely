import { motion } from "framer-motion";

// Componente Button interno simples
const Button = ({ children, ...props }) => (
  <button
    {...props}
    className={`bg-blue-600 text-white px-4 py-2 rounded-xl text-lg ${props.className || ""}`}
  >
    {children}
  </button>
);

export default function PlanosAssinatura({ onSelecionarPlano }) {
  const planos = [
    { id: 1, nome: "Plano Acesso Fácil", apelido: "Plano Solo", preco: "49.90", descricao: "Digitalização essencial …", beneficios: ["Benefício 1", "Benefício 2"] },
    { id: 2, nome: "Plano Expansão Pro", apelido: "Plano Equipe", preco: "119.90", descricao: "Perfeito para equipes …", beneficios: ["Benefício A", "Benefício B"] },
    { id: 3, nome: "Plano Domínio Total", apelido: "Plano VIP", preco: "249.90", descricao: "Para empresas …", beneficios: ["Benefício X", "Benefício Y"] },
  ];

  const handlePlanoClick = (plano) => {
    onSelecionarPlano(plano);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl"
      >
        <h1 className="text-4xl font-bold text-center mb-10">Escolha seu Plano</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {planos.map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-2xl shadow-xl flex flex-col"
            >
              <h2 className="text-2xl font-bold mb-2">{p.nome}</h2>
              <p className="text-gray-600 mb-4">{p.descricao}</p>
              <p className="text-3xl font-extrabold mb-4">{`R$ ${p.preco}`}<span className="text-base text-gray-500"> / mês</span></p>
              <ul className="flex-1 space-y-2 mb-6">
                {p.beneficios.map((b, index) => (
                  <li key={index} className="flex items-start gap-2">• <span>{b}</span></li>
                ))}
              </ul>
              <Button className="w-full py-3" onClick={() => handlePlanoClick(p)}>
                Assinar {p.apelido}
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}