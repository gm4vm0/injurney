import { useState, FormEvent } from 'react';

const InjuryPage = () => {
  const [injuryDescription, setInjuryDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/analyze-injury', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ injuryDescription }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResult(data.result); // Adjust 
    } catch (error) {
      console.error('There was an error analyzing the injury:', error);
      setResult('Failed to analyze injury. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Analyze Your Injury</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={injuryDescription}
          onChange={(e) => setInjuryDescription(e.target.value)}
          placeholder="Describe your injury..."
          required
        ></textarea>
        <button type="submit" disabled={loading}>
          {loading ? 'Analyzing...' : 'Submit'}
        </button>
      </form>
      {result && <div><h2>Analysis Result:</h2><p>{result}</p></div>}
    </div>
  );
};

export default InjuryPage;
