'use client';

import React, { useCallback, useMemo, useRef } from 'react';
import { airportType } from '@/types';
import { GoogleMap, Marker, Polyline } from '@react-google-maps/api';

const containerStyle = { width: '100%', height: '100%' };

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

interface RouteMapProps {
  airports: airportType[];
  tour: number[];
  currentNode: number;
}

export default function RouteMap({ airports, tour, currentNode }: RouteMapProps) {
  const mapRef = useRef<GoogleMap>();
  const center = useMemo<LatLngLiteral>(() => ({ lat: 43, lng: -80 }), []);
  const options = useMemo<MapOptions>(
    () => ({
      mapId: 'ce7c5f352b0bc4fa',
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  const svgUrl = '/airportNode.svg';
  const startSvgUrl = '/startAirportNode.svg';

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  // Build the polyline path from the tour indices
  const pathCoords = useMemo<LatLngLiteral[]>(() => {
    const coords = tour.map((idx) => {
      const { lat, long } = airports[idx];
      return { lat, lng: long };
    });
    // Ensure the path is a closed loop
    if (coords.length > 0) {
      const first = coords[0];
      const last = coords[coords.length - 1];
      if (first.lat !== last.lat || first.lng !== last.lng) {
        coords.push(first);
      }
    }
    return coords;
  }, [tour, airports]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={3}
      options={options}
      onLoad={onLoad}
    >
      {airports.map(({ name, lat, long }, idx) => (
        <Marker
          key={`${name}-${idx}`}
          position={{ lat, lng: long }}
          title={name}
          icon={{
            url: idx === 0 ? startSvgUrl : svgUrl,
            scaledSize: new window.google.maps.Size(32, 32),
            anchor: new window.google.maps.Point(16, 32),
          }}
        />
      ))}

      <Polyline
        path={pathCoords}
        options={{
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
        }}
      />
    </GoogleMap>
  );
}
