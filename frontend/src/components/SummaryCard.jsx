import { useState } from 'react';

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
        const element = document.createElement("a");
        const file = new Blob([text], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `summary_${activeTab}_${data.filename}.txt`;
        document.body.appendChild(element);
        element.click();
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
                    Download {tabs.find(t => t.id === activeTab).label.split(' ')[0]} Text
                </button>
            </div>
        </div>
    );
};

export default SummaryCard;
