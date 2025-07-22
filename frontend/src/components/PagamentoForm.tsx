import { useState } from 'react';
import axios from 'axios';

export default function PagamentoForm() {
  const [dataEntrada, setDataEntrada] = useState('');
  const [dataSaida, setDataSaida] = useState('');
  const [metodoPagamento, setMetodoPagamento] = useState('');
  const [valorTotal, setValorTotal] = useState(1980); // valor fixo para exemplo

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resposta = await axios.post('http://localhost:4000/api/pagamento', {
        propriedadeId: 'abc123', // mock temporário
        dataEntrada,
        dataSaida,
        metodoPagamento,
        valorTotal
      });
      alert('✅ Pagamento processado!');
    } catch (err) {
      alert('❌ Erro ao enviar pagamento');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold text-center">Pagamento</h2>

      <label className="block">
        Data de Entrada
        <input type="date" className="w-full border p-2 rounded" value={dataEntrada} onChange={e => setDataEntrada(e.target.value)} />
      </label>

      <label className="block">
        Data de Saída
        <input type="date" className="w-full border p-2 rounded" value={dataSaida} onChange={e => setDataSaida(e.target.value)} />
      </label>

      <div>
        <label className="block mb-2">Método de pagamento</label>
        <div className="flex gap-4">
          {['Crypto', 'PIX', 'Cartão'].map((metodo) => (
            <label key={metodo} className="flex items-center gap-2">
              <input
                type="radio"
                name="metodoPagamento"
                value={metodo}
                onChange={e => setMetodoPagamento(e.target.value)}
              />
              {metodo}
            </label>
          ))}
        </div>
      </div>

      <div className="border-t pt-4">
        <p className="flex justify-between"><span>Subtotal</span><span>R$ 1800,00</span></p>
        <p className="flex justify-between"><span>Imposto (15%)</span><span>R$ 180,00</span></p>
        <p className="flex justify-between font-bold text-lg border-t mt-2 pt-2">
          <span>Preço total</span><span>R$ {valorTotal.toFixed(2)}</span>
        </p>
      </div>

      <button type="submit" className="w-full bg-[#865DFF] text-white font-semibold py-2 rounded">
        Confirmar
      </button>
    </form>
  );
}
