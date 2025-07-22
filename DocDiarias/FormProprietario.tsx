import { useState } from 'react';

export default function FormularioProprietario() {
  const [formData, setFormData] = useState({
    nome: '',
    assinatura: '',
    wallet: '',
    cep: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    pais: '',
    email: '',
    docIdentidade: '',
    comprovanteEndereco: '',
    linkExterno: '',
    cadastrarPropriedade: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };


  const handleSubmit = async (cd) => {
    try {
      const res = await api.post('/perfis', {
        nome: form.nome,
        tipoPessoa: form.tipoPessoa
      });
      setFormData({ ...formData, idPerfil: res.data._id }); // salvar o ID para uso no passo seguinte
    } catch (err) {
      toast.error("Erro ao salvar perfil");
    }
  };

  //const handleSubmit = async (e) => {
    //e.preventDefault();
    //try {
      //const response = await fetch('http://localhost:4000/api/proprietarios', {
        //method: 'POST',
        //headers: { 'Content-Type': 'application/json' },
        //body: JSON.stringify(formData)
      //});
      //const data = await response.json();
      //alert(data.message || 'Cadastro realizado!');
    //} catch (error) {
      //console.error(error);
      //alert('Erro ao enviar os dados.');
    //}
  //};

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 bg-white rounded-xl max-w-md mx-auto">
      <h2 className="text-xl font-bold">Perfil do proprietário do imóvel</h2>
      <input name="nome" onChange={handleChange} value={formData.nome} placeholder="Nome do Proprietário" className="input" />
      <input name="assinatura" onChange={handleChange} value={formData.assinatura} placeholder="Assinatura" className="input" />

      <div className="flex items-center space-x-2">
        <label className="flex items-center">
          <input type="radio" name="wallet" value="metamask" onChange={handleChange} /> Metamask
        </label>
        <label className="flex items-center">
          <input type="radio" name="wallet" value="sequence" onChange={handleChange} /> Sequence
        </label>
      </div>

      <h2 className="text-xl font-bold">Endereço físico e documentos</h2>
      <input name="cep" onChange={handleChange} value={formData.cep} placeholder="CEP" className="input" />
      <input name="rua" onChange={handleChange} value={formData.rua} placeholder="Endereço" className="input" />
      <input name="numero" onChange={handleChange} value={formData.numero} placeholder="Número" className="input" />
      <input name="bairro" onChange={handleChange} value={formData.bairro} placeholder="Bairro" className="input" />
      <input name="cidade" onChange={handleChange} value={formData.cidade} placeholder="Cidade" className="input" />
      <input name="estado" onChange={handleChange} value={formData.estado} placeholder="Estado" className="input" />
      <input name="pais" onChange={handleChange} value={formData.pais} placeholder="País" className="input" />

      <h2 className="text-xl font-bold">Contato e documentação</h2>
      <input name="email" type="email" onChange={handleChange} value={formData.email} placeholder="Email pessoal" className="input" />
      <input name="docIdentidade" onChange={handleChange} value={formData.docIdentidade} placeholder="Documento de Identidade" className="input" />
      <input name="comprovanteEndereco" onChange={handleChange} value={formData.comprovanteEndereco} placeholder="Comprovante de Endereço" className="input" />
      <input name="linkExterno" onChange={handleChange} value={formData.linkExterno} placeholder="Link externo (opcional)" className="input" />

      <label className="flex items-center">
        <input type="checkbox" name="cadastrarPropriedade" checked={formData.cadastrarPropriedade} onChange={handleChange} className="mr-2" />
        Cadastrar propriedade?
      </label>

      <button type="submit" className="w-full bg-purple-500 text-white py-2 rounded-lg">Confirmar</button>
    </form>
  );
}

// Tailwind classes para input podem ser definidas como utilitárias:
// className="border p-2 w-full rounded-lg" ou use um arquivo de estilo para reutilização
