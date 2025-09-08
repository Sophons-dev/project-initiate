import { University, Suggestion } from '../types/school-search';

const VALID_TYPES = ['school', 'university', 'college', 'kindergarten'];

export async function fetchSchoolSuggestions(search: string): Promise<Suggestion[]> {
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

    const data: University[] = await res.json();

    const filtered = data.filter(item => {
      const type = item.type?.toLowerCase();
      return type && VALID_TYPES.includes(type);
    });

    // Add custom input at the top
    const customInput: Suggestion = { display_name: search, isCustom: true };

    return [customInput, ...filtered];
  } catch (err) {
    console.error('Error fetching school suggestions:', err);
    return [{ display_name: search, isCustom: true }];
  }
}
