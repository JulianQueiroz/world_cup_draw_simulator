# World Cup Draw Simulator 2026
#### Link de acesso:
[https://world-cup-draw-simulator-ashen.vercel.app/](https://world-cup-draw-simulator-ashen.vercel.app/)

## Como rodar?

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
As decisões tecnicas tomadas, bem como a arquitetura do projeto estão elucidadas nesse arquivo: [Arquitetura](./src/docs/architecture.md)

Explicação das lógicas implementadas no sorteio de grupos e mata mata estão elucidadas nesse arquivo: [Regras implementadas](./src/docs/rules.md)

## Limitações e melhorias futuras:

#### Limitações:
###### 1. Chaveamento é aleatório, não segue a regra da vida real.

#### Melhorias: 
###### 1. API como fonte de dados. Pois as seleções classificadas podem mudar com o tempo e seria uma solução mais escalável.
###### 2. Sistema de potes
###### 3. Lógica de chaveamento semelhante à vida real. Ex: 1º colocado do grupo A enfrenta 2º colocado do grupo B.
###### 4. Compartilhamento do resultado em redes sociais (Ex: whatsapp, X, instagram... )
###### 5. Regra de chaveamento (1º colocado de um grupo enfrenta o 2º colocado de um outro grupo)
###### 6. Ampliar cobertura de testes.

## Uso de IA:
Os esclarecimentos sobre uso de IA e ferramentas utilizadas estão elucidadas nesse doc:  [Uso de IA](./AI_USAGE.md)