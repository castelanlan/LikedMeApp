# from datetime import datetime
from flask import Flask, request
from icecream import ic

app = Flask(__name__)

@app.route('/form', methods=["GET", "POST"])
def form():
    if request.method == "GET":
        return("<h1>apenas POST </h1>")
    
    ic(request)
    ic(request.files)
    ic(request.form)

    return ("<h1>Sucesso</h1>")