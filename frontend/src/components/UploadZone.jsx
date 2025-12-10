import { useState, useRef } from 'react';
import './UploadZone.css'; // We'll create this or use inline styles

const UploadZone = ({ onFileSelect, isLoading }) => {
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onFileSelect(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            onFileSelect(e.target.files[0]);
        }
    };

    const onButtonClick = () => {
        inputRef.current.click();
    };

    return (
        <div
            className={`upload-zone ${dragActive ? 'active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={onButtonClick}
            style={{
                border: '2px dashed var(--glass-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '3rem',
                textAlign: 'center',
                cursor: 'pointer',
                background: dragActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                transition: 'var(--transition)',
                marginBottom: '2rem'
            }}
        >
            <input
                ref={inputRef}
                type="file"
                className="input-file"
                multiple={false}
                onChange={handleChange}
                accept=".pdf,.docx,.txt"
                style={{ display: 'none' }}
                disabled={isLoading}
            />
            {isLoading ? (
                <div className="spinner">Processing...</div>
            ) : (
                <div>
                    <h3 style={{ marginBottom: '0.5rem' }}>Drag & Drop your document here</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>or click to browse</p>
                    <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>Supported formats: PDF, DOCX, TXT</p>
                </div>
            )}
        </div>
    );
};

export default UploadZone;
