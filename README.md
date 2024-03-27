# LikedMe

Este projeto é uma aplicação web construída com front-end em React e back-end em Flask. \
O Flask expõe uma RESTful API.

## Tecnologias
Frontend: React
Backend: Flask (Python)
API: RESTful (implementada com uma extensão Flask como Flask-RESTful)

## Estrutura do Projeto
O app é uma [single page application](https://blog.pshrmn.com/how-single-page-applications-work/), cada "página" seria um componente do React diferente renderizado
```bash
app-liked-me/
├── api/ # Diretório da API
│   ├── .flaskenv
│   └── api.py # Código API
│
├── public/
│
├── src/
│   ├── components/ # componentes
│   │   ├── acessos.css # estilos do componente (página) Acessos
│   │   ├── Acessos.js # componente Acessos
│   │   ├── adm-imagens.css
│   │   ├── AdmImagens.js
│   │   └── ...
│   │   
│   ├── App.css # estilos gerais do app
│   ├── App.js  # Código principal, rotas do React router
│   └── ...
│
├── .gitignore
├── package-lock.json
├── package.json
├── React README.md
├── README.md  # Este arquivo que você está lendo
└── requirements.txt  #  Dependências python
```
## Primeiros passos
**1. Pré-requisitos**
- Powershell / bash
- Node.js e npm.
- Python 3 e pip.

**2. Clone o repositório**
```Bash
git clone https://gitlab.lamoda.com.br/grupo-cobusiness-satc/frontend.git

cd frontend
```

**3. Instale as dependências**
- Frontend:
```Bash
npm install 
```
- Backend:
```Bash
py -m pip install -r requirements.txt
```

**4. Execute a aplicação** \
São necessários dois terminais

- Backend:
```Bash
npm run start-api  # inicia o servidor de Flask na porta 5000
```

- Frontend (desenvolvimento):
```Bash
npm run start  # inicia o servidor de React na porta 3000
```
Nota: React vai fazer um proxy para as chamadas de API, configurado em `package.json > proxy`. 


**5. Desenvolvimento**
Alterações no código tanto front quanto back serão atualizadas automaticamente ao salvar um arquivo.

## Documentação da API
**Endpoints**
- /.../..
  - ...
## Produção

--