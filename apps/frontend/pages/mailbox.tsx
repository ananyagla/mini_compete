import { useState, useEffect } from 'react';
import { api } from '../lib/api';

export default function Mailbox() {
  const [emails, setEmails] = useState<any[]>([]);
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      loadMailbox(storedToken);
    }
  }, []);

  const loadMailbox = async (token: string) => {
    const data = await api.getMailbox(token);
    setEmails(data);
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-secondary bg-surface">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-black">MAILBOX</h1>
            <a href="/" className="text-black hover:text-secondary transition-colors">← Back to Home</a>
          </div>
        </div>
      </nav>
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {emails.length === 0 ? (
          <div className="card text-center text-accent">No emails yet</div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {emails.map((email) => (
              <div key={email.id} className="card">
                <div className="mb-3">
                  <span className="text-accent text-sm">TO:</span> <span className="text-sm">{email.to}</span>
                </div>
                <h3 className="text-lg font-bold mb-2">{email.subject}</h3>
                <p className="text-accent mb-3">{email.body}</p>
                <div className="text-sm text-accent">
                  SENT: {new Date(email.sentAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
