# from datetime import datetime
from time import sleep
from flask import Flask, request, Response
import json
from icecream import ic
import base64 as b64
import os

def read_all_file_contents(directory_path):
    file_contents = []
    for filename in os.listdir(directory_path):
        filepath = os.path.join(directory_path, filename)

        with open(filepath, "r") as file:
            content = file.read()

        file_contents.append(content)
    return file_contents

bases64 = read_all_file_contents("./imagens")

app = Flask(__name__)

PERMISSOES = {
    'gerar_imagens': 1,
    'visualizar_imagens': 2,
    'deletar_imagens': 4,
    'alterar_imagens': 8,
    'cadastrar_usuario': 16,
    'consultar_usuario': 32,
    'deletar_usuario': 64,
    'editar_permissoes_usuario': 128,
    'consultar_historico': 256,
    'exportar_historico': 512,
    'adicionar_a_galeria': 1024,
    'deletar_da_galeria': 2048,
    'visualizar_galeria': 4096,
    'download_galeria': 8192,
    'estilista': 16384,
    'avaliador': 32768,
    'admin': 65536, 
}

users_data = [
    {'nome': 'Gabriel Castelan',
    'login': 'gabriel.castelan',
    'permissão': PERMISSOES['admin']},
    {'nome': 'Alexandre Buratto',
    'login': 'xande.buratto',
    'permissão': PERMISSOES['admin'] | PERMISSOES['avaliador']},
    {'nome': 'Sofia Oliveira',
    'login': 'sofia.oliveira',
    'permissão': PERMISSOES['estilista']},
    {'nome': 'Miguel Santos',
    'login': 'miguel.santos',
    'permissão': 0},  # No permissions
    {'nome': 'Beatriz Almeida',
    'login': 'beatriz.almeida',
    'permissão': PERMISSOES['avaliador']},
    {'nome': 'Carolina Lima',
    'login': 'carolina.lima',
    'permissão': PERMISSOES['estilista'] | PERMISSOES['avaliador']},  # Estilista and avaliador
    {'nome': 'Daniel Rocha',
    'login': 'daniel.rocha',
    'permissão': PERMISSOES['admin'] & ~PERMISSOES['avaliador']},  # Admin but not avaliador (use bitwise AND and NOT)
    {'nome': 'Eduardo Silva',
    'login': 'eduardo.silva',
    'permissão': 3},  # Combination not defined in dictionary (use integer value directly)
    {'nome': 'Gabriel Castelan',
    'login': 'gabriel.castelan',
    'permissão': PERMISSOES['gerar_imagens'] | PERMISSOES['visualizar_imagens']},
    {'nome': 'Sofia Oliveira',
    'login': 'sofia.oliveira',
    'permissão': PERMISSOES['deletar_imagens'] | PERMISSOES['alterar_imagens']},
    {'nome': 'João Fernandes',
    'login': 'joao.fernandes',
    'permissão': PERMISSOES['cadastrar_usuario'] | PERMISSOES['consultar_usuario']},
    {'nome': 'Mariana Costa',
    'login': 'mariana.costa',
    'permissão': PERMISSOES['deletar_usuario'] | PERMISSOES['editar_permissoes_usuario']},
    {'nome': 'Eduardo Silva',
    'login': 'eduardo.silva',
    'permissão': PERMISSOES['consultar_historico'] | PERMISSOES['exportar_historico']},
    {'nome': 'Lara Silva',
    'login': 'lara.silva',
    'permissão': PERMISSOES['adicionar_a_galeria'] | PERMISSOES['deletar_da_galeria']},
    {'nome': 'Beatriz Almeida',
    'login': 'beatriz.almeida',
    'permissão': PERMISSOES['visualizar_galeria'] | PERMISSOES['download_galeria']},
]

@app.route('/form', methods=["GET", "POST"])
def form():
    if request.method == "GET":
        return Response(response="Invalid method.", status=500)
    
    file_data = b64.b64encode(request.files["arquivo"].read()).decode("utf-8")
    

    r = dict(request.form)
    # print([i[176: 186] for i in bases64])
    r['imagem'] = [
        file_data,
        *bases64
    ]

    response = Response(
        response=json.dumps(r),
        status=200,
        headers=dict(request.headers),
        mimetype='application/json'
    )

    sleep(1)

    return response

@app.route('/users', methods=["GET"])
def users():
    return users_data

@app.route('/user/<username>', methods=["GET"])
def user(username):
    for user in users_data:
        if user['login'] == username:
            permissao = user['permissão']
            break

    return [permissao]