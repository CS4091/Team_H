// lib/genRouteThumbnail.ts
import polyline from '@mapbox/polyline';
import supabase from '@/api/supabaseClient';

export async function genRouteThumbnail(
  latitudes: number[],
  longitudes: number[]
): Promise<string> {
  // 1) grab your public Maps key
  const MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!MAPS_KEY) {
    throw new Error('Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY');
  }

  // 2) build [ [lat, lng], … ] array
  const coords: [number, number][] = latitudes.map((lat, i) => [
    lat,
    longitudes[i],
  ]);

  // 2a) close the loop by appending the first point at the end
  if (coords.length > 0) {
    coords.push(coords[0]);
  }

  // 3) encode as polyline
  const encoded = polyline.encode(coords);

  // 4) construct Static Maps URL, including a marker at the start
  const [startLat, startLng] = coords[0];
  const params = new URLSearchParams({
    size:    '400x300',
    scale:   '2',
    maptype: 'roadmap',
    key:     MAPS_KEY,
    // draw the route
    path:    `weight:4|color:0xff0000ff|enc:${encoded}`,
    // place a standard red marker at the first coordinate
    markers: `color:red|${startLat},${startLng}`,
  });

  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?${params}`;

  // 5) fetch the image as a blob
  const res = await fetch(staticMapUrl);
  if (!res.ok) {
    throw new Error(`Google StaticMap failed: ${res.status} ${res.statusText}`);
  }
  const blob = await res.blob();

  // 6) upload to Supabase storage
  const fileName = `route_thumbnail_${Date.now()}.png`;
  const { error: uploadError } = await supabase.storage
    .from('images')
    .upload(fileName, blob, {
      cacheControl: '3600',
      upsert: true,
    });
  if (uploadError) {
    throw uploadError;
  }

  // 7) get publicly accessible URL
  const { data: { publicUrl } } = supabase.storage
    .from('images')
    .getPublicUrl(fileName);

  return publicUrl;
}
