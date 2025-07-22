
# 📄 Módulo: Análise Automática de Contratos (Web2, PDF, DOCX e Smart Contracts)

## Objetivo

Implementar uma interface e backend capazes de:
- Fazer upload de contratos no formato `.pdf` e `.docx`;
- Realizar **leitura e parsing automático** dos contratos;
- Detectar **cláusulas abusivas ou desproporcionais**, com base no:
  - Código Civil Brasileiro
  - Código de Defesa do Consumidor (CDC)
  - Jurisprudência dos Tribunais Superiores
- Suportar leitura de contratos em linguagem Solidity (`.sol`) com explicações em linguagem jurídica em português;
- Retornar os resultados em **formato `.json` estruturado** e **relatório `.md` interpretativo**.

---

## 📂 Tipos de documentos aceitos

| Tipo         | Formato | Finalidade                                      |
|--------------|---------|-------------------------------------------------|
| Contratos    | PDF     | Contrato Web2 tradicional ou de adesão          |
| Contratos    | DOCX    | Termos e condições, políticas, adesões          |
| Smart Contract | SOL   | Código Solidity interpretado juridicamente      |

---

## ⚙️ Funcionalidades planejadas

### Upload:
- Tela para upload múltiplo com preview
- Validação por tipo e tamanho

### Análise:
- Extração de texto com OCR (se necessário)
- Parsing por IA (GPT-4o + legal fine-tuning)
- Reconhecimento de cláusulas críticas:
  - Multa desproporcional
  - Renúncia de direitos
  - Ausência de foro
  - Restrições abusivas

### Retorno:
- JSON estruturado com:
  - Título
  - Cláusulas detectadas
  - Trecho exato
  - Categoria legal
  - Nível de risco
- Markdown com relatório técnico interpretado

---

## 📥 Exemplo JSON de Saída

```json
{
  "arquivo": "contrato_locacao.pdf",
  "clausulas_abusivas": [
    {
      "titulo": "Multa por cancelamento",
      "trecho": "O cancelamento implicará em perda de 100% do valor pago...",
      "risco": "Alto",
      "fundamento": "Art. 51, CDC"
    }
  ],
  "clausulas_neutras": [...],
  "smart_contract_detectado": false
}
```

---

## ✅ Extensões Futuras
- Suporte a contratos assinados digitalmente (verificação de integridade)
- Geração de sugestões automáticas de redação
- Exportação para PDF jurídico com marcações
