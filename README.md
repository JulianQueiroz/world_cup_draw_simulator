# World Cup Draw Simulator 2026

## Como rodar o World Cup Draw Simulator 2026?

```bash
npm install
npm run dev
```
--- 
## Como testar?
```bash
npm test
npm run coverage
```
## Estrutura do projeto

```bash
src/
├── app            # Camada de páginas (Next.js App Router)
│   └── home       # Página principal da aplicação
├── components     # Componentes reutilizáveis da interface
├── context        # Providers globais (ex: tema, contexto React)
├── data           # Dados estáticos que alimentam a aplicaçao (ex: team.json)
├── hooks          # Hooks customizados reutilizáveis
├── lib            # Regras de negócio e lógica da aplicação
│   ├── store      # Gerenciamento de estado global
│   └── repository # Abstrações de acesso a dados
├── themes         # Configurações de tema (cores, estilos globais)
├── types          # Tipagens TypeScript compartilhadas

```
## Decisões tecnicas
As decisões tecnicas tomadas, bem como a arquitetura do projeto estão elucidadas nesse arquivo: [Arquitetura](./docs/architecture.md)
