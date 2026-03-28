import React from 'react';
import { createRoot } from 'react-dom/client';
import RiskMapPage from './components/map/RiskMapPage';

const container = document.getElementById('map-root');
if (container) {
  const root = createRoot(container);
  root.render(<RiskMapPage />);
}
