const { useState } = React;

/* ---------------- Design tokens (v2 — warmer, rounder, friendlier) ----------------
Color:
  ink       #22314A  (headline text, nav)
  cream     #FBF6EC  (background — warm, bright)
  sun       #E8A93B  (primary accent — Missouri wheat, brighter/warmer)
  river     #2F8F8A  (secondary accent — teal, links/info)
  bloom     #E8734A  (highlight accent — deadline hero only)
  sprout    #3E8F63  (support / positive)
  ember     #D2593F  (oppose / caution)
  mist      #6B7789  (secondary text)
Type:
  Display: "Fraunces" (a warm, slightly quirky serif — friendlier than a stiff
           institutional serif, still carries authority)
  Body/UI: "Inter"
Layout: rounded 20px cards, soft layered shadows, generous white space,
  colored top-accent bars, big tap targets.
Signature element: gradient "wax-seal" hero cards + numbered circular step
  badges that replace the old flat ballot-stub perforation — warmer and
  more app-like while staying civic in tone.
------------------------------------------------------------------------------- */

const INDIVIDUAL_DISTRICTS = [
  "1st District",
  "2nd District",
  "3rd District",
  "4th District",
  "5th District",
  "6th District",
];

const AT_LARGE_DISTRICTS = ["1st At-Large", "2nd At-Large", "3rd At-Large"];

const COUNTIES = {
  "Jackson County": [
    {
      office: "Jackson County Executive",
      appliesTo: "countywide",
      candidates: [
        {
          name: "Stacy Lake",
          party: "Democratic",
          incumbent: false,
          headline:
            "Attorney running on a 7-point 'JACKSON Plan' focused on property taxes, a county audit, and infrastructure.",
          supports: [
            "Ending the county's contract with Tyler Technologies and bringing property assessment in-house",
            "A deep-scale forensic audit of county finances",
            "Modernizing the county's outdated technology systems",
            "Improving county infrastructure",
          ],
          opposes: [],
          website: "https://www.jacksoncountyexecutive.com",
          impact:
            "Lake has centered her campaign on the 2023 property tax reassessment crisis and says fixing how assessments are done is her top priority. If assessment moves in-house, that could change how (and how fast) your property valuation is calculated in future reassessment cycles.",
        },
        {
          name: "Alan Rohlfing",
          party: "Republican",
          incumbent: false,
          headline:
            "Running unopposed in the GOP primary on reducing government spending and reviewing the county charter.",
          supports: [
            "Fairer property assessments, a more transparent tax system, and a simpler appeals process",
            "Reducing overall county government spending",
            "A forensic audit of county finances",
            "A full review of the Jackson County Charter",
            "Strengthening core services: public safety, infrastructure, and public works",
          ],
          opposes: [],
          website: "https://www.rohlfing4jacksoncounty.com",
          impact:
            "Rohlfing's spending-reduction focus could mean a slower-growing county budget, which may affect the pace of new county services or hires. He's also pledged support specifically for first responders, seniors, and veterans.",
        },
      ],
    },
    {
      office: "Jackson County Legislature — 3rd District At-Large",
      appliesTo: "3rd At-Large",
      candidates: [
        {
          name: "Susan B. Wilson",
          party: "Democratic",
          incumbent: false,
          headline:
            "Retired UMKC vice chancellor and county COMBAT commissioner; running unopposed (no Republican filed for this seat).",
          supports: [
            "Data-driven property assessments with a faster, clearer appeals process",
            "More accountable, transparent county government and on-time budgets",
            "Full funding for community violence-prevention programs",
            "Economic mobility initiatives for county residents",
          ],
          opposes: [],
          website: "https://electsusanwilson.com",
          impact:
            "Because Wilson is unopposed, she is effectively already your next 3rd At-Large legislator — one of three legislators elected countywide who, along with six district legislators, vote on the county budget and property tax policy.",
        },
      ],
    },
    {
      office: "Jackson County Legislature — 1st District",
      appliesTo: "1st District",
      candidates: [
        {
          name: "Kelly Thompson",
          party: "Democratic",
          incumbent: false,
          headline:
            "Former journalist and single mother; ran unopposed for this open seat (no Republican filed).",
          supports: [
            "Restoring transparency and public trust in county government",
            "Rebuilding accountability after recent legislature controversies",
            "Making county government work better for the people who live here",
          ],
          opposes: [],
          website: "https://www.kellythompsonforjacksoncounty.com",
          impact:
            "The 1st District covers south Kansas City, from State Line to Troost Avenue and from the Martin City area to the Missouri River. Because Thompson is unopposed, she is effectively already your next 1st District legislator, replacing outgoing legislator Manny Abarca, who left the seat open to run for County Executive.",
        },
      ],
    },
  ],
};

const REG_STEPS = [
  {
    title: "Check you're eligible",
    detail:
      "You must be a U.S. citizen, a Missouri resident, and at least 17½ years old (18 by Election Day). You can't be currently imprisoned following a felony conviction, on parole/probation for one, or declared incapacitated by a court.",
  },
  {
    title: "Choose how to register",
    detail:
      "Online at the Missouri Secretary of State's site, by mailing a printed form, or in person at your County Clerk's office or the DMV.",
    link: "https://s1.sos.mo.gov/votemissouri/request",
    linkLabel: "Register online (sos.mo.gov)",
  },
  {
    title: "Watch the deadline",
    detail:
      "Missouri has no same-day registration. Applications must be submitted (or postmarked, if mailed) by the 4th Wednesday before Election Day — that's 27 days out.",
  },
  {
    title: "Confirm you're registered",
    detail:
      "After applying, verify your registration and find your polling place through the Secretary of State's voter portal.",
    link: "https://www.sos.mo.gov/elections/goVoteMissouri",
    linkLabel: "Check status (sos.mo.gov)",
  },
];

const UPCOMING = [
  { label: "Primary Election", date: "August 4, 2026", regBy: "July 8, 2026" },
  { label: "General Election", date: "November 3, 2026", regBy: "October 7, 2026" },
];

const FONT_IMPORT =
  "@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&display=swap');";

function Card({ children, accent = "#E8A93B", onClick, style }) {
  return (
    <div
      onClick={onClick}
      style={{
        position: "relative",
        background: "#FFFFFF",
        borderRadius: 20,
        padding: "18px 18px 18px 20px",
        marginBottom: 14,
        boxShadow: "0 2px 10px rgba(34,49,74,0.06), 0 1px 2px rgba(34,49,74,0.04)",
        cursor: onClick ? "pointer" : "default",
        overflow: "hidden",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        ...style,
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.boxShadow =
            "0 6px 16px rgba(34,49,74,0.10), 0 2px 4px rgba(34,49,74,0.06)";
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow =
            "0 2px 10px rgba(34,49,74,0.06), 0 1px 2px rgba(34,49,74,0.04)";
        }
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 5,
          background: accent,
        }}
      />
      {children}
    </div>
  );
}

function Pill({ children, tone = "neutral" }) {
  const tones = {
    neutral: { bg: "#F1ECDF", fg: "#6B7789" },
    a: { bg: "#FDEDD3", fg: "#9A6B14" },
    b: { bg: "#DDEEEC", fg: "#1F6F69" },
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span
      style={{
        display: "inline-block",
        background: t.bg,
        color: t.fg,
        fontSize: 11.5,
        fontWeight: 700,
        borderRadius: 999,
        padding: "3px 10px",
        letterSpacing: 0.2,
      }}
    >
      {children}
    </span>
  );
}

function TabButton({ active, label, icon, onClick, color, divider }) {
  return (
    <div style={{ flex: 1, display: "flex", position: "relative" }}>
      {divider && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: "18%",
            bottom: "18%",
            width: 1,
            background: "#E4D9BE",
          }}
        />
      )}
      <button
        onClick={onClick}
        style={{
          flex: 1,
          background: "none",
          border: "none",
          padding: "8px 4px",
          display: "flex",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            padding: "7px 16px 9px",
            borderRadius: 18,
            background: active ? `${color}22` : "transparent",
            transition: "background 0.15s ease",
          }}
        >
          <span
            style={{
              fontSize: 36,
              lineHeight: 1,
              filter: active ? "none" : "grayscale(0.25) opacity(0.75)",
              transform: active ? "scale(1.08)" : "scale(1)",
              transition: "transform 0.15s ease",
            }}
          >
            {icon}
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 17,
              fontWeight: active ? 800 : 600,
              color: active ? color : "#8A93A3",
              letterSpacing: 0.1,
            }}
          >
            {label}
          </span>
        </span>
      </button>
    </div>
  );
}

function App() {
  const [tab, setTab] = useState("register");
  const [county, setCounty] = useState("Jackson County");
  const [myIndividualDistrict, setMyIndividualDistrict] = useState(null);
  const [myAtLargeDistrict, setMyAtLargeDistrict] = useState(null);
  const [detail, setDetail] = useState(null);
  const [saved, setSaved] = useState([]);

  const races = COUNTIES[county];

  const toggleSave = (name) =>
    setSaved((s) => (s.includes(name) ? s.filter((n) => n !== name) : [...s, name]));

  return (
    <div
      style={{
        maxWidth: 420,
        margin: "0 auto",
        minHeight: "100vh",
        background: "#FBF6EC",
        fontFamily: "'Inter', sans-serif",
        color: "#22314A",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{`
        ${FONT_IMPORT}
        * { box-sizing: border-box; }
        button { font-family: inherit; }
        a { color: #2F8F8A; text-decoration: none; }
        a:hover { text-decoration: underline; }
        ::selection { background: #FDEDD3; }
      `}</style>

      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #22314A 0%, #2C3F5C 60%, #2F8F8A 140%)",
          color: "#FBF6EC",
          padding: "26px 22px 24px",
          borderBottomLeftRadius: 28,
          borderBottomRightRadius: 28,
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: 2,
            opacity: 0.7,
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          Missouri
        </div>
        <div
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 600,
            fontSize: 28,
            marginTop: 4,
            lineHeight: 1.1,
          }}
        >
          Show-Me Ballot
        </div>
        <div style={{ fontSize: 13, opacity: 0.85, marginTop: 6 }}>
          Know how to register, and who's actually on your ballot.
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "18px 16px 122px", overflowY: "auto" }}>
        {tab === "register" && <RegisterScreen />}
        {tab === "candidates" && !detail && (
          <CandidatesScreen
            county={county}
            setCounty={setCounty}
            races={races}
            saved={saved}
            toggleSave={toggleSave}
            onOpen={setDetail}
            myIndividualDistrict={myIndividualDistrict}
            setMyIndividualDistrict={setMyIndividualDistrict}
            myAtLargeDistrict={myAtLargeDistrict}
            setMyAtLargeDistrict={setMyAtLargeDistrict}
          />
        )}
        {tab === "candidates" && detail && (
          <CandidateDetail
            candidate={detail}
            saved={saved.includes(detail.name)}
            onSave={() => toggleSave(detail.name)}
            onBack={() => setDetail(null)}
          />
        )}
        {tab === "saved" && (
          <SavedScreen races={races} saved={saved} onOpen={setDetail} toggleSave={toggleSave} />
        )}
      </div>

      {/* Bottom tab bar */}
      <div
        style={{
          position: "sticky",
          bottom: 0,
          display: "flex",
          background: "#FFFFFF",
          boxShadow: "0 -2px 12px rgba(34,49,74,0.08)",
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          padding: "8px 4px 12px",
        }}
      >
        <TabButton
          icon="🗳️"
          label="Register"
          color="#E8734A"
          active={tab === "register"}
          onClick={() => setTab("register")}
        />
        <TabButton
          icon="📋"
          label="Candidates"
          color="#2F8F8A"
          divider
          active={tab === "candidates"}
          onClick={() => {
            setTab("candidates");
            setDetail(null);
          }}
        />
        <TabButton
          icon="⭐"
          label={`Saved${saved.length ? ` (${saved.length})` : ""}`}
          color="#E8A93B"
          divider
          active={tab === "saved"}
          onClick={() => setTab("saved")}
        />
      </div>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div
      style={{
        fontSize: 11.5,
        fontWeight: 800,
        letterSpacing: 1,
        color: "#8A93A3",
        textTransform: "uppercase",
        marginBottom: 10,
        marginTop: 4,
      }}
    >
      {children}
    </div>
  );
}

function RegisterScreen() {
  return (
    <div>
      {/* Hero deadline card */}
      <div
        style={{
          background: "linear-gradient(135deg, #E8734A 0%, #E8A93B 100%)",
          borderRadius: 22,
          padding: "20px 20px 18px",
          marginBottom: 20,
          color: "#FFF8EC",
          boxShadow: "0 8px 20px rgba(232,115,74,0.28)",
        }}
      >
        <div style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: 1, opacity: 0.9 }}>
          NEXT DEADLINE
        </div>
        <div
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 23,
            fontWeight: 600,
            marginTop: 4,
          }}
        >
          Register by {UPCOMING[0].regBy}
        </div>
        <div style={{ fontSize: 13.5, marginTop: 2, opacity: 0.95 }}>
          for the Primary Election on {UPCOMING[0].date}
        </div>
        <div
          style={{
            fontSize: 12.5,
            marginTop: 10,
            paddingTop: 10,
            borderTop: "1px solid rgba(255,255,255,0.35)",
            opacity: 0.95,
          }}
        >
          General Election: {UPCOMING[1].date} · register by {UPCOMING[1].regBy}
        </div>
      </div>

      <SectionLabel>How to register — 4 steps</SectionLabel>
      {REG_STEPS.map((s, i) => (
        <Card key={i} accent="#2F8F8A">
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div
              style={{
                width: 30,
                height: 30,
                minWidth: 30,
                borderRadius: "50%",
                background: "#DDEEEC",
                color: "#1F6F69",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Fraunces', serif",
                fontWeight: 700,
                fontSize: 14,
                marginTop: 1,
              }}
            >
              {i + 1}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 15.5 }}>{s.title}</div>
              <div style={{ fontSize: 13.5, color: "#4E5A6C", marginTop: 4, lineHeight: 1.5 }}>
                {s.detail}
              </div>
              {s.link && (
                <a
                  href={s.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: 13.5, fontWeight: 700, display: "inline-block", marginTop: 8 }}
                >
                  {s.linkLabel} →
                </a>
              )}
            </div>
          </div>
        </Card>
      ))}

      <div style={{ fontSize: 11.5, color: "#A9B0BE", marginTop: 6, lineHeight: 1.5 }}>
        Registration rules and dates shown are for Missouri and current as of July 2026. Always
        confirm details with your County Clerk or sos.mo.gov before a deadline.
      </div>
    </div>
  );
}

function DistrictFinder({
  myIndividualDistrict,
  setMyIndividualDistrict,
  myAtLargeDistrict,
  setMyAtLargeDistrict,
}) {
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | error | outside
  const [errorMsg, setErrorMsg] = useState("");
  const [matchedAddress, setMatchedAddress] = useState("");

  const bothConfirmed = myIndividualDistrict && myAtLargeDistrict;

  const findDistricts = async () => {
    if (!address.trim()) return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch(
        `/api/lookup-district?address=${encodeURIComponent(address)}`
      );
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong.");
        return;
      }

      if (!data.individualDistrict || !data.atLargeDistrict) {
        setStatus("outside");
        return;
      }

      setMyIndividualDistrict(data.individualDistrict);
      setMyAtLargeDistrict(data.atLargeDistrict);
      setMatchedAddress(data.matchedAddress || "");
      setStatus("idle");
    } catch (e) {
      setStatus("error");
      setErrorMsg("Couldn't reach the server. Is it running?");
    }
  };

  const reset = () => {
    setMyIndividualDistrict(null);
    setMyAtLargeDistrict(null);
    setStatus("idle");
    setAddress("");
    setMatchedAddress("");
  };

  return (
    <Card accent="#E8734A" style={{ marginBottom: 18 }}>
      <div style={{ fontWeight: 700, fontSize: 15.5, marginBottom: 4 }}>
        {bothConfirmed ? "Your districts" : "Find your districts"}
      </div>

      {bothConfirmed ? (
        <div>
          {matchedAddress && (
            <div style={{ fontSize: 12, color: "#8A93A3", marginTop: 4, marginBottom: 8 }}>
              Matched: {matchedAddress}
            </div>
          )}
          <div style={{ fontSize: 12.5, color: "#8A93A3", marginTop: 6, marginBottom: 3 }}>
            Individual district
          </div>
          <div style={{ marginBottom: 8 }}>
            <Pill tone="b">{myIndividualDistrict}</Pill>
          </div>
          <div style={{ fontSize: 12.5, color: "#8A93A3", marginBottom: 3 }}>At-large district</div>
          <div style={{ marginBottom: 10 }}>
            <Pill tone="a">{myAtLargeDistrict}</Pill>
          </div>
          <button
            onClick={reset}
            style={{
              background: "none",
              border: "none",
              color: "#2F8F8A",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              padding: 0,
            }}
          >
            Look up a different address
          </button>
        </div>
      ) : (
        <div>
          <div style={{ fontSize: 13.5, color: "#4E5A6C", lineHeight: 1.5, marginBottom: 10 }}>
            Every Jackson County voter has <strong>two</strong> legislature races: one individual
            district (1st–6th) and one at-large district. Enter your address and we'll find both.
          </div>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && findDistricts()}
            placeholder="e.g. 8640 Holmes Rd, Kansas City, MO 64131"
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid #E9E0CC",
              fontSize: 13.5,
              marginBottom: 10,
            }}
          />
          <button
            onClick={findDistricts}
            disabled={!address.trim() || status === "loading"}
            style={{
              width: "100%",
              background: address.trim() ? "#2F8F8A" : "#F1ECDF",
              color: address.trim() ? "#FFF8EC" : "#A9B0BE",
              fontWeight: 700,
              fontSize: 14.5,
              padding: "12px 16px",
              borderRadius: 14,
              border: "none",
              cursor: address.trim() ? "pointer" : "default",
            }}
          >
            {status === "loading" ? "Looking up…" : "Find my districts"}
          </button>

          {status === "error" && (
            <div style={{ fontSize: 12.5, color: "#8A5E12", background: "#FDEDD3", borderRadius: 12, padding: "10px 12px", marginTop: 10, lineHeight: 1.5 }}>
              {errorMsg}
            </div>
          )}
          {status === "outside" && (
            <div style={{ fontSize: 12.5, color: "#8A5E12", background: "#FDEDD3", borderRadius: 12, padding: "10px 12px", marginTop: 10, lineHeight: 1.5 }}>
              That address matched, but it's outside the district boundaries we have on file —
              double check it's in Jackson County.
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

function CandidatesScreen({
  races,
  saved,
  toggleSave,
  onOpen,
  myIndividualDistrict,
  setMyIndividualDistrict,
  myAtLargeDistrict,
  setMyAtLargeDistrict,
}) {
  const confirmedDistricts = [myIndividualDistrict, myAtLargeDistrict].filter(Boolean);
  const visibleRaces = races.filter(
    (r) =>
      r.appliesTo === "countywide" ||
      confirmedDistricts.length === 0 ||
      confirmedDistricts.includes(r.appliesTo)
  );
  const missingDistricts = confirmedDistricts.filter(
    (d) => !races.some((r) => r.appliesTo === d)
  );

  return (
    <div>
      <DistrictFinder
        myIndividualDistrict={myIndividualDistrict}
        setMyIndividualDistrict={setMyIndividualDistrict}
        myAtLargeDistrict={myAtLargeDistrict}
        setMyAtLargeDistrict={setMyAtLargeDistrict}
      />

      <div
        style={{
          fontSize: 12.5,
          background: "#FDEDD3",
          borderRadius: 14,
          padding: "10px 14px",
          marginBottom: 18,
          color: "#8A5E12",
          display: "flex",
          gap: 8,
          alignItems: "flex-start",
        }}
      >
        <span>💡</span>
        <span>
          Real Nov 3, 2026 general election candidates for your ballot, based on county election
          board and local news reporting as of Aug 2026. Positions may evolve as the campaign
          continues — verify anything critical with the candidate's own site before voting.
        </span>
      </div>

      {missingDistricts.length > 0 && (
        <div
          style={{
            fontSize: 12.5,
            background: "#F1ECDF",
            borderRadius: 14,
            padding: "10px 14px",
            marginBottom: 18,
            color: "#56657A",
          }}
        >
          We don't have legislature candidate data loaded for {missingDistricts.join(" or ")}{" "}
          yet — showing what we have. Let me know that district's candidates and I can add them.
        </div>
      )}

      {visibleRaces.map((race, i) => (
        <div key={i} style={{ marginBottom: 22 }}>
          <SectionLabel>{race.office}</SectionLabel>
          {race.candidates.map((c) => (
            <Card
              key={c.name}
              onClick={() => onOpen(c)}
              accent={c.party === "Democratic" ? "#E8A93B" : "#2F8F8A"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 18 }}>
                    {c.name}
                  </div>
                  <div style={{ marginTop: 6, display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <Pill tone={c.party === "Democratic" ? "a" : "b"}>{c.party}</Pill>
                    {c.incumbent && <Pill>Incumbent</Pill>}
                  </div>
                  <div style={{ fontSize: 13.5, marginTop: 8, color: "#4E5A6C" }}>{c.headline}</div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSave(c.name);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: 21,
                    cursor: "pointer",
                    lineHeight: 1,
                  }}
                  aria-label="Save candidate"
                >
                  {saved.includes(c.name) ? "⭐" : "☆"}
                </button>
              </div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#2F8F8A", marginTop: 12 }}>
                View full positions →
              </div>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
}

function PositionList({ title, items, tone }) {
  const color = tone === "for" ? "#3E8F63" : "#D2593F";
  const bg = tone === "for" ? "#EAF5EE" : "#FBEBE7";
  return (
    <div
      style={{
        marginBottom: 14,
        background: bg,
        borderRadius: 16,
        padding: "14px 16px",
      }}
    >
      <div style={{ fontSize: 12, fontWeight: 800, color, letterSpacing: 0.5, marginBottom: 8 }}>
        {title}
      </div>
      <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, lineHeight: 1.65, color: "#33414F" }}>
        {items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
    </div>
  );
}

function CandidateDetail({ candidate: c, saved, onSave, onBack }) {
  return (
    <div>
      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          color: "#2F8F8A",
          fontWeight: 700,
          fontSize: 13.5,
          marginBottom: 14,
          cursor: "pointer",
          padding: 0,
        }}
      >
        ← Back to candidates
      </button>

      <div
        style={{
          background: "linear-gradient(135deg, #22314A 0%, #2F8F8A 130%)",
          borderRadius: 20,
          padding: "20px",
          color: "#FBF6EC",
          marginBottom: 16,
          boxShadow: "0 8px 20px rgba(34,49,74,0.18)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 23 }}>
              {c.name}
            </div>
            <div style={{ marginTop: 8, display: "flex", gap: 6 }}>
              <span
                style={{
                  background: "rgba(255,255,255,0.18)",
                  borderRadius: 999,
                  padding: "3px 10px",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                {c.party}
              </span>
              {c.incumbent && (
                <span
                  style={{
                    background: "rgba(255,255,255,0.18)",
                    borderRadius: 999,
                    padding: "3px 10px",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  Incumbent
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onSave}
            style={{ background: "none", border: "none", fontSize: 26, cursor: "pointer" }}
            aria-label="Save candidate"
          >
            {saved ? "⭐" : "☆"}
          </button>
        </div>
        <div style={{ fontSize: 14, marginTop: 12, opacity: 0.92 }}>{c.headline}</div>
      </div>

      <PositionList title="STATED SUPPORT" items={c.supports} tone="for" />
      {c.opposes && c.opposes.length > 0 && (
        <PositionList title="STATED OPPOSITION" items={c.opposes} tone="against" />
      )}

      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #E9E0CC",
          borderRadius: 16,
          padding: 16,
          marginTop: 4,
          boxShadow: "0 1px 3px rgba(34,49,74,0.05)",
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 800, color: "#E8A93B", marginBottom: 6 }}>
          HOW THIS COULD AFFECT YOU
        </div>
        <div style={{ fontSize: 13.5, lineHeight: 1.6, color: "#33414F" }}>{c.impact}</div>
      </div>

      {c.website && (
        <a
          href={c.website}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            background: "#22314A",
            color: "#FBF6EC",
            fontWeight: 700,
            fontSize: 14,
            padding: "13px 16px",
            borderRadius: 14,
            marginTop: 14,
          }}
        >
          Visit {c.name.split(" ")[0]}'s campaign website ↗
        </a>
      )}

      <div style={{ fontSize: 11.5, color: "#A9B0BE", marginTop: 14, lineHeight: 1.5 }}>
        Positions are summarized from public campaign statements and local election reporting
        (Aug 2026) and simplified for readability. Always check a candidate's official site for
        their full, current platform before voting.
      </div>
    </div>
  );
}

function SavedScreen({ races, saved, onOpen, toggleSave }) {
  const all = races.flatMap((r) => r.candidates);
  const savedCandidates = all.filter((c) => saved.includes(c.name));

  if (savedCandidates.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: 70, color: "#A9B0BE" }}>
        <div style={{ fontSize: 38, marginBottom: 12 }}>⭐</div>
        <div style={{ fontSize: 15, fontWeight: 600, color: "#6B7789" }}>
          No candidates saved yet
        </div>
        <div style={{ fontSize: 12.5, marginTop: 4 }}>
          Tap the star on any candidate to compare them here.
        </div>
      </div>
    );
  }

  return (
    <div>
      <SectionLabel>Your comparison list</SectionLabel>
      {savedCandidates.map((c) => (
        <Card
          key={c.name}
          onClick={() => onOpen(c)}
          accent={c.party === "Democratic" ? "#E8A93B" : "#2F8F8A"}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 17 }}>
                {c.name}
              </div>
              <div style={{ marginTop: 6 }}>
                <Pill tone={c.party === "Democratic" ? "a" : "b"}>{c.party}</Pill>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleSave(c.name);
              }}
              style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#A9B0BE" }}
            >
              ✕
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
}
