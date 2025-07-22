import { useState } from 'react';

export default function FormularioPropriedade() {
  const [formData, setFormData] = useState({
    nomeProprietario: '',
    idPerfil: '',
    wallet: '',
    finalidade: '',
    cep: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    pais: '',
    email: '',
    emailPropriedade: '',
    docCompraVenda: '',
    certidaoRegistro: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };


  const handleSubmit = async () => {
    try {
      await api.post('/imoveis', {
        nome: form.nome,
        endereco: form.endereco,
        valorDiaria: form.valorDiaria,
        idPerfil: formData.idPerfil // reutilizando ID salvo no passo anterior
      });
      toast.success("Imóvel cadastrado!");
    } catch (err) {
      toast.error("Erro ao salvar imóvel");
    }
  };

  //const handleSubmit = async (e) => {
    //e.preventDefault();
    //try {
      //const response = await fetch('http://localhost:4000/api/propriedades', {
        //method: 'POST',
        //headers: { 'Content-Type': 'application/json' },
        //body: JSON.stringify(formData)
      //});
      //const data = await response.json();
      //alert(data.message || 'Propriedade cadastrada com sucesso!');
    //} catch (error) {
      //console.error(error);
      //alert('Erro ao enviar os dados.');
    //}
  //};

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 bg-white rounded-xl max-w-md mx-auto">
      <h2 className="text-xl font-bold">Dados da Propriedade</h2>
      <input name="nomeProprietario" onChange={handleChange} value={formData.nomeProprietario} placeholder="Nome do Proprietário ou Agente Delegado" className="border p-2 w-full rounded-lg" />
      <input name="idPerfil" onChange={handleChange} value={formData.idPerfil} placeholder="ID do Perfil" className="border p-2 w-full rounded-lg" />

      <div className="flex items-center space-x-2">
        <label className="flex items-center">
          <input type="radio" name="wallet" value="metamask" onChange={handleChange} /> Metamask
        </label>
        <label className="flex items-center">
          <input type="radio" name="wallet" value="sequence" onChange={handleChange} /> Sequence
        </label>
      </div>

      <h2 className="text-xl font-bold">Identificador da Propriedade</h2>
      <div className="flex items-center space-x-4">
        <label className="flex items-center">
          <input type="radio" name="finalidade" value="Alugar" onChange={handleChange} /> Alugar
        </label>
        <label className="flex items-center">
          <input type="radio" name="finalidade" value="Vender" onChange={handleChange} /> Vender
        </label>
        <label className="flex items-center">
          <input type="radio" name="finalidade" value="Permutar" onChange={handleChange} /> Permutar
        </label>
      </div>

      <h2 className="text-xl font-bold">Endereço Físico e Documentos da Propriedade anunciada</h2>
      <input name="cep" onChange={handleChange} value={formData.cep} placeholder="CEP" className="border p-2 w-full rounded-lg" />
      <input name="rua" onChange={handleChange} value={formData.rua} placeholder="Endereço" className="border p-2 w-full rounded-lg" />
      <input name="numero" onChange={handleChange} value={formData.numero} placeholder="Número" className="border p-2 w-full rounded-lg" />
      <input name="bairro" onChange={handleChange} value={formData.bairro} placeholder="Bairro" className="border p-2 w-full rounded-lg" />
      <input name="cidade" onChange={handleChange} value={formData.cidade} placeholder="Cidade" className="border p-2 w-full rounded-lg" />
      <input name="estado" onChange={handleChange} value={formData.estado} placeholder="Estado" className="border p-2 w-full rounded-lg" />
      <input name="pais" onChange={handleChange} value={formData.pais} placeholder="País" className="border p-2 w-full rounded-lg" />

      <input name="email" type="email" onChange={handleChange} value={formData.email} placeholder="Email do Proprietário" className="border p-2 w-full rounded-lg" />
      <input name="emailPropriedade" type="email" onChange={handleChange} value={formData.emailPropriedade} placeholder="Email corporativo da Propriedade" className="border p-2 w-full rounded-lg" />
      <input name="docCompraVenda" onChange={handleChange} value={formData.docCompraVenda} placeholder="Documento de compra/venda - escritura" className="border p-2 w-full rounded-lg" />
      <input name="certidaoRegistro" onChange={handleChange} value={formData.certidaoRegistro} placeholder="Certidão do Registro de Imóveis" className="border p-2 w-full rounded-lg" />

      <button type="submit" className="w-full bg-purple-500 text-white py-2 rounded-lg">Confirmar</button>
      <p className="text-center text-sm mt-2">Mintar NFTdiárias da sua Propriedade</p>
    </form>
  );
}
