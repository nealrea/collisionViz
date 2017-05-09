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

application = Flask(__name__)
application.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

@application.route('/')
def index():
    return render_template('index.html')

@application.route('/route', methods=['POST'])
def route():
    data = request.get_json()
    print(data)
    return jsonify(data='data!')

@application.route('/borough_zip_totals', methods=['GET'])
def borough_zip_totals():
    totals = {
        'borough': compute.borough_totals(),
        'zipCode': compute.zip_totals()
    }
    return jsonify(totals)

@application.route('/bike_intersections', methods=['GET'])
def bike_intersections():
    intersections = compute.bike_intersections()

    return jsonify(intersections)

if __name__ == "__main__":
    application.run(host=host,port=port,debug=debug)
