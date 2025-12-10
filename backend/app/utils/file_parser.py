import io
from fastapi import UploadFile, HTTPException
import PyPDF2
from docx import Document

async def extract_text(file: UploadFile) -> str:
    content_type = file.content_type
    filename = file.filename.lower()
    
    try:
        if "pdf" in content_type or filename.endswith(".pdf"):
            return await _read_pdf(file)
        elif "word" in content_type or filename.endswith(".docx"):
            return await _read_docx(file)
        elif "text" in content_type or filename.endswith(".txt"):
            return await _read_txt(file)
        else:
            raise HTTPException(status_code=400, detail="Unsupported file format. Please upload PDF, DOCX, or TXT.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")

async def _read_pdf(file: UploadFile) -> str:
    content = await file.read()
    pdf_reader = PyPDF2.PdfReader(io.BytesIO(content))
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text() + "\n"
    return text.strip()

async def _read_docx(file: UploadFile) -> str:
    content = await file.read()
    doc = Document(io.BytesIO(content))
    text = "\n".join([para.text for para in doc.paragraphs])
    return text.strip()

async def _read_txt(file: UploadFile) -> str:
    content = await file.read()
    return content.decode("utf-8").strip()
