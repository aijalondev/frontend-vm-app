# Projeto Frontend VM Tecnologia a Nayax Company
![Logo da VM Tecnologia](https://static.wixstatic.com/media/31e6f4_c384784ebd564c69bd34872c89331c55~mv2.png/v1/fill/w_241,h_55,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/logo%20inteira%201.png)

Este projeto é a interface de usuário web para a API Rest do teste na VM Tecnologia a Nayax Company.

## Visão Geral

O frontend é desenvolvido utilizando Angular e permite aos usuários interagir com os recursos da API, como gerenciamento de usuários e autenticação.

## Tecnologias Utilizadas

* **Framework:** Angular 19
* **Gerenciamento de Pacotes:** npm
* **Containerização:** Docker

## Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

* **Docker:** Certifique-se de ter o Docker instalado. Você pode baixá-lo em [https://www.docker.com/get-started](https://www.docker.com/get-started).
* **Git:** Necessário para clonar o repositório do projeto. Você pode baixá-lo em [https://git-scm.com/downloads](https://git-scm.com/downloads).

## Como Rodar a Aplicação com Docker

A maneira mais fácil e recomendada de rodar esta aplicação frontend é utilizando o Docker. Siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/aijalondev/frontend-vm-app.git
    cd frontend-vm-app
    ```
    **Observação:** Certifique-se de que o Git esteja instalado e configurado corretamente em seu sistema para que o comando `git clone` funcione.

2.  **Construa a imagem Docker da aplicação:**
    ```bash
    docker build -t frontend-vm-app .
    ```
    Este comando irá construir a imagem Docker para a aplicação frontend com base no Dockerfile presente no diretório do projeto.

3.  **Execute o container Docker:**
    ```bash
    docker run -p 80:80 frontend-vm-app
    ```
    Este comando irá executar o container Docker da aplicação frontend. A flag `-p 80:80` mapeia a porta 80 do container para a porta 80 da sua máquina local, tornando a aplicação acessível no seu navegador.

4.  **Acesse a Aplicação:**
    Após a execução do comando acima, a aplicação frontend estará disponível no seu navegador em [http://localhost](http://localhost).

## Rotas da Aplicação

A tabela abaixo descreve as rotas principais da aplicação frontend:

<html>
<body>

<h2>Rotas da Aplicação Frontend</h2>

<table>
  <thead>
    <tr>
      <th>Rota</th>
      <th>Componente</th>
      <th>Acesso</th>
      <th>Descrição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>/login</code></td>
      <td>LoginComponent</td>
      <td>Público</td>
      <td>Tela de login para os usuários inserirem suas credenciais.</td>
    </tr>
    <tr>
      <td><code>/register</code></td>
      <td>RegisterComponent</td>
      <td>Público</td>
      <td>Tela de registro para novos usuários criarem suas contas.</td>
    </tr>
    <tr>
      <td><code>/user-list</code></td>
      <td>UserListComponent</td>
      <td>Requer autenticação e perfil de Admin</td>
      <td>Lista os usuários cadastrados na plataforma (acesso restrito a admins).</td>
    </tr>
    <tr>
      <td><code>/user-profile</code></td>
      <td>UserProfileComponent</td>
      <td>Requer autenticação</td>
      <td>Tela para o usuário visualizar e gerenciar seu próprio perfil.</td>
    </tr>
    <tr>
      <td><code>/</code></td>
      <td>Redireciona para <code>/login</code></td>
      <td>Público</td>
      <td>Rota padrão que redireciona o usuário para a tela de login.</td>
    </tr>
  </tbody>
</table>

</body>
</html>

**Observações sobre as rotas:**

* **`canActivate: [AuthGuard]`**: Indica que a rota requer que o usuário esteja autenticado para acessá-la. Se o usuário não estiver logado, ele será redirecionado para a tela de login.
* **`canActivate: [AuthGuard, AdminGuard]`**: Indica que a rota requer autenticação e que o usuário autenticado deve ter o perfil de administrador para acessá-la.

## Configuração da API

A aplicação frontend se comunica com a API Rest da VM Tecnologia. Para informações sobre a API Rest e como configurá-la, você pode consultar o repositório da API em [https://github.com/aijalondev/api-rest-vm/](https://github.com/aijalondev/api-rest-vm/).
