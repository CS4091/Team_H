// components/GoogleMapClient.tsx
'use client';

import React, { useCallback, useMemo, useRef } from 'react';
import { airportType } from '@/types';
import { GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = { width: '100%', height: '100%' };

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

interface RouteMapProps {
  airports: airportType[];
}

export default function RouteMap({ airports }: RouteMapProps) {
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
          key={name}
          position={{ lat, lng: long }}
          title={name}
          icon={{
            url: idx === 0 ? startSvgUrl : svgUrl,
            scaledSize: new window.google.maps.Size(32, 32),
            anchor: new window.google.maps.Point(16, 32),
          }}
        />
      ))}
    </GoogleMap>
  );
}
