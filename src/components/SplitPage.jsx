import React, { useState } from 'react';

function SplitPage() {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSplit = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('pdf', file);

        const response = await fetch('http://localhost:5000/split', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        // Handle response data (e.g., display download links for split PDFs)
    };

    return (
        <div className="split-page">
            <h2>Split PDF</h2>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            <button onClick={handleSplit}>Split PDF</button>
        </div>
    );
}

export default SplitPage;
