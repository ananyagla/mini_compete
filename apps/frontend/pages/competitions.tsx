import { useState, useEffect } from 'react';
import { api } from '../lib/api';

export default function Competitions() {
  const [competitions, setCompetitions] = useState<any[]>([]);
  const [token, setToken] = useState<string>('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    loadCompetitions();
  }, []);

  const loadCompetitions = async () => {
    const data = await api.getCompetitions();
    setCompetitions(data);
  };

  const handleRegister = async (competitionId: string) => {
    if (!token) {
      alert('Please login first');
      return;
    }
    try {
      const idempotencyKey = `reg-${Date.now()}-${Math.random()}`;
      await api.register(competitionId, token, idempotencyKey);
      alert('Registration successful!');
      loadCompetitions();
    } catch (error) {
      alert('Registration failed: ' + error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-secondary bg-surface">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-black">COMPETITIONS</h1>
            <a href="/" className="text-black hover:text-secondary transition-colors">← Back to Home</a>
          </div>
        </div>
      </nav>
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 gap-4">
          {competitions.map((comp) => (
            <div key={comp.id} className="card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">{comp.title}</h3>
                  <p className="text-accent mb-3">{comp.description}</p>
                </div>
                {user?.role === 'participant' && (
                  <button onClick={() => handleRegister(comp.id)} className="btn btn-primary">REGISTER</button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-accent">TAGS:</span> {comp.tags.join(', ')}
                </div>
                <div>
                  <span className="text-accent">CAPACITY:</span> {comp.capacity} | <span className="text-accent">SEATS LEFT:</span> {comp.seatsLeft}
                </div>
                <div>
                  <span className="text-accent">DEADLINE:</span> {new Date(comp.regDeadline).toLocaleDateString()}
                </div>
                <div>
                  <span className="text-accent">ORGANIZER:</span> {comp.organizer.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
