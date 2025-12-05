from flask import Flask, render_template, request, jsonify
import json
from datubaze import get_topresult, pievienot

app = Flask(__name__)

#app = Flask('app')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/spele')
def spele():
    return render_template('spele.html')

@app.route('/tops')
def tops():
    return render_template('tops.html')

@app.route('/par')
def par():
    return render_template('par.html')

@app.route('/topData', methods = ['GET'])
def top_data():
    try:
        top_rezultati = get_topresult()
        top_5 = sorted(top_rezultati, key=lambda x: (x['klikski'], x['laiks']))[:5]
        return jsonify(top_5), 200
    except Exception:
        return jsonify({'status': 'error'}), 500
    
@app.route('/pievienot-rezultatu', methods = ['POST'])
def pievienot_rezultatu():
    dati = request.json
    try:
        pievienot(dati)
        top_rezultati = get_topresult()
        top_5 =sorted(top_rezultati, key=lambda x: (x['klikski'], x['laiks']))[:5]
        with open('score.json', 'w', encoding='UTF-8') as file:
            json.dump(top_5, file, ensure_ascii=False, indent=4)
    except Exception:
        return jsonify({'status': 'error'}), 500


if __name__ == '__main__':
    app.run(debug=True)