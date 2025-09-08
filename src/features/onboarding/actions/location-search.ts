import { Suggestion, University as Location } from '../types/school-search';

export async function fetchLocationSuggestions(search: string): Promise<Suggestion[]> {
  if (!search.trim()) return [];

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(search)}&limit=20&extratags=1`,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const data: Location[] = await res.json();

    return data;
  } catch (err) {
    console.error('Error fetching location suggestions:', err);
    return [{ display_name: search, isCustom: true }];
  }
}
