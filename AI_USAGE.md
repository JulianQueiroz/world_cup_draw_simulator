## Uso de IA

### Ferramentas utilizadas:

Claude, Chat GPT, Manus.

#### Manus:
- Utilizei para geração da UI do componente TournamentBracket (componente de chaveamento). Inicialmente eu procurei na internet se havia alguma lib externa para gerar chaveamento de torneios, mas os que encontrei estavam desatualizados. 
   ##### Adaptaçoes manuais
- Realizei algumas adaptações no que foi gerado pelo Manus, como: 
  - Adição de componentes filhos; 
  - modificaçoes no style para atender a identidade visual que eu idealizei pro sistema; 
  - maps e conditional rendering..

#### Claude:
- utilizei para me apoiar na decisão de ferramentas de gerenciamento de estados e como apoio na elaboração dos testes por não ter tanta vivência com testes automatizados;
- sugestão de organização da estrutura de pastas do sistema;
- tipagem de algumas funçoes que me deixaram na duvida sobre qual a melhor abordagem de tipagem e qual seria a mais escalavel para posterior implementaçao de api;
- sugestões de refatoração em funções e/ou componentes que apresentavam código pouco organizado;

#### Chat GPT:
- Desenvolvimento do README principal ([esse](./README.md))
- Apoio no desenvolvimento do [documento de arquitetura](./src/docs/architecture.md) 
    ##### Adaptações manuais
- As sessões 7 de 'decisões técnicas' e 8 de 'Limitações e melhorias futuras' do [documento de arquitetura](./src/docs/architecture.md) foi inteiramente escrita por mim, bem como este documento, que está sendo produzido sem uso de IA

### Adaptações manuais e trade-offs

#### 1. Restrição de configurações de grupos

**Adaptação**
- Restrição do número de grupos para **2, 4 ou 8** por meio de um input do tipo *Radio*

**Trade-off**
- Menor flexibilidade de configuração  
-  Garantia de chaveamento sempre válido  

**Validação**
- Implementação da função pura validateEqualGroupSizes para garantir consistência antes do mata-mata  
- Execução de testes manuais (E2E)  

---

#### 2. Refatoração de código gerado por IA

**Problema**
- Trechos gerados não seguiam boas práticas de organização (clean code)

**Ações realizadas**
- Separação de responsabilidades em componentes menores  
- Extração de lógica para funções reutilizáveis  
- Melhoria na legibilidade e manutenção do código  