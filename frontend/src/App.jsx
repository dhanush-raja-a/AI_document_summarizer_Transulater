import { useState } from 'react';
import axios from 'axios';
import './index.css';
import UploadZone from './components/UploadZone';
import SummaryCard from './components/SummaryCard';

function App() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileSelect = async (file) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Assuming backend runs on port 8000
      const response = await axios.post('http://localhost:8000/api/process', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || "An error occurred while processing the document.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container animate-fade-in">
      <header style={{ padding: '3rem 0', textAlign: 'center' }}>
        <h1 style={{
          fontSize: '3.5rem',
          margin: '0 0 1rem 0',
          background: 'linear-gradient(to right, #60a5fa, #a78bfa)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-1px'
        }}>
          AI Document Analyzer
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
          Instantly summarize and translate your documents into Tamil and Telugu using advanced AI.
        </p>
      </header>

      <main className="glass-panel" style={{ padding: '2rem', minHeight: '400px' }}>
        <UploadZone onFileSelect={handleFileSelect} isLoading={isLoading} />

        {error && (
          <div style={{
            padding: '1rem',
            background: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 'var(--radius-md)',
            color: '#fca5a5',
            marginBottom: '2rem'
          }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {result && <SummaryCard data={result} />}
      </main>

      <footer style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        <p>© 2024 AI Document Analyzer. Built with FastAPI & React.</p>
      </footer>
    </div>
  );
}

export default App;
