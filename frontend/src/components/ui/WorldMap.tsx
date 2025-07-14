'use client';

import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';

const geoUrl =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json';

const markers = [
  { name: 'India', coordinates: [78.9629, 20.5937], orders: 154 },
  { name: 'USA', coordinates: [-95.7129, 37.0902], orders: 79 },
  { name: 'UK', coordinates: [-3.4360, 55.3781], orders: 65 },
  { name: 'Canada', coordinates: [-106.3468, 56.1304], orders: 42 },
  { name: 'Australia', coordinates: [133.7751, -25.2744], orders: 33 },
];

export default function WorldMap() {
  return (
    <div className="bg-[#1e2f48] p-4 rounded-xl border border-blue-800 mt-8">
      <h2 className="text-blue-300 text-sm font-semibold mb-3">🌍 Order Locations</h2>
      <div className="w-full h-[500px]">
        <ComposableMap
          projectionConfig={{ scale: 140 }}
          style={{ width: '100%', height: '100%' }}
        >
          <ZoomableGroup>
            <Geographies geography={geoUrl}>
              {({ geographies }: { geographies: any[] }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: { fill: '#334155', stroke: '#475569', strokeWidth: 0.5 },
                      hover: { fill: '#1e3a8a', cursor: 'pointer' },
                    }}
                  />
                ))
              }
            </Geographies>

            {markers.map(({ name, coordinates, orders }) => (
              <Marker key={name} coordinates={coordinates}>
                <circle r={5} fill="#3b82f6" stroke="#fff" strokeWidth={1.5} />
                <text
                  textAnchor="middle"
                  y={-10}
                  style={{
                    fill: '#e0f2fe',
                    fontSize: 11,
                    fontWeight: 600,
                    fontFamily: 'Segoe UI',
                  }}
                >
                  {name} ({orders})
                </text>
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </div>
  );
}
