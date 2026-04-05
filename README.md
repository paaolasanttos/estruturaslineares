# estruturaslineares
ADAPTANDO UMA IA DE PREVISÃO - Aula prática de ML

A partir dos arquivo "ml" foi desenvolvido o site "PS | Aula Prática de ML" que tem o intuito de realizar o calculo de calorias gastas por exercício no padrão MET (Metabolic Equivalent of Task).

# 📄 **Resumo das Alterações do Projeto**

O projeto original foi adaptado para um novo tema: **cálculo de calorias com base no tempo de exercício**, mantendo a estrutura principal em TensorFlow.js e seu funcionamento no navegador.

Foram realizadas as seguintes modificações:

- **Mudança de tema:** de “horas de estudo e nota” para “calorias por tempo de exercício”.
- **Atualização da interface:** novo título, textos explicativos e organização visual em formato de aplicativo mobile.
- **Campo de entrada aprimorado:** o tempo passou a ser informado em formato de hora completo (HH:MM:SS), adicionando máscara automática (00:00:00) e validação.
- **Conversão interna:** o tempo digitado é convertido automaticamente para minutos para que este seja o valor utilizado no cálculo.
- **Novos dados de entrada:** inclusão de variáveis como peso, tipo de atividade e sexo para calculo correto do MET.
- **Ajuste do modelo de IA:** treinamento com novos dados relacionados ao gasto calórico.
- **Cálculo híbrido:** combinação de fórmula baseada em atividade física com ajuste do modelo de IA.
- **Validações:** implementação de verificações para evitar erros e impedir resultados inválidos (como NaN - valor indefinido).
