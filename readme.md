# Git Remote Branch Cleaner

Um script Node.js para identificar e, opcionalmente, excluir branches remotas que não foram atualizadas em um período específico de dias. O script também verifica se existem Pull Requests (PRs) abertas associadas a cada branch antes de excluí-las.

## Índice

- [Git Remote Branch Cleaner](#git-remote-branch-cleaner)
  - [Índice](#índice)
  - [Pré-requisitos](#pré-requisitos)
  - [Primeiros Passos](#primeiros-passos)
- [Configuração](#configuração)
- [Uso](#uso)

## Pré-requisitos

Antes de usar este script, você precisa ter o seguinte instalado em seu sistema:

- [Node.js](https://nodejs.org/) (versão 14 ou posterior)
- [Git](https://git-scm.com/)

## Primeiros Passos

1. Clone este repositório para a sua máquina local:

```bash
git clone https://github.com/seu-nome-de-usuario/git-remote-branch-cleaner.git
```

Navegue até o diretório do projeto:
```bash
cd git-remote-branch-cleaner
```

Instale as dependências necessárias:
```bash
npm install
```
# Configuração
Você pode personalizar o comportamento do script modificando o arquivo index.js. Aqui estão algumas das configurações que você pode ajustar:

- DAYS_AGO: Configure o número de dias atrás para buscar branches (o padrão é 90 dias).
- REPO_PATH: Configure o caminho para o seu repositório Git.

# Uso
Para executar o script, utilize o seguinte comando:
```bash
node index.js
```

O script irá listar todas as branches remotas no seu repositório Git e verificará se há branches que não foram atualizadas em um período específico de dias (o padrão é 1200 dias). Ele também verificará se há PRs abertas associadas a cada branch.