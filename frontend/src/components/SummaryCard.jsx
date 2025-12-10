import { useState } from 'react';
import { jsPDF } from 'jspdf';

const SummaryCard = ({ data }) => {
    const [activeTab, setActiveTab] = useState('en'); // 'en', 'ta', 'te'

    const tabs = [
        { id: 'en', label: 'English Summary' },
        { id: 'ta', label: 'Tamil Translation' },
        { id: 'te', label: 'Telugu Translation' }
    ];

    const getContent = () => {
        if (activeTab === 'en') return data.summary;
        return data.translations[activeTab] || "Translation not available.";
    };

    const handleDownload = () => {
        const text = getContent();
        const tabLabel = tabs.find(t => t.id === activeTab).label.split(' ')[0];
        
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 10;
        const maxWidth = pageWidth - 2 * margin;
        
        // Add title
        doc.setFontSize(16);
        doc.text(`${tabLabel} Summary`, margin, margin + 10);
        
        // Add filename
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`File: ${data.filename}`, margin, margin + 20);
        
        // Reset text color
        doc.setTextColor(0);
        doc.setFontSize(11);
        
        // Add content with text wrapping
        const splitText = doc.splitTextToSize(text, maxWidth);
        doc.text(splitText, margin, margin + 30);
        
        // Save PDF
        doc.save(`summary_${activeTab}_${data.filename.split('.')[0]}.pdf`);
    };

    return (
        <div className="glass-panel animate-fade-in" style={{ padding: '0', overflow: 'hidden' }}>
            <div className="tabs" style={{ display: 'flex', borderBottom: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)' }}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            flex: 1,
                            padding: '1rem',
                            background: activeTab === tab.id ? 'var(--glass-bg)' : 'transparent',
                            border: 'none',
                            color: activeTab === tab.id ? 'var(--accent-color)' : 'var(--text-secondary)',
                            fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                            cursor: 'pointer',
                            borderBottom: activeTab === tab.id ? '2px solid var(--accent-color)' : 'none',
                            transition: 'var(--transition)'
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="content" style={{ padding: '2rem' }}>
                <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8', textAlign: 'left' }}>
                    {getContent()}
                </p>
            </div>

            <div className="actions" style={{ padding: '1rem 2rem', borderTop: '1px solid var(--glass-border)', textAlign: 'right' }}>
                <button className="btn-primary" onClick={handleDownload}>
                    Download {tabs.find(t => t.id === activeTab).label.split(' ')[0]} PDF
                </button>
            </div>
        </div>
    );
};

export default SummaryCard;
