from flask import Flask, jsonify
from flask_cors import CORS

from unidecode import unidecode

import requests

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/lineas', methods=['GET'])
def get_lineas():
    response = requests.get('http://api.ctan.es/v1/Consorcios/2/lineas/')
    data = response.json()
    lineas = []

    for linea in data['lineas']:
        lineas.append(f"{linea['codigo']} - {linea['nombre']} - {linea['modo']}")

    return jsonify(lineas)


@app.route('/busqueda/<origen>/<destino>', methods=['GET'])
def busqueda(origen, destino):
    # Convertir '_' en espacios y eliminar acentos
    origen = unidecode(origen.replace('_', ' ').lower())
    destino = unidecode(destino.replace('_', ' ').lower())

    response = requests.get('http://api.ctan.es/v1/Consorcios/2/lineas/')
    data = response.json()

    # Filtrar nombres origen y destino
    lineas_encontradas = [linea for linea in data['lineas']
                          if origen in unidecode(linea['nombre'].lower()) and
                             destino in unidecode(linea['nombre'].lower())]

    if not lineas_encontradas:
        return jsonify({'error': 'No se encontraron rutas para el origen y/o destino especificado.'}), 404

    return jsonify({'lineas': lineas_encontradas})


@app.route('/paradas/<linea>/<sentido>', methods=['GET'])
def paradas(linea, sentido):
    response = requests.get(f'http://api.ctan.es/v1/Consorcios/2/lineas/{linea}/paradas')

    if response.status_code != 200:
        return jsonify({'error': f'Error al obtener las paradas de la línea {linea}. Error de la API: {response.text}'}), response.status_code

    try:
        data = response.json()
    except ValueError:
        return jsonify({'error': 'Error decodificando la respuesta JSON.'}), 500

    paradas = [parada for parada in data.get('paradas', []) if parada.get('sentido') == sentido]

    if not paradas:
        return jsonify({'error': 'No se encontraron paradas para la línea y sentido especificados.'}), 404

    return jsonify({'paradas': paradas})







if __name__ == '__main__':
    app.run(debug=True)
