from gtts import gTTS

texto = """
PARECER JURÍDICO: Análise de Acessibilidade do Contrato Pós-Pago da Claro S.A.

1. Forma Acessível do Contrato:
O contrato não apresenta versão em áudio, leitura automática ou braille. Isso viola o artigo 68 da Lei Brasileira de Inclusão e o artigo 26 da Resolução 632 da Anatel. Conclusão: a Claro está descumprindo o direito de acesso à informação.

2. Linguagem Clara e Compreensível:
O vocabulário é excessivamente técnico, sem glossário. Isso prejudica o uso por leitores de tela. Violação do artigo 6º do Código de Defesa do Consumidor.

3. Cláusulas Potencialmente Abusivas:
Cláusula 6.7: obriga o consumidor a pagar mesmo sem receber a fatura.
Cláusula 7.1: permite suspensão total do serviço após 30 dias sem prever formas acessíveis de notificação.
Isso pode ser considerado cláusula abusiva, conforme artigo 51 do CDC.

4. Navegabilidade para Leitores de Tela:
O contrato não segue as diretrizes WCAG para acessibilidade digital. Isso fere o artigo 63 da Lei Brasileira de Inclusão.

RECOMENDAÇÕES:
- Disponibilizar versão em áudio do contrato.
- Converter o contrato para PDF acessível.
- Fornecer contrato em braille sob demanda.
- Incluir glossário jurídico simplificado.
- Oferecer notificações em formatos múltiplos como áudio, SMS ou telefone.

CONCLUSÃO FINAL:
O contrato da Claro não é acessível para pessoas com deficiência visual e fere direitos garantidos por lei. Medidas corretivas são urgentes para garantir inclusão e respeito ao consumidor.

Fim do parecer.
"""

tts = gTTS(text=texto, lang='pt-br')
tts.save("parecer_acessibilidade_claro.mp3")
print("✅ Áudio salvo como 'parecer_acessibilidade_claro.mp3'")
