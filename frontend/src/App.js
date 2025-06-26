import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [service, setService] = useState('ideogram');
  const [count, setCount] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');
    setImages([]);

    try {
      const response = await axios.post('/api/process-images', {
        prompt: prompt.trim(),
        service,
        count
      });

      if (response.data.images) {
        setImages(response.data.images);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate images');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    if (images.length === 0) return;

    try {
      const response = await axios.post('/api/export-zip', 
        { images },
        { responseType: 'blob' }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'generated_images.zip');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to export images');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🔥 IdeogramFIRE</h1>
        <p>AI-Powered Image Generation</p>
      </header>

      <main className="App-main">
        <form onSubmit={handleSubmit} className="generation-form">
          <div className="form-group">
            <label htmlFor="prompt">Describe your image:</label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A beautiful sunset over mountains..."
              rows={3}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="service">AI Service:</label>
              <select 
                id="service"
                value={service} 
                onChange={(e) => setService(e.target.value)}
              >
                <option value="ideogram">Ideogram</option>
                <option value="openai">OpenAI DALL-E</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="count">Number of images:</label>
              <select 
                id="count"
                value={count} 
                onChange={(e) => setCount(parseInt(e.target.value))}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </select>
            </div>
          </div>

          <button type="submit" disabled={loading || !prompt.trim()}>
            {loading ? 'Generating...' : 'Generate Images'}
          </button>
        </form>

        {error && (
          <div className="error-message">
            <p>❌ {error}</p>
          </div>
        )}

        {images.length > 0 && (
          <div className="results">
            <div className="results-header">
              <h2>Generated Images ({images.length})</h2>
              <button onClick={handleExport} className="export-btn">
                📦 Export as ZIP
              </button>
            </div>
            
            <div className="images-grid">
              {images.map((image, index) => (
                <div key={index} className="image-card">
                  <img src={image.url} alt={`Generated ${index + 1}`} />
                  <div className="image-info">
                    <span className="service-badge">{image.service}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App; 