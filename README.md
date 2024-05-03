# Projeto

Este repositório contém o código do front-end da aplicação do projeto LikedMe.

Para funcionamento, ele deve estar ligado com uma API que fornece os dados de usuários e faz a transformação de imagem. \
Para testes locais pode ser usado o Flask, que expõe uma API com dados para testes.

## Tecnologias utilizadas

- React
- Flask (Python)
- RESTful (implementada com uma extensão Flask como Flask-RESTful)

## Pré-requisitos
- Node.js e Npm
- Python 3 e Pip

## Estrutura do Projeto
O app é uma [single page application](https://blog.pshrmn.com/how-single-page-applications-work/), cada "página" seria um componente do React diferente renderizado
```bash
app-liked-me/
├── api/ # Diretório da API
│   ├── .flaskenv
│   └── api.py # Código API
│
├── public/ # diretório público, assets estáticos são armazenados aqui
│
├── src/
│   ├── components/ # componentes
│   │   ├── acessos.css # estilos do componente `Acessos`
│   │   ├── Acessos.js # componente `Acessos`
│   │   ├── adm-imagens.css
│   │   ├── AdmImagens.js
│   │   └── ...
│   │   
│   ├── App.css # estilos do app aplicados em todos os componentes
│   ├── App.js  # Componente principal e rotas do React router
│   └── ...
│
├── .gitignore
├── package-lock.json
├── package.json
├── React README.md
├── README.md  # Este arquivo que você está lendo
└── requirements.txt  #  Dependências python
```

## Fluxo de desenvolvimento

Esse projeto utiliza Git Flow como metodologia de desenvolvimento.

![Git Flow La Moda](https://repo.lamoda.com.br/TI/GitLab/GitFlow_LaModa_Simple.drawio.png)

Clonar projeto local:
```bash
git clone https://gitlab.lamoda.com.br/grupo-cobusiness-satc/frontend.git
cd frontend
```

Desenvolver alteracoes em ambiente teste
```bash
git checkout testing
```

Realizar um merge de teste para produção:
```bash
git checkout production
git merge testing
```

## Branchs com deploy automatizado

- testing
- production

## Variaveis de CI/CD necessárias

Paramêtros para deploy
| Parâmetro          | Descrição                           |
| :----------------- | :---------------------------------- |
| `VARIAVEL_EXEMPLO` | Descrição exemplo |

## Rodar local

**Instale as dependências**
- Frontend:
```Bash
npm install 
```
- Backend:
```Bash
py -m pip install -r requirements.txt
```

**Execute a aplicação**

- Backend:
```Bash
npm run start-api  # inicia o servidor de Flask na porta 5000
```

- Frontend (desenvolvimento):
```Bash
npm run start  # inicia o servidor de React na porta 3000
```
Nota: React vai fazer um proxy para as chamadas de API, configurado em `package.json > proxy`. 

`

## Endpoints de acesso

- Teste: likedme-test.lamodatech.io
- Teste: likedme.lamodatech.io