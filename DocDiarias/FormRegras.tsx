import { useState } from "react";

export default function FormRegras() {
  const [form, setForm] = useState({
    checkin: [],
    checkout: [],
    maxHospedes: "",
    minHospedes: "",
    regras: [],
    outrasRegras: ""
  });

  const toggleOption = (section: string, value: string) => {
    setForm((prev) => {
      const sectionValues = prev[section as keyof typeof form] as string[];
      const newValues = sectionValues.includes(value)
        ? sectionValues.filter((v) => v !== value)
        : [...sectionValues, value];
      return { ...prev, [section]: newValues };
    });
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form enviado:", form);
    alert("Regras salvas!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-purple-700">Regras do Imóvel</h2>

      {/* Check-in / Check-out */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold mb-2">Horários de Check-in</label>
          <div className="flex flex-wrap gap-4">
            {["12:00", "13:00", "14:00", "15:00"].map((h) => (
              <label key={h} className="flex items-center gap-1">
                <input type="checkbox" checked={form.checkin.includes(h)} onChange={() => toggleOption("checkin", h)} />
                {h}
              </label>
            ))}
            <label className="flex items-center gap-1">
              Outro:
              <input name="checkinOutro" className="border p-1 rounded w-20" />
            </label>
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-2">Horários de Check-out</label>
          <div className="flex flex-wrap gap-4">
            {["09:00", "10:00", "11:00", "12:00"].map((h) => (
              <label key={h} className="flex items-center gap-1">
                <input type="checkbox" checked={form.checkout.includes(h)} onChange={() => toggleOption("checkout", h)} />
                {`até ${h}`}
              </label>
            ))}
            <label className="flex items-center gap-1">
              Outro:
              <input name="checkoutOutro" className="border p-1 rounded w-20" />
            </label>
          </div>
        </div>
      </div>

      {/* Número de hóspedes */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold">Mínimo de hóspedes</label>
          <input name="minHospedes" value={form.minHospedes} onChange={handleInput} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block font-semibold">Máximo de hóspedes</label>
          <input name="maxHospedes" value={form.maxHospedes} onChange={handleInput} className="w-full border p-2 rounded" />
        </div>
      </div>

      {/* Regras adicionais */}
      <div>
        <label className="block font-semibold mb-2">Regras Adicionais</label>
        <div className="grid grid-cols-2 gap-2">
          {["Permite festas", "Proibido fumar", "Aceita animais", "Acomoda casais", "Não permite festas"].map((regra) => (
            <label key={regra} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={form.regras.includes(regra)}
                onChange={() => toggleOption("regras", regra)}
              />
              {regra}
            </label>
          ))}
        </div>
        <textarea
          name="outrasRegras"
          placeholder="Outras regras..."
          value={form.outrasRegras}
          onChange={handleInput}
          className="w-full mt-4 p-2 border rounded"
          rows={3}
        />
      </div>

      <div className="flex justify-between">
        <button type="button" className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
          Voltar
        </button>
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
          Confirmar e salvar
        </button>
      </div>
    </form>
  );
}
