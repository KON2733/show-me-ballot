// State legislator name -> district number translation
//
// Same situation as the county boundary files: Missouri's official GIS
// portal (gis.mo.gov) only labels each House/Senate district polygon with
// its CURRENT (or most-recently-known) officeholder's name — not a
// district number. This file translates that name into the actual
// district number.
//
// Built by cross-checking every name in the two boundary files against
// the official current roster (house.mo.gov / senate.mo.gov, verified via
// Wikipedia's member tables as of Oct 2026) and researching every name
// that didn't match.
//
// IMPORTANT CAVEAT discovered during that research: five seats in the
// boundary files (House 110, 114, 149, 160; Senate 10) are listed under
// the name of whoever last held that seat before resigning, dying in
// office, or leaving for another job — the state's GIS data was not
// refreshed after those vacancies opened. Those seats show as "VACANT —
// as of a prior officeholder" below; double-check who currently holds
// them (or who's running for them this Nov 3) before using them in the
// app, since this will need updating as those seats are filled.
//
// This table needs re-verifying after the Nov 3, 2026 election seats
// winners, same as the county legislator table.

export const HOUSE_DISTRICT_BY_NAME = {
  "Jeff Farnan": 1, "Mazzie Christensen": 2, "Danny Busick": 3, "Greg Sharpe": 4,
  "Louis Riggs": 5, "Ed Lewis": 6, "Peggy McGaugh": 7, "Josh Hurlbert": 8,
  "Dean Van Schoiack": 9, "Bill Falkner": 10, "Brenda Shields": 11, "Mike Jones": 12,
  "Sean Pouche": 13, "Ashley Aune": 14, "Ken Jamison": 15, "Chris Brown": 16,
  "Bill Allen": 17, "Eric Woods": 18, "Wick Thomas": 19, "Mike Steinmeyer": 20,
  "Will Jobe": 21, "Yolanda Young": 22, "Michael Johnson": 23, "Emily Weber": 24,
  "Pattie Mansur": 25, "Tiffany Price": 26, "Melissa Douglas": 27, "Donna Barnes": 28,
  "Aaron Crossley": 29, "Jonathan Patterson": 30, "Ron Fowler": 31, "Jeff Coleman": 32,
  "Carolyn Caton": 33, "Kemp Strickler": 34, "Keri Ingle": 35, "Anthony Ealy": 36,
  "Mark Sharp": 37, "Martin Jacobs": 38, "Mark Meirath": 39, "Chad Perkins": 40,
  "Doyle Justus": 41, "Jeff Myers": 42, "Kent Haden": 43, "John Martin": 44,
  "Kathy Steinhoff": 45,
  "David Smith": 46, "David Tyson Smith": 46, // same person, full middle name in GIS data
  "Adrian Plank": 47, "Tim Taylor": 48, "Jim Schulte": 49, "Gregg Bush": 50,
  "Mark Nolte": 51, "Brad Pollitt": 52, "Terry Thompson": 53, "Brandon Phelps": 54,
  "Bill Irwin": 55, "Michael Davis": 56, "Rodger Reedy": 57, "Willard Haley": 58,
  "Rudy Veit": 59, "Dave Griffith": 60, "Bruce Sassmann": 61, "Sherri Gallick": 62,
  "Tricia Byrnes": 63, "Deanna Self": 64, "Wendy Hausman": 65, "Marlene Terry": 66,
  "Tonya Rush": 67, "Kem Smith": 68, "Scott Miller": 69, "Stephanie Boykin": 70,
  "LaDonna Appelbaum": 71, "Doug Clemens": 72, "Raychel Proudie": 73, "Marla Smith": 74,
  "Chanel Mosley": 75, "Marlon Anderson": 76, "Kimberly-Ann Collins": 77,
  "Marty Joe Murray": 78, "Marty Murray": 78, // same person, shortened in GIS data
  "LaKeySha Frazier-Bosley": 79, "LaKeySha Bosley": 79, // same person, maiden/shortened name in GIS data
  "Elizabeth Fuchs": 80, "Steve Butz": 81, "Nick Kimble": 82, "Ray Reed": 83,
  "Del Taylor": 84, "Yolonda Fountain Henderson": 85, "Jeff Hales": 86,
  "Connie Steinmetz": 87, "Holly Jones": 88,
  "George J. Hruza": 89, "George Hruza": 89, // same person, no middle initial in GIS data
  "Mark Boyko": 90, "Jo Doll": 91, "Michael Burton": 92, "Bridget Walsh Moore": 93,
  "Jim Murphy": 94,
  // District 95: vacant per current roster, and GIS data agrees (no name found)
  "Brad Christ": 96, "David Casteel": 97, "Jaclyn Zimmermann": 98, "Ian Mackey": 99,
  "Philip Oehlerking": 100, "Ben Keathley": 101, "Richard West": 102, "Dave Hinman": 103,
  "Terri Violet": 104, "Colin Wellenkamp": 105, "Travis Wilson": 106,
  "Mark Matthiesen": 107, "Mike Costlow": 108, "John Simmons": 109,
  "Justin Sparks": 110, // VACANT as of Nov 2025 — Sparks resigned for a federal DHS job; GIS data not yet updated
  "Cecelie Williams": 111, "Renee Reuter": 112, "Phil Amato": 113,
  "Ken Waller": 114, // VACANT as of Aug 2025 — Waller died in office; GIS data not yet updated
  "Bill Lucas": 115, "Dale Wright": 116, "Becky Laubinger": 117, "Mike McGirl": 118,
  "Brad Banderman": 119, "John Hewkin": 120, "Bill Hardwick": 121, "Tara Peters": 122,
  "Jeff Vernetti": 123, "Don Mayhew": 124, "Dane Diehl": 125, "Jim Kalberloh": 126,
  "Ann Kelley": 127, "Christopher Warwick": 128, "John Black": 129, "Bishop Davidson": 130,
  "Bill Owen": 131, "Jeremy Dean": 132, "Melanie Stinnett": 133, "Alex Riley": 134,
  "Betsy Fogle": 135, "Stephanie Hein": 136, "Darin Chappell": 137, "Burt Whaley": 138,
  "Bob Titus": 139, "Jamie Gragg": 140, "Melissa Schmidt": 141, "Jeff Knight": 142,
  "Bennie Cook": 143, "Tony Harbison": 144, "Bryant Wolfin": 145, "Barry Hovis": 146,
  "John Voss": 147, "David Dolan": 148,
  "Donnie Brown": 149, // VACANT as of Aug 2025 — Brown resigned; GIS data not yet updated
  "Cameron Parker": 150, "Steve Jordan": 151, "Hardy Billington": 152, "Keith Elliott": 153,
  "Lisa Durnell": 154, "Matthew Overcast": 155, "Brian Seitz": 156, "Mitch Boggs": 157,
  "Scott Cupps": 158, "Dirk Deaton": 159,
  "Ben Baker": 160, // VACANT as of May 2025 — Baker left office; GIS data not yet updated
  "Lane Roberts": 161, "Bob Bromley": 162, "Cathy Jo Loy": 163,
  "Vacant": null, // the GIS data itself marks a few seats this way directly
};

export const SENATE_DISTRICT_BY_NAME = {
  "Doug Beck": 1, "Nick Schroer": 2, "Mike Henderson": 3, "Karla May": 4,
  "Steve Roberts": 5, "Mike Bernskoetter": 6, "Patty Lewis": 7, "Mike Cierpiot": 8,
  "Barbara Washington": 9,
  "Travis Fitzwater": 10, // VACANT as of May 2026 — Fitzwater resigned to lead the Missouri Technology Corporation; GIS data not yet updated
  "Joe Nicola": 11, "Rusty Black": 12,
  "Angela Mosley": 13, "Angela Walton Mosley": 13, // same person, full name in GIS data
  "Brian Williams": 14, "David Gregory": 15, "Justin Brown": 16,
  "Maggie Nurrenbern": 17, "Cindy O'Laughlin": 18, "Stephen Webber": 19,
  "Curtis Trent": 20, "Kurtis Gregory": 21, "Mary Elizabeth Coleman": 22,
  "Adam Schnelting": 23, "Tracy McCreery": 24, "Jason Bean": 25, "Ben Brown": 26,
  "Jamie Burger": 27, "Sandy Crawford": 28, "Mike Moon": 29, "Lincoln Hough": 30,
  "Rick Brattin": 31, "Jill Carter": 32, "Brad Hudson": 33, "Tony Luetkemeyer": 34,
  "Vacant": null,
};

export function houseDistrictLabel(rawName) {
  if (!rawName) return null;
  const n = HOUSE_DISTRICT_BY_NAME[rawName];
  return n ? `State House District ${n}` : null;
}

export function senateDistrictLabel(rawName) {
  if (!rawName) return null;
  const n = SENATE_DISTRICT_BY_NAME[rawName];
  return n ? `State Senate District ${n}` : null;
}
