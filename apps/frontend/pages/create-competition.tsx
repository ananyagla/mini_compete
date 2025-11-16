import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { api } from '../lib/api';

export default function CreateCompetition() {
  const router = useRouter();
  const [token, setToken] = useState<string>('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    capacity: 50,
    regDeadline: '',
  });

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      router.push('/auth/login');
      return;
    }
    setToken(storedToken);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      };
      await api.createCompetition(data, token);
      alert('Competition created!');
      router.push('/competitions');
    } catch (error) {
      alert('Error: ' + error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-secondary bg-surface">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-black">CREATE COMPETITION</h1>
            <a href="/" className="text-black hover:text-secondary transition-colors">← Back to Home</a>
          </div>
        </div>
      </nav>
      
      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">TITLE</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">DESCRIPTION</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                className="input h-24"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">TAGS (comma separated)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="input"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">CAPACITY</label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                  required
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">DEADLINE</label>
                <input
                  type="date"
                  value={formData.regDeadline}
                  onChange={(e) => setFormData({ ...formData, regDeadline: e.target.value })}
                  required
                  className="input"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-full mt-6">CREATE COMPETITION</button>
          </form>
        </div>
      </div>
    </div>
  );
}
