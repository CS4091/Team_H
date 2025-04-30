'use client';

import React, { useCallback, useMemo, useRef } from 'react';
import { airportType } from '@/types';
import { GoogleMap, Marker, Polyline } from '@react-google-maps/api';

const containerStyle = { width: '100%', height: '100%' };

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;



interface SolvedMapProps {
    airports: airportType[];
    tour: number[];
    currentNode: number;
    onMapLoad: (map: google.maps.Map) => void;  // new!
}

export default function RouteMap({
  airports,
  tour,
  currentNode,
  onMapLoad,
}: SolvedMapProps) {
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

  const nodeIconUrl = '/airportNode.svg';
  const startIconUrl = '/startAirportNode.svg';
  const planeUrl     = '/planeNoseUp.svg';

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    onMapLoad(map);               // tell the parent about it
  }, [onMapLoad]);


  // Build the polyline path from the tour indices
  const pathCoords = useMemo<LatLngLiteral[]>(() => {
    const coords = tour.map((idx) => {
      const { lat, long } = airports[idx];
      return { lat, lng: long };
    });
    // close the loop
    if (coords.length > 0) coords.push(coords[0]);
    return coords;
  }, [tour, airports]);

  // Compute rotation angle (degrees) for the plane icon
  const planeHeading = useMemo(() => {
    if (!airports[currentNode] || tour.length < 2) return 0;
    const currIdx = tour[currentNode];
    // find next position in the tour (wrap around)
    const nextTourPos = tour[(currentNode + 1) % tour.length];
    const curr = airports[currIdx];
    const next = airports[nextTourPos];
    const dLat = next.lat  - curr.lat;
    const dLng = next.long - curr.long;
    // atan2(dx, dy) gives angle from north; convert to degrees
    return (Math.atan2(dLng, dLat) * 180) / Math.PI;
  }, [airports, tour, currentNode]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={3}
      options={options}
      onLoad={onLoad}
    >
      {/* Draw the route line */}
      <Polyline
        path={pathCoords}
        options={{ strokeColor: '#FF0000', strokeOpacity: 0.8, strokeWeight: 2 }}
      />

      {/* Render each airport marker, swapping in the plane at currentNode */}
      {tour.map((airportIdx, tourPos) => {
        const { name, lat, long } = airports[airportIdx];
        // If this tour position is the current one, show plane
        if (tourPos === currentNode) {
          return (
            <Marker
              key={`plane-${airportIdx}${tourPos}`}
              position={{ lat, lng: long }}
              icon={{
                url: planeUrl,
                scaledSize: new window.google.maps.Size(32, 32),
                anchor: new window.google.maps.Point(16, 16),
                // rotation is only supported on Symbol, but many browsers honor it here:
                rotation: planeHeading,
              }}
            />
          );
        }

        // otherwise, if it's the starting airport, use your start icon
        // if (tourPos === 0) {
        //   return (
        //     <Marker
        //       key={`start-${airportIdx}`}
        //       position={{ lat, lng: long }}
        //       title={name}
        //       icon={{
        //         url: startIconUrl,
        //         scaledSize: new window.google.maps.Size(32, 32),
        //         anchor: new window.google.maps.Point(16, 32),
        //       }}
        //     />
        //   );
        // }

        // all other nodes get the default airport icon
        return (
          <Marker
            key={`node-${airportIdx}${tourPos}`}
            position={{ lat, lng: long }}
            title={name}
            icon={{
              url: nodeIconUrl,
              scaledSize: new window.google.maps.Size(32, 32),
              anchor: new window.google.maps.Point(16, 32),
            }}
          />
        );
      })}
    </GoogleMap>
  );
}
