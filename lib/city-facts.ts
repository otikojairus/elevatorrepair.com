export type CityFacts = {
  population: string;
  climate: string;
  neighbourhood: string;
  landmark: string;
};

/** Location-specific facts for city pSEO pages (min 2 per page in copy). */
export const CITY_FACTS: Record<string, CityFacts> = {
  "elevator-repair-mont-tremblant": {
    population: "roughly 10,000 residents in the municipality, swelling with resort visitors",
    climate: "long, snowy winters and busy ski seasons that stress heating and door seals",
    neighbourhood: "hotels and condos near Mont-Tremblant Resort and the pedestrian village",
    landmark: "the gondola base and Tremblant ski slopes",
  },
  "elevator-repair-lachute": {
    population: "about 13,000 people in the Laurentides regional county",
    climate: "cold winters along the Ottawa River valley with freeze-thaw cycles",
    neighbourhood: "downtown Rue Principale and industrial pockets along Highway 50",
    landmark: "the Ottawa River waterfront and Route 327 corridor",
  },
  "elevator-repair-toronto": {
    population: "nearly 2.8 million in the city proper, far more in the GTA",
    climate: "humid summers and icy winters that affect machine-room ventilation",
    neighbourhood: "Financial District towers, mid-rise residential in North York and Scarborough",
    landmark: "the CN Tower and Union Station transit hub",
  },
  "elevator-repair-calgary": {
    population: "about 1.3 million in Calgary",
    climate: "dry chinook winters and hail-prone summers",
    neighbourhood: "downtown Beltline offices and suburban business parks in the northeast",
    landmark: "the Calgary Tower and Stampede grounds",
  },
  "elevator-repair-winnipeg": {
    population: "over 750,000 in the capital region",
    climate: "deep prairie cold and spring flooding risk in low-lying sites",
    neighbourhood: "Exchange District heritage buildings and Portage Avenue high-rises",
    landmark: "The Forks and the Manitoba Legislative Building",
  },
  "elevator-repair-edmonton": {
    population: "about 1 million in Edmonton",
    climate: "extreme winter lows and rapid spring warm-ups",
    neighbourhood: "Ice District arenas, Whyte Avenue mixed-use, and west-end medical towers",
    landmark: "Rogers Place and the North Saskatchewan River valley",
  },
  "elevator-repair-ottawa": {
    population: "roughly 1 million in Ottawa",
    climate: "cold, snowy winters and hot, humid summers across the National Capital Region",
    neighbourhood: "Centretown condos, Kanata tech campuses, and Gatineau-facing properties",
    landmark: "Parliament Hill and the Rideau Canal",
  },
  "elevator-repair-montreal": {
    population: "about 1.8 million on the island of Montreal",
    climate: "heavy snowfall, freeze-thaw, and humid summers",
    neighbourhood: "downtown Ville-Marie, Griffintown conversions, and Plateau walk-ups with modernizations",
    landmark: "Mount Royal and Old Montreal",
  },
  "elevator-repair-laval": {
    population: "over 450,000 on Île Jésus",
    climate: "similar to Montreal island with river-influenced humidity",
    neighbourhood: "Centropolis, Carrefour Laval retail, and hospital campuses",
    landmark: "the Rivière des Mille Îles shoreline",
  },
  "elevator-repair-hamilton": {
    population: "about 580,000 in Hamilton",
    climate: "lake-effect snow off Lake Ontario and warm waterfront summers",
    neighbourhood: "the Niagara Escarpment brow buildings and Hamilton General Hospital area",
    landmark: "the HMCS Haida waterfront and McMaster University district",
  },
  "elevator-repair-st-catharines": {
    population: "roughly 140,000 in St. Catharines",
    climate: "moderated by Lake Ontario with wet springs",
    neighbourhood: "downtown St. Paul Street corridors and Niagara District Court House precinct",
    landmark: "the Welland Canal locks nearby",
  },
  "elevator-repair-markham": {
    population: "over 350,000 in Markham",
    climate: "hot summers and snowy winters typical of the Greater Toronto Area",
    neighbourhood: "Markham Centre high-rises and Pacific Mall commercial plazas",
    landmark: "Main Street Unionville heritage district",
  },
  "elevator-repair-north-york": {
    population: "about 670,000 in the North York district",
    climate: "GTA freeze-thaw with urban heat-island effects",
    neighbourhood: "Yonge–Sheppard and Yonge–Finch condo clusters",
    landmark: "Mel Lastman Square and North York Civic Centre",
  },
  "elevator-repair-london-ontario": {
    population: "about 420,000 in London",
    climate: "snowbelt winters and thunderstorm summers",
    neighbourhood: "Victoria Hospital campus and downtown Dundas Place",
    landmark: "the Thames River forks downtown",
  },
  "elevator-repair-surrey-bc": {
    population: "over 600,000 in Surrey",
    climate: "mild, wet winters and dry summers in the Lower Mainland",
    neighbourhood: "City Centre towers and Guildford commercial strips",
    landmark: "Central City and Holland Park",
  },
  "elevator-repair-mississauga": {
    population: "about 720,000 in Mississauga",
    climate: "lake-effect weather near Lake Ontario",
    neighbourhood: "Square One core and Airport Corporate Centre",
    landmark: "Celebration Square and Toronto Pearson proximity",
  },
  "elevator-repair-halifax": {
    population: "about 480,000 in the Halifax regional municipality",
    climate: "fog, salt air, and nor’easter storms",
    neighbourhood: "downtown Barrington Street and Dalhousie University buildings",
    landmark: "the Halifax Citadel and waterfront boardwalk",
  },
  "elevator-repair-regina": {
    population: "about 240,000 in Regina",
    climate: "dry, cold winters and windy prairie summers",
    neighbourhood: "downtown Scarth Street and Wascana medical precinct",
    landmark: "Wascana Centre and the Saskatchewan Legislative Building",
  },
  "elevator-repair-vancouver": {
    population: "about 680,000 in Vancouver",
    climate: "mild, rainy winters and increasingly hot summer smoke events",
    neighbourhood: "Coal Harbour towers, Broadway corridor, and False Creek mid-rises",
    landmark: "Canada Place and Stanley Park",
  },
  "elevator-repair-vaughan": {
    population: "over 320,000 in Vaughan",
    climate: "GTA winters with suburban expansion heat loads",
    neighbourhood: "Vaughan Metropolitan Centre and Canada’s Wonderland area hotels",
    landmark: "the VMC subway terminus",
  },
  "elevator-repair-etobicoke": {
    population: "about 365,000 in Etobicoke",
    climate: "Lake Ontario moderated but icy lakefront winds",
    neighbourhood: "Humber Bay Shores condos and Sherway Gardens retail",
    landmark: "Mimico waterfront and Islington Village",
  },
  "elevator-repair-barrie": {
    population: "about 160,000 in Barrie",
    climate: "heavy snow off Georgian Bay and busy summer tourism",
    neighbourhood: "downtown Dunlop Street and Royal Victoria Regional Health Centre",
    landmark: "Kempenfelt Bay waterfront",
  },
  "elevator-repair-woodbridge": {
    population: "about 110,000 in the Woodbridge community within Vaughan",
    climate: "typical Greater Toronto Area seasonal swings",
    neighbourhood: "Highway 7 commercial corridors and residential cul-de-sac estates with home lifts",
    landmark: "Boyd Conservation Area gateway",
  },
  "elevator-repair-thornhill": {
    population: "roughly 110,000 split between Vaughan and Markham",
    climate: "GTA humidity and winter road-salt tracked into lobby pits",
    neighbourhood: "Promenade Mall vicinity and Yonge Street mid-rise apartments",
    landmark: "Thornhill Village heritage core",
  },
  "elevator-repair-abbotsford": {
    population: "about 160,000 in the Fraser Valley",
    climate: "wet valley winters and warm, dry summers",
    neighbourhood: "Abbotsford International Airport industrial and hospital district",
    landmark: "Mount Baker views along South Fraser Way",
  },
};
