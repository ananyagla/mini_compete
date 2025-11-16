import { useState, useEffect } from 'react';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken('');
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-secondary bg-surface">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-black">MINI COMPETE</h1>
            {user && (
              <div className="flex items-center gap-6">
                <a href="/competitions" className="text-black hover:text-secondary transition-colors">Competitions</a>
                {user.role === 'organizer' && <a href="/create-competition" className="text-black hover:text-secondary transition-colors">Create</a>}
                {user.role === 'participant' && <a href="/my-registrations" className="text-black hover:text-secondary transition-colors">My Registrations</a>}
                <a href="/mailbox" className="text-black hover:text-secondary transition-colors">Mailbox</a>
                <button onClick={logout} className="btn btn-outline">Logout</button>
              </div>
            )}
          </div>
        </div>
      </nav>
      
      <div className="max-w-7xl mx-auto px-6 py-16">
        {!user ? (
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Competition Management System</h2>
            <p className="text-accent text-lg mb-8">Create, manage, and participate in competitions</p>
            <div className="flex gap-4 justify-center">
              <a href="/auth/login" className="btn btn-primary">Login</a>
              <a href="/auth/signup" className="btn btn-outline">Signup</a>
            </div>
          </div>
        ) : (
          <div>
            <div className="card mb-8">
              <h2 className="text-2xl font-bold mb-2">Welcome, {user.name}</h2>
              <p className="text-accent uppercase text-sm">{user.role}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="/competitions" className="card-hover">
                <h3 className="font-bold text-lg mb-2">View Competitions</h3>
                <p className="text-accent">Browse all available competitions</p>
              </a>
              {user.role === 'organizer' && (
                <a href="/create-competition" className="card-hover">
                  <h3 className="font-bold text-lg mb-2">Create Competition</h3>
                  <p className="text-accent">Start a new competition</p>
                </a>
              )}
              {user.role === 'participant' && (
                <a href="/my-registrations" className="card-hover">
                  <h3 className="font-bold text-lg mb-2">My Registrations</h3>
                  <p className="text-accent">View your registered competitions</p>
                </a>
              )}
              <a href="/mailbox" className="card-hover">
                <h3 className="font-bold text-lg mb-2">Mailbox</h3>
                <p className="text-accent">Check your notifications</p>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
