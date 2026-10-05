// Step 2: Point-in-polygon district lookup
//
// Given coordinates and a GeoJSON FeatureCollection of district boundary
// polygons, finds which polygon contains that point and returns its raw
// property value (the current legislator's name — see districts.js for
// why, and the translation into a real district label).

import fs from "fs";
import * as turf from "@turf/turf";

function loadBoundaries(path) {
  const raw = fs.readFileSync(path, "utf-8");
  return JSON.parse(raw);
}

/**
 * Find which district polygon contains the given point.
 * @param {number} lat
 * @param {number} lon
 * @param {string} geojsonPath path to a district boundary GeoJSON file
 * @param {string} nameProperty the property key holding the name
 * @returns {string|null}
 */
export function findDistrict(lat, lon, geojsonPath, nameProperty) {
  const collection = loadBoundaries(geojsonPath);
  const point = turf.point([lon, lat]); // GeoJSON order is [lon, lat]

  for (const feature of collection.features) {
    if (turf.booleanPointInPolygon(point, feature)) {
      return feature.properties?.[nameProperty] ?? null;
    }
  }

  return null;
}
