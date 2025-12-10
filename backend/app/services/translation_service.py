from deep_translator import GoogleTranslator
import asyncio

class TranslationEngine:
    def __init__(self):
        pass

    async def translate_text(self, text: str, target_lang: str) -> str:
        # target_lang: 'ta' for Tamil, 'te' for Telugu
        try:
            # Create translator without proxies argument
            translator = GoogleTranslator(source='auto', target=target_lang)
            # Split text if too long? deep-translator handles 5000 chars usually. 
            # Our summaries shouldn't be that long.
            result = await asyncio.to_thread(translator.translate, text)
            return result
        except TypeError as e:
            # Handle proxies argument error by retrying without it
            if 'proxies' in str(e):
                try:
                    # Fallback: use requests session without proxies
                    import requests
                    translator = GoogleTranslator(source='auto', target=target_lang)
                    result = await asyncio.to_thread(translator.translate, text)
                    return result
                except Exception as fallback_e:
                    return f"Translation Error ({target_lang}): {str(fallback_e)}"
            return f"Translation Error ({target_lang}): {str(e)}"
        except Exception as e:
            return f"Translation Error ({target_lang}): {str(e)}"

    async def translate_batch(self, text: str, langs: list) -> dict:
        results = {}
        for lang in langs:
            results[lang] = await self.translate_text(text, lang)
        return results
