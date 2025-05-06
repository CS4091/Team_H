// lib/genRouteThumbnail.ts
import polyline from '@mapbox/polyline';
import supabase from '@/api/supabaseClient';

export async function genRouteThumbnail(
  coords: [number, number][]
): Promise<string> {
  const MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!MAPS_KEY) {
    throw new Error('Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY');
  }

  const encoded = polyline.encode(coords);

  const [startLat, startLng] = coords[0];
  const params = new URLSearchParams({
    size:    '400x300',
    scale:   '2',
    maptype: 'roadmap',
    key:     MAPS_KEY,
    path:    `weight:4|color:0x711b4cff|enc:${encoded}`,
    markers: `color:0xf198c6ff|${startLat},${startLng}`,
  });

  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?${params}`;

  const res = await fetch(staticMapUrl);
  if (!res.ok) {
    throw new Error(`Google StaticMap failed: ${res.status} ${res.statusText}`);
  }
  const blob = await res.blob();

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

  const { data: { publicUrl } } = supabase.storage
    .from('images')
    .getPublicUrl(fileName);

  return publicUrl;
}
