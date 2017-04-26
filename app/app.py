from flask import Flask, render_template, request, jsonify
import compute
import os

if os.getenv('DATA_ENV') == 'PRD':
    host = '0.0.0.0'
    port = 80
    debug = False
else:
    host = '127.0.0.1'
    port = 5000
    debug = True

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/totals', methods=['GET'])
def totals():
    totals = {
        'borough': compute.borough_totals(),
        'zipCode': compute.zip_totals()
    }
    return jsonify(totals)

if __name__ == "__main__":
    app.run(host=host,port=port,debug=debug)
