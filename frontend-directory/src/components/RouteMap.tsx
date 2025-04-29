// components/GoogleMapClient.tsx
"use client";

import React, { useCallback, useMemo, useRef } from "react";
import { airportType } from "@/types";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { DisabledByDefault } from "@mui/icons-material";

const containerStyle = {
  width: "100%",
  height: "100%",
};

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

interface RouteMapProps {
    airports: airportType[];
};

export default function RouteMap({ airports }: RouteMapProps ) {
    const mapRef = useRef<GoogleMap>();
    const center = useMemo<LatLngLiteral>(() => ({ lat: 43, lng: -80}), []);
    const options = useMemo<MapOptions>(() => ({
        mapId: "ce7c5f352b0bc4fa",
        mode: "dark",
        disableDefaultUI: true,
        clickableIcons: false,
    }), []);

    const svgUrl = '/airportNode.svg';
    

    const onLoad = useCallback((map) => {
        mapRef.current = map;
        
        // Set the map to use dark mode explicitly
        if (map) {
            // Apply dark mode using the correct method
            map.setOptions({
                mapId: "ce7c5f352b0bc4fa"
            });
        }
    }, []);


    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        mapIds: ["ce7c5f352b0bc4fa"]
    });

    // do a loading spinnner instead
    if (loadError) return <div className='flex justify-center items-center'><h1>Error loading maps</h1></div>;
    if (!isLoaded) return <div className='flex justify-center items-center'><h1>Loading...</h1></div>;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={3}
            options={options}
        >
            {airports.map(({ name, lat, long }) => (
                <Marker
                    key={name}
                    position={{ lat, lng: long }}
                    title={name}
                    icon={{
                        url: svgUrl,                            // path to your SVG
                        scaledSize: new window.google.maps.Size(32, 32), // pixel size you want it drawn
                        anchor:   new window.google.maps.Point(16, 32)   // anchor so the “tip” sits on the lat/lng
                    }}
                />
            ))}
        </GoogleMap>
    );
}
