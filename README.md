# 🚀 AI Document Summarizer & Translator

> Transform your documents into concise summaries and translations with the power of AI

![Status](https://img.shields.io/badge/status-active-success.svg)
![Python](https://img.shields.io/badge/python-v3.9+-blue.svg)
![React](https://img.shields.io/badge/react-v19.2+-61dafb.svg)
![FastAPI](https://img.shields.io/badge/fastapi-latest-009688.svg)

---

## ✨ Features

- 📄 **Multi-Format Support**: Upload PDF, DOCX, and TXT files
- 🤖 **AI-Powered Summarization**: Uses Groq's Llama 3.3 70B model for intelligent summaries
- 🌍 **Multi-Language Translation**: Automatically translates summaries to Tamil (தமிழ்) and Telugu (తెలుగు)
- 📥 **PDF Export**: Download your summaries and translations as professional PDF files
- ⚡ **Real-Time Processing**: See processing updates as your document is analyzed
- 🎨 **Modern UI**: Beautiful glass-morphism design with smooth animations

---

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **Groq API** - Powerful AI inference engine
- **LangChain** - LLM orchestration
- **Python-DOCX** - Document parsing
- **PyPDF2** - PDF processing
- **Deep-Translator** - Multi-language translation

### Frontend
- **React 19** - Modern UI framework
- **Vite** - Lightning-fast build tool
- **Axios** - HTTP client
- **jsPDF** - PDF generation
- **CSS3** - Advanced animations and styling

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.9+**
- **Node.js 16+** and npm
- **Groq API Key** (Get one free at [console.groq.com](https://console.groq.com))

---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/dhanush-raja-a/AI_document_summarizer_Transulater.git
cd AI_document_summarizer_Transulater
```

### 2️⃣ Backend Setup

#### Create Environment File

Create a `.env` file in the `backend` directory:

```bash
cd backend
touch .env
```

#### Add Your Groq API Key

Open `backend/.env` and add:

```env
GROQ_API_KEY=your_groq_api_key_here
```

**To get your Groq API Key:**
1. Visit [console.groq.com](https://console.groq.com)
2. Sign up or log in
3. Navigate to API Keys section
4. Copy your API key
5. Paste it in the `.env` file

#### Install Backend Dependencies

```bash
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

#### Run Backend Server

```bash
python3 main.py
```

✅ Backend will run on: `http://localhost:8000`

---

### 3️⃣ Frontend Setup

Open a new terminal window and navigate to the frontend directory:

```bash
cd frontend
npm install
```

#### Run Frontend Development Server

```bash
npm run dev
```

✅ Frontend will run on: `http://localhost:5173`

---

## 🎯 Quick Start (Both Backend & Frontend)

### Option 1: Run in Separate Terminals (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
python3 main.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Option 2: Run Both with Scripts

Create a script to run both simultaneously:

**macOS/Linux:**
```bash
#!/bin/bash
cd backend && source .venv/bin/activate && python3 main.py &
cd frontend && npm run dev
```

---

## 📖 Usage

1. **Open Browser**: Navigate to `http://localhost:5173`
2. **Upload Document**: Drag & drop or click to upload a PDF, DOCX, or TXT file
3. **Wait for Processing**: Watch as the AI processes your document
4. **View Results**: See:
   - 📝 English Summary
   - 🇮🇳 Tamil Translation
   - 🇮🇳 Telugu Translation
5. **Download**: Export any translation as a PDF file

---

## 🏗️ Project Structure

```
AI_document_summarizer_Transulater/
├── backend/
│   ├── main.py                          # FastAPI application
│   ├── requirements.txt                 # Python dependencies
│   ├── .env                             # Environment variables (CREATE THIS)
│   └── app/
│       ├── models.py                    # Pydantic models
│       ├── routers/
│       │   └── upload.py               # Document processing routes
│       ├── services/
│       │   ├── summary_service.py      # AI summarization
│       │   └── translation_service.py  # Multi-language translation
│       └── utils/
│           └── file_parser.py          # Document parsing
│
├── frontend/
│   ├── package.json                     # Node dependencies
│   ├── vite.config.js                   # Vite configuration
│   ├── index.html                       # HTML entry point
│   └── src/
│       ├── main.jsx                     # React entry
│       ├── App.jsx                      # Main app component
│       ├── index.css                    # Global styles
│       └── components/
│           ├── UploadZone.jsx          # Upload interface
│           ├── UploadZone.css          # Upload styles
│           └── SummaryCard.jsx         # Results display
│
├── .gitignore                           # Git ignore file (includes .env)
└── README.md                            # This file
```

---

## 🔧 Environment Variables

### Backend `.env` File

```env
# Groq API Configuration
GROQ_API_KEY=gsk_your_actual_api_key_here
```

⚠️ **Important**: Never commit your `.env` file! It's already in `.gitignore`

---

## 🚀 API Endpoints

### Process Document

**POST** `/api/process`

**Request:**
```bash
curl -X POST "http://localhost:8000/api/process" \
  -F "file=@your_document.pdf"
```

**Response:**
```json
{
  "filename": "your_document.pdf",
  "original_length": 5000,
  "summary": "Your document summary...",
  "translations": {
    "ta": "Tamil translation...",
    "te": "Telugu translation..."
  },
  "processing_time": 3.45
}
```

---

## 🐛 Troubleshooting

### Port Already in Use

If port 8000 (backend) or 5173 (frontend) is already in use:

```bash
# macOS/Linux - Kill process on port
lsof -i :8000  # Check what's using port 8000
kill -9 <PID>  # Kill the process

# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### Missing `.env` File

```
ValueError: GROQ_API_KEY not found in environment variables
```

**Solution:** Create `backend/.env` with your Groq API key (see setup instructions)

### Module Not Found

```
ModuleNotFoundError: No module named 'fastapi'
```

**Solution:** Ensure virtual environment is activated and dependencies are installed:
```bash
source .venv/bin/activate
pip install -r requirements.txt
```

---

## 📊 Performance

- **Summarization**: Powered by Llama 3.3 70B Versatile (Groq)
- **Translation**: Uses Google Translate API via Deep-Translator
- **Processing Time**: ~3-5 seconds per document (varies by size)
- **Supported File Sizes**: Up to 25,000 characters

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the MIT License.

---

## 🙏 Acknowledgments

- **Groq** - For powerful AI inference
- **FastAPI** - For excellent Python framework
- **React & Vite** - For modern frontend development
- **LangChain** - For LLM orchestration
- **Deep-Translator** - For translation services

---

## 📬 Contact

- **GitHub**: [@dhanush-raja-a](https://github.com/dhanush-raja-a)
- **Project**: [AI Document Summarizer & Translator](https://github.com/dhanush-raja-a/AI_document_summarizer_Transulater)

---

## 🎓 Learning Resources

- [Groq API Documentation](https://console.groq.com/docs)
- [FastAPI Tutorial](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev)
- [LangChain Documentation](https://python.langchain.com/)

---

<div align="center">

**Made with ❤️ using FastAPI & React**

⭐ Star this repository if you found it helpful!

</div>
