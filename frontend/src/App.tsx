import { useState } from 'react'
import MapContainer from './containers/MapContainer'
import SidebarContainer from './containers/SidebarContainer'
import type { AnalyzeResponse } from './types'

function App() {
  const [data, setData] = useState<AnalyzeResponse | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="relative w-full h-screen flex">
      <div className="absolute inset-0 z-0">
        <MapContainer data={data} />
      </div>

      <div className="relative z-20 w-[400px] h-full p-4 pointer-events-none">
        <div className="pointer-events-auto h-full flex flex-col gap-4">
           <SidebarContainer onData={setData} loading={loading} setLoading={setLoading} data={data} />
        </div>
      </div>
    </div>
  )
}

export default App
