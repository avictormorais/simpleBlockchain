# SimpleBlockchain

Este projeto implementa uma blockchain simples em JavaScript, permitindo a criação de blocos, transações entre usuários e validação da chain.

## Principais funções

- **Criação de Blocos:** Permite adicionar novos blocos à blockchain.
- **Transações:** Suporta transações entre usuários, registrando quem enviou e quem recebeu uma quantidade de tokens.
- **Validação da Blockchain:** Verifica se a blockchain é válida, verificando se o hash do bloco anterior é válido.
- **Impressão da Cadeia:** Mostra todos os blocos da blockchain no console, mostrando também cada transação.

## Estrutura

- **Construtor:** Inicializa a blockchain e cria o bloco gênesis.
- **Métodos Principais:**
  - `hash(block)`: Calcula o hash de um bloco.
  - `getLastBlock()`: Retorna o último bloco da chain.
  - `newBlock()`: Cria um novo bloco e adiciona a chain.
  - `createTransaction(sender, receiver, tokenAmount)`: Cria uma nova transação e a adiciona na lista de transações pendentes.
  - `isBlockchainValid()`: Verifica se a blockchain é válida, conferindo hashes.
  - `printChain()`: Imprime todos os blocos da blockchain no console.

## Pré-requisitos

- Node.js (v14 ou superior)
- Biblioteca `js-sha256`

## Instalação

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

## Exemplos de Uso

No código, as transações são criadas da seguinte forma:

```javascript
BLOCKCHAIN.createTransaction("Victor", "Davi", 7);
BLOCKCHAIN.newBlock();
```

Não necessariamente deve haver apenas uma transação por bloco. Também há exemplos convertendo o nome dos usuários para hashes.

Após a execução, a blockchain é impressa no console, mostrando todos os blocos e suas transações. A validação da blockchain também é feita chamando a função `isBlockchainValid()`

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
  $ Transaction 1 | Victor -> Wandreus: 777
  $ Transaction 2 | Wandreus -> Bruno: 7
  $ Transaction 3 | Wandreus -> Isac: 77
-----------------------------------------------------------------------
```