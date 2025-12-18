from flask import Flask, request, jsonify
from flask_cors import CORS
import qrcode
import io
import base64
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, origins=['*'], methods=['GET', 'POST'], allow_headers=['Content-Type'])

@app.route('/generate-qr', methods=['POST'])
def generate_qr():
    data = request.json.get('text', '')
    if not data:
        return jsonify({'error': 'No text provided'}), 400
    
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(data)
    qr.make(fit=True)
    
    img = qr.make_image(fill_color="black", back_color="white")
    
    buffer = io.BytesIO()
    img.save(buffer, format='PNG')
    img_str = base64.b64encode(buffer.getvalue()).decode()
    
    response = jsonify({'qr_code': f'data:image/png;base64,{img_str}'})
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)