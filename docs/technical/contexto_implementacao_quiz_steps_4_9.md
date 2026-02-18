# Documentação de Implementação: Quiz Steps 4-9

## 📋 Visão Geral
Nesta sessão, avançamos significativamente na implementação do Quiz de Onboarding do Antibeta, cobrindo os passos de renda, autoestima, hábitos e consumo de substâncias. O foco foi na criação de componentes reutilizáveis e na lógica de estado complexa.

## 🚀 Funcionalidades Implementadas

### 1. Renda Mensal (Passo 4)
- **Componente:** `QuizOptionSelection` (reutilizado).
- **Ajuste:** O componente foi modificado para aceitar opções sem ícones, adaptando-se ao design deste passo.
- **Opções:** Faixas de renda de "Sem renda" até "Acima de R$ 10.000".

### 2. Autoestima (Passo 5)
- **Novo Componente:** `QuizScalePicker`.
- **Funcionalidade:** Seletor numérico de 1 a 10 com visualização gráfica (gráfico de barras) que responde à seleção do usuário.
- **Design:** Círculos selecionáveis e barras com altura progressiva.

### 3. Consumo de Pornografia (Passo 6)
- **Componente:** `QuizOptionSelection`.
- **Opções:** Frequência de consumo (Nunca a Múltiplas vezes ao dia).

### 4. Frequência de Masturbação (Passo 7)
- **Componente:** `QuizOptionSelection`.
- **Opções:** Similar ao passo de pornografia, medindo frequência.

### 5. Tempo em Redes Sociais (Passo 8)
- **Componente:** `QuizOptionSelection`.
- **Opções:** Intervalos de tempo (Menos de 1h a Mais de 6h).

### 6. Uso de Substâncias (Passo 9)
- **Novo Componente:** `QuizMultiSelectWithSub`.
- **Funcionalidade Complexa:**
    - **Seleção Múltipla:** Permite escolher múltiplas substâncias (Álcool, Cigarro, Maconha).
    - **Sub-seleção:** Ao selecionar uma substância, abre-se uma linha de botões para frequência (Raramente, Semanalmente, Diariamente).
    - **Exclusividade:** A opção "Não uso nenhuma" desmarca todas as outras automaticamente.
    - **Validação:** Garante que uma frequência seja escolhida se uma substância principal for selecionada.

## 🛠️ Detalhes Técnicos

### Arquivos Modificados
- `mobile/src/screens/onboarding/OnboardingScreen.tsx`:
    - Adição de estados para cada nova resposta (`currentIncome`, `selfEsteem`, `pornographyFrequency`, `masturbationFrequency`, `socialMediaTime`, `substanceUse`).
    - Lógica de rendering para `case 4` a `case 9`.
    - Lógica de validação em `isStepValid`.

### Novos Componentes
- `mobile/src/components/quiz/inputs/QuizScalePicker.tsx`
- `mobile/src/components/quiz/inputs/QuizMultiSelectWithSub.tsx`

### Componentes Ajustados
- `mobile/src/components/quiz/inputs/QuizOptionSelection.tsx`: Propriedade `icon` agora é opcional.

## ✅ Próximos Passos
- Implementar integração com backend para salvar estas respostas.
- Continuar com as seções de sono e saúde física (Passos 10+).
