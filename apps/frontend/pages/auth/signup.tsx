import { useState } from 'react';
import { useRouter } from 'next/router';
import { api } from '../../lib/api';

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'participant',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await api.signup(formData);
      if (result.token) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        router.push('/');
      } else {
        alert('Signup failed: ' + (result.message || 'Unknown error'));
      }
    } catch (error) {
      alert('Error: ' + error);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="card">
          <h1 className="text-3xl font-bold mb-8 text-center">SIGNUP</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">NAME</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">EMAIL</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">PASSWORD</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">ROLE</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="input"
              >
                <option value="participant">Participant</option>
                <option value="organizer">Organizer</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-full mt-6">SIGNUP</button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-accent">
              Already have an account? <a href="/auth/login" className="text-black hover:underline">Login</a>
            </p>
            <a href="/" className="block mt-3 text-accent hover:text-black transition-colors">Back to Home</a>
          </div>
        </div>
      </div>
    </div>
  );
}
