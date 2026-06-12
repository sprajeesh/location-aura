import { useState } from 'react';
import { Search } from 'lucide-react';
import { analyzeLocation } from '../services/api';
import type { AnalyzeResponse } from '../types';

interface Props {
  onData: (data: AnalyzeResponse) => void;
  loading: boolean;
  setLoading: (l: boolean) => void;
  data: AnalyzeResponse | null;
}

export default function SidebarContainer({ onData, loading, setLoading, data }: Props) {
  const [address, setAddress] = useState('');
  const [radius, setRadius] = useState('10');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return;
    setLoading(true);
    try {
      const res = await analyzeLocation(address, parseFloat(radius));
      onData(res);
    } catch (err) {
      console.error(err);
      alert('Error fetching location data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="panel h-full flex flex-col overflow-hidden">
      <div className="p-4 border-b border-border bg-primary-50">
        <h1 className="text-xl font-semibold text-primary-900 mb-4 flex items-center gap-2">
          Location Intelligence
        </h1>
        <form onSubmit={handleSearch} className="flex flex-col gap-3">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search address or location..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Search className="w-4 h-4 text-text-muted absolute left-3 top-3" />
          </div>
          <div className="flex gap-2">
            <select 
              className="flex-1 p-2 border border-border rounded-lg text-sm bg-surface"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
            >
              <option value="1">1 km</option>
              <option value="5">5 km</option>
              <option value="10">10 km</option>
              <option value="20">20 km</option>
            </select>
            <button 
              type="submit"
              disabled={loading}
              className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Analyze'}
            </button>
          </div>
        </form>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {!data && !loading && (
          <div className="h-full flex items-center justify-center text-text-muted text-sm text-center">
            Enter an address to discover nearby facilities and calculate location scores.
          </div>
        )}

        {data && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-3">Location Scores</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-surface-dim p-3 rounded-lg border border-border">
                  <div className="text-xs text-text-muted">Overall</div>
                  <div className="text-2xl font-bold text-primary-600">{data.score.overall}</div>
                </div>
                <div className="bg-surface-dim p-3 rounded-lg border border-border">
                  <div className="text-xs text-text-muted">Transport</div>
                  <div className="text-2xl font-bold text-primary-600">{data.score.transport}</div>
                </div>
                <div className="bg-surface-dim p-3 rounded-lg border border-border">
                  <div className="text-xs text-text-muted">Education</div>
                  <div className="text-2xl font-bold text-primary-600">{data.score.education}</div>
                </div>
                <div className="bg-surface-dim p-3 rounded-lg border border-border">
                  <div className="text-xs text-text-muted">Healthcare</div>
                  <div className="text-2xl font-bold text-primary-600">{data.score.healthcare}</div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-3">Nearby Facilities</h2>
              <div className="flex flex-col gap-2">
                {data.features.slice(0, 20).map((f, i) => (
                  <div key={i} className="p-3 border border-border rounded-lg flex justify-between items-center bg-surface hover:border-primary-500 transition-colors">
                    <div>
                      <div className="font-medium text-sm text-text-main">{f.name || 'Unnamed Facility'}</div>
                      <div className="text-xs text-text-muted capitalize">{f.category.replace('_', ' ')}</div>
                    </div>
                    <div className="text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                      {f.distanceKm.toFixed(1)} km
                    </div>
                  </div>
                ))}
                {data.features.length > 20 && (
                  <div className="text-xs text-center text-text-muted mt-2">
                    + {data.features.length - 20} more features
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
