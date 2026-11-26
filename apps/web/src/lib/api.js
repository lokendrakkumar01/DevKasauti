import axios from 'axios';

const configuredBase = (import.meta.env.VITE_API_BASE_URL ?? (import.meta.env.PROD ? 'https://devkasauti.onrender.com/api' : 'http://localhost:4000/api')).replace(/\/+$/, '');
// Render se host-only URL aata hai; API routes hamesha /api ke neeche hain.
const apiBase = configuredBase.endsWith('/api') ? configuredBase : `${configuredBase}/api`;

export const api = axios.create({
  baseURL: apiBase,
  timeout: 8000,
});
