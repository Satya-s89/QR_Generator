from flask import Flask, request, jsonify
from flask_cors import CORS
import qrcode
import io
import base64
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
# Enable CORS for frontend applications
CORS(app, origins=['*'], methods=['GET', 'POST', 'OPTIONS'], allow_headers=['Content-Type'])

@app.route('/generate-qr', methods=['POST'])
def generate_qr():
    data = request.json.get('text', '')
    if not data:
        return jsonify({'error': 'No text provided'}), 400
    
    # Customization parameters
    fill_color = request.json.get('fill_color', '#000000')
    back_color = request.json.get('back_color', '#ffffff')
    
    # Map error correction
    ec_level = request.json.get('error_correction', 'M').upper()
    ec_mapping = {
        'L': qrcode.constants.ERROR_CORRECT_L,
        'M': qrcode.constants.ERROR_CORRECT_M,
        'Q': qrcode.constants.ERROR_CORRECT_Q,
        'H': qrcode.constants.ERROR_CORRECT_H
    }
    error_correction = ec_mapping.get(ec_level, qrcode.constants.ERROR_CORRECT_M)
    
    # Safe integer casting for box size
    try:
        box_size = int(request.json.get('box_size', 10))
        if box_size < 1 or box_size > 100:
            box_size = 10
    except (ValueError, TypeError):
        box_size = 10
        
    # Safe integer casting for border
    try:
        border = int(request.json.get('border', 4))
        if border < 0 or border > 50:
            border = 4
    except (ValueError, TypeError):
        border = 4
        
    try:
        qr = qrcode.QRCode(
            version=None,  # let it fit automatically
            error_correction=error_correction,
            box_size=box_size,
            border=border
        )
        qr.add_data(data)
        qr.make(fit=True)
        
        img = qr.make_image(fill_color=fill_color, back_color=back_color)
        
        buffer = io.BytesIO()
        img.save(buffer, format='PNG')
        img_str = base64.b64encode(buffer.getvalue()).decode()
        
        # Generate SVG representation of the QR code
        modules = qr.modules
        num_modules = len(modules)
        width = (num_modules + 2 * border) * box_size
        
        svg_parts = []
        svg_parts.append(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {width}" width="{width}" height="{width}">')
        if back_color and back_color.lower() != 'transparent':
            svg_parts.append(f'  <rect width="{width}" height="{width}" fill="{back_color}" />')
        
        path_data = []
        for r, row in enumerate(modules):
            for c, val in enumerate(row):
                if val:
                    x = (c + border) * box_size
                    y = (r + border) * box_size
                    path_data.append(f'M{x},{y}h{box_size}v{box_size}h-{box_size}z')
        
        if path_data:
            svg_parts.append(f'  <path d="{" ".join(path_data)}" fill="{fill_color}" />')
        svg_parts.append('</svg>')
        svg_str = '\n'.join(svg_parts)
        
        response = jsonify({
            'qr_code': f'data:image/png;base64,{img_str}',
            'qr_code_svg': svg_str
        })
    except Exception as e:
        return jsonify({'error': f'Generation failed: {str(e)}'}), 500
        
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)