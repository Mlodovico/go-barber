# Dependências

  - **yarn**
  - **node V10.15.3**
  - **Docker**

********************

# Modo de instalação

  Rode o seguinte comando para a intalação dos pacotes e do node_modules: **yarn**

  ## Docker
  Este projeto roda com somente 3 containers dentro do docker e são necessários tambem sua
  devida configuração e comandos:
  
  ## Container Postgres:
  **docker run --name gostack_postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres**

  ## Container MongoDB:
  **docker run --name mongodb -p 27017:27017 -d -t mongo**

  ## Container Redis:
  **docker run --name redis -p 6379:6379 -d -t redis:alpine**

************

# Sobre a API

  O aplicativo, em uma visão macro, trabalha com um sistema CRUD e tem a principal funcionalidade de gerenciar marcação de datas, perfis de usuários, login e logout. Em uma visão micro, trabalha
  com recuperação de senha, regra de negócios entre usuários, horários marcados, listagem de horários disponiveis para marcar, atualizações de perfis, entre outros.
  Aplicação feita apenas para aprendizado do curso da **Gostack Bootcamp**.

***********
