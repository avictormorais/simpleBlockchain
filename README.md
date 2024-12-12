# SimpleBlockchain

Este projeto implementa uma blockchain simples em JavaScript, permitindo a criação de blocos, transações entre usuários e validação da chain.

## Principais funções

- **Criação de Blocos:** Permite adicionar novos blocos à blockchain.
- **Transações:** Suporta transações entre usuários, registrando quem enviou e quem recebeu uma quantidade de tokens.
- **Validação da Blockchain:** Verifica se a blockchain é válida, verificando se o hash do bloco anterior é válido.
- **Impressão da Cadeia:** Mostra todos os blocos da blockchain no console, mostrando também cada transação.
- **Histórico de Transações:** Mostra todas as transferencias que envolvem determinado endereço.
- **Proof of Work:** Garante a integridade dos blocos.
- **Nós:** Simula diferentes mineradores interagindo com a rede.
- **Controle de saldo:** Gerencia o saldo dos endereços para evitar transações inválidas.
- **Recompensas:** Incentiva os mineradores priorizarem determinadas transações e serem compensados pelo trabalho realizado.

### Classes Principais:
- **`Transaction`**: Representa uma transação entre dois usuários.
- **`Block`**: Representa um bloco da blockchain.
- **`Blockchain`**: Gerencia a chain de blocos, transações pendentes e validação da blockchain.
- **`Node`**: Simula um nó que utiliza a rede.

## Estrutura

- **Métodos Principais:**
  - `hash(block)`: Calcula o hash de um bloco.
  - `getLastBlock()`: Retorna o último bloco da chain.
  - `newBlock(minerAddress)`: Cria um novo bloco e adiciona a chain, prioriza as transações mais lucrativas e compensa o minerador.
  - `createTransaction(sender, receiver, tokenAmount, fee)`: Cria uma nova transação e a adiciona na lista de transações pendentes, caso a mesma seja válida.
  - `isBlockchainValid()`: Verifica se a blockchain é válida, conferindo hashes.
  - `printChain()`: Imprime todos os blocos da blockchain no console.
  - `isValidAddress(address)`: Analisa por meio de RegEx se o endereço recebido é válido.
  - `transactionsByAddress(address)`: Imprime todas as transações do endereço passado.
  - `createGenesis()`: Cria o bloco gênesis da rede.
  - `getAddressBalance(address)`: Retorna o saldo atual do endereço passado.
  - `updateBalances()`: Percorre a cadeia e atualiza todos os saldos dos endereços.
  - `connect()`: Conecta um nó a outro, possibilitando a troca de informações entre eles.
  - `resolveFork()`: Verifica as cadeias e determina a de maior tamanho como válida.

- **Classe `Transaction`**:
  - Construtor: Recebe o remetente, o destinatário, a quantidade de tokens e a taxa de recompensa ao minerador.

- **Classe `Block`**:
  - Construtor: Inicializa um bloco com o timestamp, lista de transações e o hash do bloco anterior.
  - `calculateHash()`: Calcula o hash do bloco atual com base nas suas propriedades.
- **Classe `Node`**:
  - Construtor: Inicializa um nó com a rede e inicializa uma lista de pares.
  - `mineBlock(minerAddress)`: Minera um novo bloco no nó, e propaga-o após a mineração ser validada.
  - `createTransaction(sender, receiver, tokenAmount, fee)`: Verifica se o pedido de transação é valido (qnt de tokens, taxa, saldo) e, caso válido, adiciona-a na lista de transações a serem mineradas.
  - `resolveFork`: Verifica as cadeias e determina a maior como válida.

## Pré-requisitos

- Node.js

## Execução

1. Clone o repositório. 
   
```bash
git clone https://github.com/avictormorais/simpleBlockchain.git
```
2. Navegue até o diretório do projeto.
```bash
cd simpleBlockchain
```
3. Execute o comando para instalar as dependências:

```bash
npm install
```
4. Rode o projeto
```bash
node index.js
```

## Padrão de endereço

Os endereços dos `senders` e `receivers` devem seguir o seguinte padrão:

```
777x$$$$$$$$$$
```

Onde `777x` é um prefixo de identificação  e $ representa qualquer caractere hexadecimail, assim, padronizando todos as transações da rede. A função isValidAddress() é responsável por validar se os endereços seguem essa estrutura antes que as transações sejam aceitas.

## Proof of Work

O projeto conta com um sistema simples de PoW, a dificuldade atual está ajustada para `5`, portanto, só serão minerados blocos que o hash inicie com `00000...`.

Para a mineração, há um atributo nonce no bloco, onde ao tentar minerar, ele é incrementado até conseguir ser aceito pela regra.

## Taxas e recompensa

Ao minerar um bloco, o minerador recebe em seu endereço a recompensa base de mineração `50tks` mais a soma de todas as taxas das transações mineradas no bloco.

Ao minerar um bloco, são priorizadas as transações que tem maiores taxas, tornando a mineração mais vistosa aos mineradores.

## Forks e propagação de informações

O sistema simula diferentes mineradores (`nós`), o que tornou necessário funções que comunicassem diferentes nós para tornar todos atualizados sobre as transações e blocos válidos na rede.

Além disso, com diferentes nós minerando blocos, pode acontecer de criar `forks`, que são bifurcações da rede. Portanto, foi inplementado funções que verificam e garantem que as cadeias com maiores tamanhos serão tomadas como válidas, garantindo a integridade e imutabilidade da rede.


## Exemplos de Uso

No código, as transações são criadas da seguinte forma:

```javascript
node1.createTransaction("777x0000000001", "777x0000000002", 7, 0.1);
node1.mineBlock('777x0000000077');
```

Não necessariamente deve haver apenas uma transação por bloco.

Após a execução, a blockchain é impressa no console, mostrando todos os blocos e suas transações. A validação da blockchain também é feita chamando a função `isBlockchainValid()`, e logo em seguida, é exibido o histórico de transação de 2 endereços diferentes.

## Saída esperada

Caso o código não seja alterado, ao executá-lo, será impresso no console 4 blocos, sendo o primeiro o gênesis, e mais 3 com transações.
Cada bloco terá transações únicas, alguns usando nomes como `senders` e `receivers` e um transformando os nomes em `hash`, afim de testes.

## **Exemplo de bloco:**
```bash
-----------------------------------------------------------------------
--                               Block 2                             --
- Hash 9d984cecc9de493d887d4f9f7a7c6d98c9f6e7ee372a88d9360f87eb1cd0aed7
- PreviousHash be336fbacf37f82270c1d220d856e3e50a546df6439692ff6300d3f4c91d5fd8
- Timestamp 1728580427245
  Transactions:
  $ Transaction 1 | 777x0000000001 -> 777x0000000002: 777
  $ Transaction 2 | 777x0000000008 -> 777x0000000001: 7
  $ Transaction 3 | 777x0000000077 -> 777x0000000008: 77
-----------------------------------------------------------------------
```