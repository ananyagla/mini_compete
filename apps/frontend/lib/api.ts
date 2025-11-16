const API_URL = 'http://localhost:3002/api';

export const api = {
  async signup(data: any) {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async login(data: any) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async getCompetitions() {
    const res = await fetch(`${API_URL}/competitions`);
    return res.json();
  },

  async createCompetition(data: any, token: string) {
    const res = await fetch(`${API_URL}/competitions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async register(competitionId: string, token: string, idempotencyKey?: string) {
    const headers: any = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    if (idempotencyKey) {
      headers['idempotency-key'] = idempotencyKey;
    }
    const res = await fetch(`${API_URL}/competitions/${competitionId}/register`, {
      method: 'POST',
      headers,
      body: JSON.stringify({}),
    });
    return res.json();
  },

  async getMyRegistrations(token: string) {
    const res = await fetch(`${API_URL}/competitions/my-registrations`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },

  async getMailbox(token: string) {
    const res = await fetch(`${API_URL}/competitions/mailbox`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  },
};
