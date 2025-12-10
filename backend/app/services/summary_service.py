import os
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain
from langchain_core.documents import Document

class SummaryEngine:
    def __init__(self):
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key:
            raise ValueError("GROQ_API_KEY not found in environment variables")
        
        # Using Llama3.3-70b-versatile for better quality summaries
        self.llm = ChatGroq(temperature=0, model_name="llama-3.3-70b-versatile", groq_api_key=api_key)
        
        self.prompt = ChatPromptTemplate.from_template(
            """
            You are an expert document summarizer. 
            Provide a concise, comprehensive abstractive summary of the following text.
            The summary should capture the main points, key arguments, and conclusions.
            Keep it professional and easy to understand.
            
            Text:
            {context}
            
            Summary:
            """
        )

    async def generate_summary(self, text: str) -> str:
        # For very large documents, we might need map-reduce, but for now we'll try direct stuffing
        # assuming reasonable file sizes for this demo.
        # If text is too long, we might truncate or need a chunking strategy.
        
        # Simple truncation if extremely long (approx 25k chars ~ 6k tokens, safe for 8k ctx)
        safe_text = text[:25000] 
        
        chain = self.prompt | self.llm
        
        try:
            response = await chain.ainvoke({"context": safe_text})
            # Clean up markdown formatting (remove **, *, ##, etc.)
            summary = response.content
            summary = summary.replace('**', '')  # Remove bold markers
            summary = summary.replace('*', '')   # Remove italic markers
            summary = summary.replace('##', '')  # Remove heading markers
            summary = summary.replace('###', '') # Remove subheading markers
            return summary
        except Exception as e:
            return f"Error generating summary: {str(e)}"
