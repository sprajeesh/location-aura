import axios from 'axios';
import type { AnalyzeResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const analyzeLocation = async (address: string, radiusKm: number, categories: string[] = []): Promise<AnalyzeResponse> => {
  const response = await axios.post(`${API_URL}/location/analyze`, {
    address,
    radiusKm,
    categories
  });
  return response.data;
};
