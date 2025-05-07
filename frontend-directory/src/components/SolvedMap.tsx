'use client';

import React, { useCallback, useMemo, useRef } from 'react';
import { airportType } from '@/types';
import { GoogleMap, Marker, Polyline } from '@react-google-maps/api';
import { usePlaneHeading } from '@/hooks/usePlaneHeading';

const containerStyle = { width: '100%', height: '100%' };

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;



interface SolvedMapProps {
    airports: airportType[];
    tour: number[];
    currentStep: number;
    onMapLoad: (map: google.maps.Map) => void;  // new!
}

export default function RouteMap({
  airports,
  tour,
  currentStep,
  onMapLoad,
}: SolvedMapProps) {
  const mapRef = useRef<GoogleMap>();
  const center = useMemo<LatLngLiteral>(() => ({ lat: 43, lng: -80 }), []);
  const heading = usePlaneHeading(airports, tour, currentStep);
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
  const planeUrl = '/planeNoseUp.svg';

  const rotation = 45;

  const rawSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 248.25 249.84">
      <g transform="rotate(${rotation} 124.125 124.92)">
        <path id="path5724" d="M 247.51404,152.40266 139.05781,71.800946 c 0.80268,-12.451845 1.32473,-40.256266 0.85468,-45.417599 -3.94034,-43.266462 -31.23018,-24.6301193 -31.48335,-5.320367 -0.0693,5.281361 -1.01502,32.598388 -1.10471,50.836622 L 0.2842717,154.37562 0,180.19575 l 110.50058,-50.48239 3.99332,80.29163 -32.042567,22.93816 -0.203845,16.89693 42.271772,-11.59566 0.008,0.1395 42.71311,10.91879 -0.50929,-16.88213 -32.45374,-22.39903 2.61132,-80.35205 111.35995,48.50611 -0.73494,-25.77295 z" fill-rule="evenodd"/>
      </g>
    </svg>
  `;

  // 2) Data‑URI encode it
  const svgUrl =  
    `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(rawSvg)}`;

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
  // const planeHeading = useMemo(() => {
  //   if (!airports[currentNode] || tour.length < 2) return 0;
  //   const currIdx = tour[currentNode];
  //   // find next position in the tour (wrap around)
  //   const nextTourPos = tour[(currentNode + 1) % tour.length];
  //   const curr = airports[currIdx];
  //   const next = airports[nextTourPos];
  //   const dLat = next.lat  - curr.lat;
  //   const dLng = next.long - curr.long;
  //   // atan2(dx, dy) gives angle from north; convert to degrees
  //   return (Math.atan2(dLng, dLat) * 180) / Math.PI;
  // }, [airports, tour, currentNode]);


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
            options={{ strokeColor: '#711b4c', strokeOpacity: 0.8, strokeWeight: 2 }}
        />
        <Marker
            position={{
                lat: airports[tour[currentStep]].lat,
                lng: airports[tour[currentStep]].long
            }}
            icon={{
                path: "M 247.51404,152.40266 139.05781,71.800946 c 0.80268,-12.451845 1.32473,-40.256266 0.85468,-45.417599 -3.94034,-43.266462 -31.23018,-24.6301193 -31.48335,-5.320367 -0.0693,5.281361 -1.01502,32.598388 -1.10471,50.836622 L 0.2842717,154.37562 0,180.19575 l 110.50058,-50.48239 3.99332,80.29163 -32.042567,22.93816 -0.203845,16.89693 42.271772,-11.59566 0.008,0.1395 42.71311,10.91879 -0.50929,-16.88213 -32.45374,-22.39903 2.61132,-80.35205 111.35995,48.50611 -0.73494,-25.77295 z",
                scale: 0.125,            // tweak to ~32px
                rotation: heading,          // maps API spins it
                anchor: new google.maps.Point(16, 16),
                fillColor: "#000",
                fillOpacity: 1,
                strokeWeight: 0,
            }}
        />
    
      {/* Render each airport marker, swapping in the plane at currentNode */}
      {tour.map((airportIdx, tourPos) => {
        const { name, lat, long } = airports[airportIdx];
        // If this tour position is the current one, show plane
        // if (tourPos === currentStep) {
        //   return (
        //     // <Marker
        //     //   key={`plane-${airportIdx}${tourPos}`}
        //     //   position={{ lat, lng: long }}
        //     //   icon={{
        //     //     url: svgUrl,
        //     //     scaledSize: new window.google.maps.Size(32, 32),
        //     //     anchor: new window.google.maps.Point(16, 16),
        //     //   }}
        //     // />
        //   );
        // }

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
