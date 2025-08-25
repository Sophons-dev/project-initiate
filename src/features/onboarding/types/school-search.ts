export type University = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  extratags: {
    website?: string;
    wikidata?: string;
    wikipedia?: string;
    previously?: string;
    [key: string]: string | undefined; // in case there are additional keys
  };
  boundingbox: [string, string, string, string];
};

export type Suggestion = University | { display_name: string; isCustom: true };
