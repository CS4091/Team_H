// components/GoogleMapClient.tsx
"use client";

import React, { useCallback, useMemo, useRef } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { DisabledByDefault } from "@mui/icons-material";

const containerStyle = {
  width: "100%",
  height: "100%",
};

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

export function GoogleMapClient() {
    const mapRef = useRef<GoogleMap>();
    const center = useMemo<LatLngLiteral>(() => ({ lat: 43, lng: -80}), []);
    const options = useMemo<MapOptions>(() => ({
        disbaleDefaultUI: true,
        clickableIcons: false,
    }), []);

    const onLoad = useCallback((map) => (mapRef.current = map), [])

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    });

    // do a loading spinnner instead
    if (loadError) return <div className='flex justify-center items-center'><h1>Error loading maps</h1></div>;
    if (!isLoaded) return <div className='flex justify-center items-center'><h1>Loading...</h1></div>;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            options={options}
        >
            <Marker position={center} />
        </GoogleMap>
    );
}
