import { useMemo } from 'react';
import type { airportType } from '@/types';

export function usePlaneHeading(
  airports: airportType[],
  tour: number[],
  currentStep: number
): number {
  return useMemo(() => {
    if (tour.length < 2 || !google.maps.geometry) return 0;

    // grab your two airport coords
    const currIdx = tour[currentStep];
    const nextIdx = tour[(currentStep + 1) % tour.length];
    const curr = airports[currIdx];
    const next = airports[nextIdx];

    // build LatLng objects
    const from = new google.maps.LatLng(curr.lat, curr.long);
    const to   = new google.maps.LatLng(next.lat, next.long);

    // returns heading in degrees clockwise from north
    return google.maps.geometry.spherical.computeHeading(from, to);
  }, [airports, tour, currentStep]);
}
