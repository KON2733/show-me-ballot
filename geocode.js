// Step 1: Geocoding
//
// Turns a street address into latitude/longitude using the U.S. Census
// Bureau's free, keyless geocoder. No API key or billing required.
//
// Docs: https://geocoding.geo.census.gov/geocoder/Geocoding_Services_API.html
//
// This only needs to run on YOUR machine (or wherever this server is
// actually hosted) — it will not work inside a Claude artifact preview,
// because those pages are sandboxed and can't make outbound network calls
// to arbitrary hosts. A normal Node process like this one has no such
// restriction.

import fetch from "node-fetch";

const CENSUS_GEOCODER_URL =
  "https://geocoding.geo.census.gov/geocoder/locations/onelineaddress";

/**
 * Geocode a single-line address to coordinates.
 * @param {string} address e.g. "8640 Holmes Rd, Kansas City, MO 64131"
 * @returns {Promise<{ lat: number, lon: number, matchedAddress: string }>}
 */
export async function geocodeAddress(address) {
  const url = new URL(CENSUS_GEOCODER_URL);
  url.searchParams.set("address", address);
  url.searchParams.set("benchmark", "Public_AR_Current");
  url.searchParams.set("format", "json");

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(
      `Census geocoder request failed: ${res.status} ${res.statusText}`
    );
  }

  const data = await res.json();
  const matches = data?.result?.addressMatches ?? [];

  if (matches.length === 0) {
    throw new Error(
      `No geocoding match found for "${address}". Try including the ZIP code, ` +
        `or double-check the street name and number.`
    );
  }

  // The Census geocoder can return multiple candidate matches for an
  // ambiguous address. We take the first (best-ranked) one.
  const best = matches[0];

  return {
    lat: best.coordinates.y,
    lon: best.coordinates.x,
    matchedAddress: best.matchedAddress,
  };
}
