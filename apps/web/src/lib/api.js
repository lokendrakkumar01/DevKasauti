import axios from 'axios';

const requestedBase = import.meta.env.VITE_API_BASE_URL?.trim();
const defaultBase = import.meta.env.PROD
  ? 'https://devkasauti.onrender.com/api'
  : 'http://localhost:4000/api';
const isLocalOverride = import.meta.env.PROD
  && (requestedBase?.includes('localhost') || requestedBase?.includes('127.0.0.1'));
const configuredBase = (requestedBase && !isLocalOverride ? requestedBase : defaultBase).replace(/\\/+$/, '');
// Render se host-only URL aata hai; API routes hamesha /api ke neeche hain.
const apiBase = configuredBase.endsWith('/api') ? configuredBase : `${configuredBase}/api`;

export const api = axios.create({
  baseURL: apiBase,
  timeout: 8000,
});
