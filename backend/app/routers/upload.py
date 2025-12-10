from fastapi import APIRouter, UploadFile, File, HTTPException
from app.models import ProcessResponse
from app.utils.file_parser import extract_text
from app.services.summary_service import SummaryEngine
from app.services.translation_service import TranslationEngine
import time

router = APIRouter()

# Initialize services (lazy loading or global init could also work, but per-request or cached is fine)
# For now, we instantiate per request or we could use `Depends` for dependency injection.
# Since these classes are light (just clients), simple instantiation is okay, 
# BUT SummaryEngine reads Env Var in init, so make sure env is set.

@router.post("/process", response_model=ProcessResponse)
async def process_document(file: UploadFile = File(...)):
    start_time = time.time()
    try:
        # 1. Extract Text
        text = await extract_text(file)
        if not text:
            raise HTTPException(status_code=400, detail="Could not extract text from file.")
        
        print(f"Extracted {len(text)} characters.")

        # 2. Summarize
        summary_engine = SummaryEngine()
        print("Starting summarization...")
        summary = await summary_engine.generate_summary(text)
        print("Summarization complete.")
            
        # 3. Translate
        translation_engine = TranslationEngine()
        print("Starting translation...")
        translations = await translation_engine.translate_batch(summary, ['ta', 'te'])
        print("Translation complete.")

        processing_time = time.time() - start_time
        
        return ProcessResponse(
            filename=file.filename,
            original_length=len(text),
            summary=summary,
            translations=translations,
            processing_time=processing_time
        )
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Processing failed: {str(e)}")
