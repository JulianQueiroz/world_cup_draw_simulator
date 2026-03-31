
# Arquitetura

Estrutura técnica e decisões de design do projeto.

---

## Estrutura do projeto

```text
src/
  app/
    home/                         # Página principal da aplicação
    layout.tsx                    # Layout raiz
    globals.css                   # Estilos globais

  components/
    CompletedSelectionProgress/   # Progresso de seleção de times
    Groups/                       # Visualização dos grupos
    Knockouts/                    # Visualização das fases eliminatórias
    Menu/                         # Menu de navegação
    Slider/                       # Slider para ajustes
    SwitchTabs/                   # Abas de alternância
    TeamSelection/                # Interface de seleção de times
    TournamentBracket/            # Bracket do torneio
    ui/                           # Componentes primitivos reutilizáveis (shadcn/ui)

  context/
    themeProvider.tsx             # Provedor de tema (light/dark)

  lib/
    groups.ts                     # Lógica de distribuição em grupos
    knockout.ts                   # Lógica de fases eliminatórias
    validations.ts                # Validações de entrada
    utils.ts                      # Utilitários gerais
    storage.ts                    # Abstração de localStorage
    store/                        # Estado global (Zustand)
    repository/                   # Camada de acesso a dados

  data/
    team.json                     # Catálogo de seleções

  types/
    draw.ts                       # Tipos do sorteio
    knockout.ts                   # Tipos das eliminatórias

  themes/                         # Tokens de tema (cores, espaçamento, etc)
```

## Estrutura do Projeto

| Caminho                     | Descrição |
|----------------------------|----------|
| `app/home/`                | Página principal da aplicação |
| `app/layout.tsx`           | Layout raiz com suporte a tema |
| `app/globals.css`          | Estilos globais |
| `components/CompletedSelectionProgress/` | Progresso de seleção de times |
| `components/Groups/`       | Visualização dos grupos |
| `components/Knockouts/`    | Fases eliminatórias |
| `components/Menu/`         | Menu de configuração e ações |
| `components/Slider/`       | Ajustes numéricos (grupos, times) |
| `components/SwitchTabs/`   | Alternância entre telas |
| `components/TeamSelection/`| Interface de seleção de times |
| `components/TournamentBracket/` | Chaveamento do torneio |
| `components/ui/`           | Componentes base (shadcn/ui) |
| `context/`                 | Providers globais (ex: tema) |
| `lib/groups.ts`            | Lógica de distribuição em grupos |
| `lib/knockout.ts`          | Geração do mata-mata |
| `lib/validations.ts`       | Validação de regras |
| `lib/utils.ts`             | Funções utilitárias |
| `lib/storage.ts`           | Abstração de persistência |
| `lib/store/`               | Estado global (Zustand) |
| `lib/repository/`          | Camada de acesso a dados |
| `data/team.json`           | Dados das seleções |
| `types/`                   | Tipagens compartilhadas |
| `themes/`                  | Tokens e configurações de tema |

### 1. Estado centralizado com Zustand

 Escolhi o Zustand <u>principalmente </u> por ser simples e por já ter familiaridade.

Como a minha aplicação tem drag and drop (na fase de grupos), isso gera muitos re-renders. Sem um gerenciamento de estado, poderia resultar em bastante render desnecessário.

O Zustand ajuda a controlar melhor isso e manter a performance.

### 2. Lógica de domínio isolada em lib/
- groups.ts — algoritmo de distribuição em grupos
- knockout.ts — geração do chaveamento
- validations.ts — validações de regras

- Funções puras, independentes de UI, facilitando testes e manutenção.

### 3. Camada de repositório

- lib/repository/ abstrai o acesso a dados (ex: localStorage), permitindo evolução para APIs ou banco de dados sem impacto critico na aplicação.

### 4. Componentes organizados por domínio

Cada componente possui responsabilidade única:

- TeamSelection → seleção de times
- Groups → visualização dos grupos
- Knockouts → fases eliminatórias
- TournamentBracket → visualização do chaveamento

### 5. Shadcn
Usei <u>shadcn</u> porque me dá liberdade pra estilizar e adaptar comportamento sem depender de libs externas.

Também acho os componentes mais alinhados com o tipo de design que eu gosto hahahaha (...que é minimalista como deu pra perceber).

### 6. Tailwind + styled components

Usei os dois, mas com papéis diferentes:

**Tailwind**
- Classes rápidas direto, inline.
- Construção rápida do layout

**Styled Components**
- Usei mais em componentes reutilizáveis
- Usado em componentes que tinham variações de estados.

### 7. Vitest + Testing Library
- Por ser uma aplicação Next.js/Vite, o vitest me pareceu mais logico de ser utilizado pois se integra naturalmente, sem configuraçoes extra. Como eu estive priorizando <u>tempo</u> durante esse teste, me pareceu mais interessante utilizar uma ferramenta que não exigisse muito setup para ser utilizada. 

## <strong>Fluxo </strong>
#### 1. Usuário seleciona times via TeamSelection
#### 2. Define configurações (grupos, regras, etc)
#### 3. validations.ts valida os dados
#### 4. groups.ts ou knockout.ts processa o sorteio
#### 5. Resultado exibido em Groups ou TournamentBracket
#### 6. Estado é persistido automaticamente

### <strong>Qualidade e convenções</strong>
| Prática              | Detalhe                                              |
|---------------------|------------------------------------------------------|
| TypeScript strict   | Tipagem rigorosa ativada (`strict: true`)            |
| Testes              | Cobertura com Vitest                                 |
| Lint                | ESLint para padronização                             |
| Formatação          | Prettier automático                                  |
| Componentes         | Focados e reutilizáveis                              |
| Estilização         | Tailwind (layout) + styled-components (dinâmico)     |