import { useState, useEffect } from 'react';
import { api } from '../lib/api';

export default function MyRegistrations() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      loadRegistrations(storedToken);
    }
  }, []);

  const loadRegistrations = async (token: string) => {
    const data = await api.getMyRegistrations(token);
    setRegistrations(data);
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-secondary bg-surface">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-black">MY REGISTRATIONS</h1>
            <a href="/" className="text-black hover:text-secondary transition-colors">← Back to Home</a>
          </div>
        </div>
      </nav>
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {registrations.length === 0 ? (
          <div className="card text-center text-accent">No registrations yet</div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {registrations.map((reg) => (
              <div key={reg.id} className="card">
                <h3 className="text-xl font-bold mb-2">{reg.competition.title}</h3>
                <p className="text-accent mb-3">{reg.competition.description}</p>
                <div className="flex gap-6 text-sm">
                  <div>
                    <span className="text-accent">DEADLINE:</span> {new Date(reg.competition.regDeadline).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="text-accent">STATUS:</span> <span className="uppercase">{reg.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
