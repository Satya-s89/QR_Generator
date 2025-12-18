# QR Generator

A simple QR code generator with Python Flask backend and React frontend.

## Local Development

### Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Deployment

- **Backend**: Deploy to Render (pure Python, no Docker)
- **Frontend**: Deploy to Netlify
- Uses Gunicorn for production server
- Python 3.9 runtime specified

## Usage

1. Start the backend server (runs on port 5000)
2. Start the frontend (runs on port 3000)
3. Enter text and click "Generate QR" to create QR codes