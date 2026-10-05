// District translation + combined lookup
//
// Jackson County's real boundary GeoJSON files don't label polygons as
// "1st District" — each polygon's only property is the CURRENT sitting
// legislator's name (confirmed by inspecting the actual files). This maps
// that name to a human-readable district label.
//
// Confirmed against the 2022-2026 term roster as of Aug 2026. This WILL
// need updating after the Nov 3, 2026 election seats new legislators, and
// again at every future election after that — the boundaries themselves
// don't move, but who currently holds each seat does.

import { geocodeAddress } from "./geocode.js";
import { findDistrict } from "./district-lookup.js";

const INDIVIDUAL_DISTRICTS_FILE = "./boundaries/individual-districts.geojson";
const AT_LARGE_DISTRICTS_FILE = "./boundaries/at-large-districts.geojson";
const INDIVIDUAL_DISTRICT_NAME_PROPERTY = "name";
const AT_LARGE_DISTRICT_NAME_PROPERTY = "Name";

const LEGISLATOR_TO_DISTRICT = {
  "Manny Abarca IV": "1st District",
  "Manuel Abarca IV": "1st District",
  "Venessa Huskey": "2nd District",
  "Charlie Franklin": "3rd District",
  "DaRon McGee": "4th District",
  "Jeanie Lauer": "5th District",
  "Sean Smith": "6th District",
  "Jalen Anderson": "1st At-Large",
  "Donna Peyton": "2nd At-Large",
  "Megan Marshall": "3rd At-Large",
  "Megan L. Marshall": "3rd At-Large",
};

function toDistrictLabel(rawName) {
  if (!rawName) return null;
  return LEGISLATOR_TO_DISTRICT[rawName] ?? null;
}

/**
 * Full pipeline: address -> { individualDistrict, atLargeDistrict, matchedAddress }
 * Throws if geocoding fails; returns nulls (not a throw) if the address
 * geocodes fine but falls outside both boundary files (e.g. outside the
 * county).
 */
export async function lookupDistrictsForAddress(address) {
  const geo = await geocodeAddress(address);

  const rawIndividual = findDistrict(
    geo.lat,
    geo.lon,
    INDIVIDUAL_DISTRICTS_FILE,
    INDIVIDUAL_DISTRICT_NAME_PROPERTY
  );
  const rawAtLarge = findDistrict(
    geo.lat,
    geo.lon,
    AT_LARGE_DISTRICTS_FILE,
    AT_LARGE_DISTRICT_NAME_PROPERTY
  );

  return {
    individualDistrict: toDistrictLabel(rawIndividual),
    atLargeDistrict: toDistrictLabel(rawAtLarge),
    matchedAddress: geo.matchedAddress,
    lat: geo.lat,
    lon: geo.lon,
  };
}
