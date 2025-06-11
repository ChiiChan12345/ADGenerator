import React, { useState, useEffect } from 'react';
import './App.css';
import promptGuide from './PromptFORGPT';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

function App() {
  const [images, setImages] = useState([]);
  const [vertical, setVertical] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [angle, setAngle] = useState('');
  const [sentiment, setSentiment] = useState('');
  const sentimentOptions = [
    'Professional',
    'Salesy',
    'Funny',
    'Occasional',
    'Casual',
    'Formal',
    'Emotional',
    'Inspirational',
    'Educational',
    'Conversational',
    'Authoritative',
    'Friendly',
    'Humorous',
    'Serious',
    'Playful',
    'Mixed'
  ];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedImages, setGeneratedImages] = useState([]);
  const [isExporting, setIsExporting] = useState(false);
  const [results, setResults] = useState([]);
  const [prompts, setPrompts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  // Handle arrow key navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!selectedImage) return;

      const currentIndex = results.findIndex(img => img === selectedImage.url);
      if (currentIndex === -1) return;

      if (event.key === 'ArrowLeft') {
        const prevIndex = (currentIndex - 1 + results.length) % results.length;
        setSelectedImage({ url: results[prevIndex], prompt: prompts[prevIndex] });
      } else if (event.key === 'ArrowRight') {
        const nextIndex = (currentIndex + 1) % results.length;
        setSelectedImage({ url: results[nextIndex], prompt: prompts[nextIndex] });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, results, prompts]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);
    setError('');
  };

  const handleVerticalChange = (e) => {
    setVertical(e.target.value);
    setError('');
  };

  const handleAgeGroupChange = (e) => {
    setAgeGroup(e.target.value);
    setError('');
  };

  const handleAngleChange = (e) => {
    setAngle(e.target.value);
    setError('');
  };

  const handleSentimentChange = (e) => {
    setSentiment(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!images.length) {
      setError('Please upload at least one image.');
      return;
    }
    if (!vertical.trim() || !ageGroup.trim() || !sentiment.trim() || !angle.trim()) {
      setError('Please enter vertical, age group, sentiment, and angle.');
      return;
    }
    setLoading(true);
    const formData = new FormData();
    let promptString = `Vertical: ${vertical} | Age Group: ${ageGroup} | Sentiment: ${sentiment} | Angle: ${angle}`;
    promptString += ` | ${promptGuide}`;

    // Add images to formData
    images.forEach((image) => {
      formData.append('image', image);
    });

    formData.append('prompt', promptString);

    try {
      const response = await fetch('http://localhost:3001/api/process', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate images');
      }

      const data = await response.json();
      if (data.results && Array.isArray(data.results)) {
        setPages([...pages, { results: data.results, prompts: data.prompts }]);
        setCurrentPage(pages.length);
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'An error occurred while processing the images.');
    } finally {
      setLoading(false);
    }
  };

  // Export all images as zip (using backend)
  const handleExportAll = async () => {
    setError('');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/export-zip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urls: results }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to export images');
      }
      
      const blob = await response.blob();
      saveAs(blob, 'ideogramfire-images.zip');
    } catch (err) {
      setError('Failed to export images as zip.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (url, prompt) => {
    setSelectedImage({ url, prompt });
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="container">
      <h1>IdeogramFIRE Internal Image Generator</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="upload-section">
          <div className="upload-box">
            <h3>Upload Images</h3>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="file-input"
            />
            {images.length > 0 && (
              <p className="file-info">{images.length} image(s) selected</p>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="vertical">Vertical:</label>
          <input
            type="text"
            id="vertical"
            value={vertical}
            onChange={handleVerticalChange}
            placeholder="Enter vertical"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="angle">Angle:</label>
          <input
            type="text"
            id="angle"
            value={angle}
            onChange={handleAngleChange}
            placeholder="Enter angle"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="sentiment">Sentiment:</label>
          <select
            id="sentiment"
            value={sentiment}
            onChange={handleSentimentChange}
            className="sentiment-select"
            required
          >
            <option value="">Select sentiment</option>
            {sentimentOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="ageGroup">Age Group:</label>
          <input
            type="text"
            id="ageGroup"
            value={ageGroup}
            onChange={handleAgeGroupChange}
            placeholder="Enter age group"
            required
          />
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Processing...' : 'Generate Images'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {pages.length > 0 && (
        <div className="results-section">
          <h2>Generated {pages[currentPage].results.length} Images</h2>
          <button onClick={handleExportAll} className="export-button" disabled={isExporting}>
            {isExporting ? 'Exporting...' : 'Export All as ZIP'}
          </button>
          <div className="page-navigation">
            {pages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={currentPage === index ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className="image-grid">
            {pages[currentPage].results.map((url, index) => (
              <div key={index} className="image-item" onClick={() => handleImageClick(url, pages[currentPage].prompts[index])}>
                <img src={url} alt={`Generated ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedImage && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <div className="arrow arrow-left" onClick={(e) => {
              e.stopPropagation();
              const currentIndex = pages[currentPage].results.findIndex(img => img === selectedImage.url);
              if (currentIndex > 0) {
                setSelectedImage({ url: pages[currentPage].results[currentIndex - 1], prompt: pages[currentPage].prompts[currentIndex - 1] });
              }
            }}>&lt;</div>
            <img src={selectedImage.url} alt="Selected" />
            <div className="arrow arrow-right" onClick={(e) => {
              e.stopPropagation();
              const currentIndex = pages[currentPage].results.findIndex(img => img === selectedImage.url);
              if (currentIndex < pages[currentPage].results.length - 1) {
                setSelectedImage({ url: pages[currentPage].results[currentIndex + 1], prompt: pages[currentPage].prompts[currentIndex + 1] });
              }
            }}>&gt;</div>
            <p>{selectedImage.prompt}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App; 