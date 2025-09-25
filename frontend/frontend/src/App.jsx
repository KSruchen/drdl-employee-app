import React, { useState } from 'react';

export default function App() {
  const [empId, setEmpId] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const searchEmployees = async () => {
    setError('');
    setResults([]);
    if (!empId) {
      setError('Enter Employee ID');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:3001/api/employee', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({emp_id: empId, emp_name: ''}),
      });
      const data = await res.json();
      if (data.length === 0) setError('No records found');
      else setResults(data);
    } catch (e) {
      setError('Error fetching data');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-100 p-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-md shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-900">DRDL Employee Search</h1>

        <div className="flex gap-4 mb-6 justify-center">
          <input 
            type="number" 
            placeholder="Employee ID" 
            className="border border-gray-300 p-3 rounded-md flex-grow max-w-xs focus:ring-2 focus:ring-blue-600"
            value={empId}
            onChange={e => setEmpId(e.target.value)}
          />
          <button 
            onClick={searchEmployees} 
            disabled={loading}
            className={`px-6 py-3 rounded-md text-white transition duration-300 ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800'
            }`}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {error && (
          <p className="text-center text-red-600 mb-6 font-semibold">{error}</p>
        )}

        {results.length > 0 && (
          <div className="overflow-x-auto max-h-[600px]">
            <table className="w-full border border-gray-300 rounded-md text-left">
              <thead className="bg-blue-700 text-white sticky top-0">
                <tr>
                  {Object.keys(results[0]).map((key) => (
                    <th key={key} className="px-4 py-3 border border-blue-600">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                    {Object.values(row).map((val, i) => (
                      <td 
                        key={i} 
                        className="border px-4 py-2 border-blue-600 truncate max-w-xs" 
                        title={val ?? '-'}
                      >
                        {val ?? '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
