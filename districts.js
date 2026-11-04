// District translation + combined lookup
//
// Jackson County's real boundary GeoJSON files (county AND state) don't
// label polygons with a plain district number — each polygon's only
// property is the name of whoever currently (or most recently) held that
// seat. This file maps those names to human-readable district labels for
// all four layers: county individual, county at-large, state House, and
// state Senate.
//
// Confirmed against rosters as of Oct 2026. This WILL need updating after
// the Nov 3, 2026 election seats new officeholders, and again at every
// future election after that — the boundaries themselves don't move, but
// who currently holds each seat does. See state-legislators.js for the
// state House/Senate table and its vacant-seat caveats.

import { geocodeAddress } from "./geocode.js";
import { findDistrict } from "./district-lookup.js";
import { houseDistrictLabel, senateDistrictLabel } from "./state-legislators.js";

const INDIVIDUAL_DISTRICTS_FILE = "./boundaries/individual-districts.geojson";
const AT_LARGE_DISTRICTS_FILE = "./boundaries/at-large-districts.geojson";
const STATE_HOUSE_DISTRICTS_FILE = "./boundaries/state-house-districts.geojson";
const STATE_SENATE_DISTRICTS_FILE = "./boundaries/state-senate-districts.geojson";

const INDIVIDUAL_DISTRICT_NAME_PROPERTY = "name";
const AT_LARGE_DISTRICT_NAME_PROPERTY = "Name";
const STATE_HOUSE_NAME_PROPERTY = "Name";
const STATE_SENATE_NAME_PROPERTY = "Name";

const LEGISLATOR_TO_COUNTY_DISTRICT = {
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

function toCountyDistrictLabel(rawName) {
  if (!rawName) return null;
  return LEGISLATOR_TO_COUNTY_DISTRICT[rawName] ?? null;
}

/**
 * Full pipeline: address -> all four district labels + the matched address.
 * Throws if geocoding fails; returns nulls (not a throw) per layer if the
 * address geocodes fine but falls outside that particular boundary file
 * (e.g. outside the county, for the two county layers).
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
  const rawHouse = findDistrict(
    geo.lat,
    geo.lon,
    STATE_HOUSE_DISTRICTS_FILE,
    STATE_HOUSE_NAME_PROPERTY
  );
  const rawSenate = findDistrict(
    geo.lat,
    geo.lon,
    STATE_SENATE_DISTRICTS_FILE,
    STATE_SENATE_NAME_PROPERTY
  );

  return {
    individualDistrict: toCountyDistrictLabel(rawIndividual),
    atLargeDistrict: toCountyDistrictLabel(rawAtLarge),
    stateHouseDistrict: houseDistrictLabel(rawHouse),
    stateSenateDistrict: senateDistrictLabel(rawSenate),
    matchedAddress: geo.matchedAddress,
    lat: geo.lat,
    lon: geo.lon,
  };
}
