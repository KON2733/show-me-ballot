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
      office: "Missouri State Auditor",
      appliesTo: "statewide",
      candidates: [
        {
          name: "Scott Fitzpatrick",
          party: "Republican",
          incumbent: true,
          headline:
            "Incumbent auditor (since 2023) seeking a second term; previously six years in the state House and four as State Treasurer.",
          supports: [
            "Fighting waste and fraud in state and local government",
            "Blocking taxpayer funding for people in the country illegally",
            "Auditing school districts on cost and performance, including spending compared to outcomes",
            "Auditing school curriculum, including scrutiny of material he describes as politically divisive (e.g. Critical Race Theory) or related to gender/sexual orientation",
            "Limiting corruption in local government",
          ],
          opposes: [],
          website: "https://www.scottfitzpatrick.com",
          impact:
            "The State Auditor reviews how state and local government agencies — including school districts — spend taxpayer money. Fitzpatrick has said he'd use that authority to review school curriculum content in addition to standard financial audits, which is a more expansive use of the office than auditors have typically pursued.",
        },
        {
          name: "Quentin Wilson",
          party: "Democratic",
          incumbent: false,
          headline:
            "Former director of the Missouri Department of Revenue and the Missouri Department of Higher Education; has also worked in St. Louis County government and for members of Congress.",
          supports: [
            "More transparency between voters and the auditor's office",
            "Creating a state government accountability office",
            "Partnerships between the auditor's office and universities, nonprofits, businesses, and local governments",
          ],
          opposes: [],
          website: "https://quentin4mo.com",
          impact:
            "Wilson frames his campaign around government efficiency and accountability generally, pointing to his experience across several state and local agencies, rather than specific criticisms of the incumbent's record.",
        },
        {
          name: "Dustin Coffell",
          party: "Libertarian",
          incumbent: false,
          headline:
            "Chair of the Libertarian Party of Missouri; ran unopposed for the Libertarian nomination.",
          supports: [],
          opposes: [],
          website: "",
          impact:
            "Little public information is available on Coffell's specific plans for the office — check his campaign's social media or the Libertarian Party of Missouri for updates before voting.",
        },
      ],
    },
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
    {
      office: "Missouri House of Representatives — District 26",
      appliesTo: "State House District 26",
      candidates: [
        {
          name: "Tiffany Price",
          party: "Democratic",
          incumbent: true,
          headline:
            "First-term incumbent (elected 2024); Navy veteran, nonprofit founder, and mother of four; running unopposed (no Republican or Libertarian filed).",
          supports: [
            "Equal educational opportunities for urban and suburban students alike, and support for parents choosing where their kids attend school",
            "Better working conditions and support for teachers",
            "Holding health insurers accountable for covering mental health care, and attracting more mental health providers to practice in Missouri",
            "Addressing crime by investing in struggling communities — job training, transportation, child care, and mental health services",
            "Banning minors from possessing guns, and red flag laws",
          ],
          opposes: [],
          website: "",
          impact:
            "District 26 covers Kansas City's southeast side. Because Price is unopposed, she is effectively already your next District 26 representative. Missouri House seats are 2-year terms, so this race, unlike the state Senate seat below, is on every even-numbered-year ballot.",
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
        fontSize: 13,
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
          padding: "8px 1px",
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
            padding: "7px 3px 9px",
            borderRadius: 16,
            background: active ? `${color}22` : "transparent",
            transition: "background 0.15s ease",
          }}
        >
          <span
            style={{
              fontSize: 26,
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
              fontSize: 14,
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
  const [setup, setSetup] = useState(() => readSetup());
  const [tab, setTab] = useState(() => (readSetup() ? "home" : "intro"));
  const [county, setCounty] = useState("Jackson County");
  const [myIndividualDistrict, setMyIndividualDistrict] = useState(null);
  const [myAtLargeDistrict, setMyAtLargeDistrict] = useState(null);
  const [myStateHouseDistrict, setMyStateHouseDistrict] = useState(null);
  const [myStateSenateDistrict, setMyStateSenateDistrict] = useState(null);
  const [detail, setDetail] = useState(null);
  const [saved, setSaved] = useState([]);

  const races = COUNTIES[county];

  const finishSetup = (issues, share) => {
    const prev = setup || {};
    const v = { issues, share, at: Date.now(), sent: !!prev.sent };
    writeSetup(v);
    setSetup(v);
    setTab("home");
    // Anonymous count of the picked issues, sent once per device. Nothing else is sent.
    if (share && issues.length > 0 && !v.sent) {
      try {
        fetch("/api/issues", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ issues }),
        })
          .then((r) => {
            if (r.ok) {
              const done = { ...v, sent: true };
              writeSetup(done);
              setSetup(done);
            }
          })
          .catch(() => {});
      } catch (e) {}
    }
  };

  const toggleSave = (name) =>
    setSaved((s) => (s.includes(name) ? s.filter((n) => n !== name) : [...s, name]));

  return (
    <IssuesContext.Provider value={setup ? setup.issues : []}>
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
        {tab !== "home" && tab !== "intro" && (
          <button
            onClick={() => {
              setTab("home");
              setDetail(null);
            }}
            style={{ background: "rgba(255,255,255,0.16)", color: "#FBF6EC", border: "none", borderRadius: 999, padding: "8px 16px", fontSize: 16, fontWeight: 700, cursor: "pointer", marginBottom: 12 }}
          >
            {"\u2039 Home"}
          </button>
        )}
        <div
          style={{
            fontSize: 13,
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
        <div style={{ fontSize: 15, opacity: 0.85, marginTop: 6 }}>
          Know how to register, and who's actually on your ballot.
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: BALLOT_TABS.includes(tab) ? "18px 16px 122px" : "18px 16px 40px", overflowY: "auto" }}>
        {tab === "intro" && <IntroScreen initial={setup} onDone={finishSetup} />}
        {tab === "home" && (
          <HomeScreen
            setup={setup}
            go={(t) => {
              setTab(t);
              setDetail(null);
            }}
          />
        )}
        {tab === "register" && <RegisterScreen />}
        {tab === "learn" && <LearnScreen />}
        {tab === "measures" && <MeasuresScreen />}
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
            myStateHouseDistrict={myStateHouseDistrict}
            setMyStateHouseDistrict={setMyStateHouseDistrict}
            myStateSenateDistrict={myStateSenateDistrict}
            setMyStateSenateDistrict={setMyStateSenateDistrict}
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
          display: BALLOT_TABS.includes(tab) ? "flex" : "none",
          background: "#FFFFFF",
          boxShadow: "0 -2px 12px rgba(34,49,74,0.08)",
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          padding: "8px 4px 12px",
        }}
      >
        <TabButton
          icon="📜"
          label="Measures"
          color="#8A6BBE"
          active={tab === "measures"}
          onClick={() => setTab("measures")}
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
    </IssuesContext.Provider>
  );
}

const BALLOT_TABS = ["measures", "candidates", "saved"];

const ELECTIONS_GUIDE = [
  {
    level: "Federal",
    icon: "🏛️",
    color: "#D2593F",
    intro:
      "The U.S. government — things that affect the whole country, from foreign policy to federal taxes.",
    onBallot: [
      {
        office: "U.S. House of Representatives",
        term: "2-year term",
        note:
          "The only federal race on your ballot this year — all 435 House seats are up every 2 years. Missouri just redrew its congressional district lines mid-decade (unusual — normally only happens once a decade), splitting Jackson County between multiple districts. It's being challenged in court, so which district you're in could still shift before Election Day.",
      },
    ],
    notOnBallot: [
      {
        office: "U.S. Senate",
        note: "6-year terms, staggered. Missouri's two seats aren't up again until 2028 and 2030.",
      },
      {
        office: "President & Vice President",
        note: "Every 4 years only. 2024 was the last one, 2028 is next.",
      },
    ],
  },
  {
    level: "State",
    icon: "🏢",
    color: "#2F8F8A",
    intro: "Missouri state government — state laws, taxes, schools funding, and more.",
    onBallot: [
      {
        office: "Missouri House of Representatives",
        term: "2-year term",
        note: "All 163 seats are up every 2 years, so yes, this cycle.",
      },
      {
        office: "Missouri Senate",
        term: "4-year term",
        note:
          "Staggered terms — only about half the seats are up each cycle. Jackson County has one seat (District 8) on the ballot this year.",
      },
      {
        office: "State Auditor",
        term: "4-year term",
        note: "The one statewide executive office up this cycle.",
      },
      {
        office: "Statewide ballot measures",
        note:
          "Five statewide questions were on the November 3 ballot: Amendments 3, 6, 7 and 8, and Proposition A. See the Measures tab for what each one did.",
      },
    ],
    notOnBallot: [
      {
        office: "Governor & Lieutenant Governor",
        note: "4-year terms, elected together. Last was 2024, next is 2028.",
      },
      {
        office: "Secretary of State, Attorney General, State Treasurer",
        note: "All run on the same 4-year cycle as Governor — not this year.",
      },
    ],
  },
  {
    level: "County",
    icon: "🌾",
    color: "#E8A93B",
    intro: "Jackson County government — this is what the Candidates tab covers in detail.",
    onBallot: [
      { office: "County Executive", term: "4-year term", note: "Countywide — everyone votes on this one." },
      {
        office: "County Legislature",
        term: "4-year term",
        note:
          "You vote on two seats: your individual district (1st–6th) and your at-large district (1st–3rd At-Large).",
      },
    ],
    notOnBallot: [
      {
        office: "County Assessor, Treasurer, and most other county offices",
        note:
          "Jackson County is a \"charter county,\" so most department heads are appointed rather than elected.",
      },
    ],
  },
  {
    level: "City & local",
    icon: "🏙️",
    color: "#3E8F63",
    intro:
      "Kansas City (or Independence, Lee's Summit, Blue Springs, etc.) and school boards — but on a different calendar.",
    onBallot: [],
    notOnBallot: [
      {
        office: "Mayor & City Council",
        note:
          "Elected in separate spring municipal elections (typically April), not the November federal/state/county cycle. Won't appear on this ballot.",
      },
      {
        office: "School boards & special districts",
        note: "Also spring elections, separate from this ballot.",
      },
    ],
  },
  {
    level: "Judicial",
    icon: "⚖️",
    color: "#8A93A3",
    intro: "Jackson County judges — but it doesn't work like the other races.",
    onBallot: [
      {
        office: "Judicial retention votes",
        note:
          "Missouri's \"Nonpartisan Court Plan\" means most Jackson County judges are appointed first, then periodically face a simple yes/no \"should this judge be retained?\" vote — not a race against an opponent. These sometimes appear on the November ballot.",
      },
    ],
    notOnBallot: [],
  },
];

function LearnScreen() {
  // Nothing is described until the reader taps a level of government.
  const [open, setOpen] = useState(null);
  return (
    <div>
      <div style={{ fontSize: 16, color: "#4E5A6C", lineHeight: 1.55, marginBottom: 16 }}>
        Tap a level of government to see what was on your ballot, and what wasn't.
      </div>

      {ELECTIONS_GUIDE.map((section) => {
        const isOpen = open === section.level;
        return (
          <div key={section.level} style={{ marginBottom: 12 }}>
            <button
              onClick={() => setOpen(isOpen ? null : section.level)}
              aria-expanded={isOpen}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "22px 18px",
                borderRadius: 22,
                border: "3px solid " + (isOpen ? section.color : "transparent"),
                background: "#FFFFFF",
                color: "#22314A",
                cursor: "pointer",
                textAlign: "left",
                boxShadow: "0 2px 10px rgba(34,49,74,0.08), 0 1px 2px rgba(34,49,74,0.05)",
              }}
            >
              <span style={{ fontSize: 36, lineHeight: 1 }}>{section.icon}</span>
              <span
                style={{
                  flex: 1,
                  minWidth: 0,
                  fontFamily: "'Fraunces', serif",
                  fontWeight: 700,
                  fontSize: 28,
                  lineHeight: 1.1,
                }}
              >
                {section.level}
              </span>
              <span style={{ fontSize: 24, fontWeight: 800, color: section.color }}>
                {isOpen ? "\u25B2" : "\u25BC"}
              </span>
            </button>

            {isOpen && (
              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: 18,
                  borderLeft: "5px solid " + section.color,
                  padding: "16px 16px 8px 18px",
                  marginTop: 8,
                  boxShadow: "0 2px 10px rgba(34,49,74,0.08), 0 1px 2px rgba(34,49,74,0.05)",
                }}
              >
                <div style={{ fontSize: 16, color: "#4E5A6C", lineHeight: 1.5, marginBottom: 14 }}>
                  {section.intro}
                </div>

                {section.onBallot.length > 0 && (
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 0.5, textTransform: "uppercase", color: section.color, marginBottom: 6 }}>
                      On your ballot this year
                    </div>
                    {section.onBallot.map((item) => (
                      <div key={item.office} style={{ marginBottom: 12 }}>
                        <div style={{ fontWeight: 700, fontSize: 16, display: "flex", alignItems: "baseline", gap: 6, flexWrap: "wrap" }}>
                          {item.office}
                          {item.term && (
                            <span style={{ fontWeight: 600, fontSize: 13, color: "#8A93A3" }}>
                              {"\u00B7 " + item.term}
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: 15, color: "#4E5A6C", lineHeight: 1.5, marginTop: 2 }}>{item.note}</div>
                      </div>
                    ))}
                  </div>
                )}

                {section.notOnBallot.length > 0 && (
                  <div style={{ marginBottom: 8 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 0.5, textTransform: "uppercase", color: "#8A93A3", marginBottom: 6 }}>
                      Not this year
                    </div>
                    {section.notOnBallot.map((item) => (
                      <div key={item.office} style={{ marginBottom: 12 }}>
                        <div style={{ fontWeight: 700, fontSize: 16, color: "#8A93A3" }}>{item.office}</div>
                        <div style={{ fontSize: 15, color: "#8A93A3", lineHeight: 1.5, marginTop: 2 }}>{item.note}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div
      style={{
        fontSize: 13,
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
        <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 1, opacity: 0.9 }}>
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
        <div style={{ fontSize: 16, marginTop: 2, opacity: 0.95 }}>
          for the Primary Election on {UPCOMING[0].date}
        </div>
        <div
          style={{
            fontSize: 14,
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
        <RegStep key={i} step={s} index={i} />
      ))}

      <div style={{ fontSize: 13, color: "#A9B0BE", marginTop: 6, lineHeight: 1.5 }}>
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
  myStateHouseDistrict,
  setMyStateHouseDistrict,
  myStateSenateDistrict,
  setMyStateSenateDistrict,
}) {
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | error | outside
  const [errorMsg, setErrorMsg] = useState("");
  const [matchedAddress, setMatchedAddress] = useState("");

  const hasAnyResult =
    myIndividualDistrict || myAtLargeDistrict || myStateHouseDistrict || myStateSenateDistrict;

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

      if (
        !data.individualDistrict &&
        !data.atLargeDistrict &&
        !data.stateHouseDistrict &&
        !data.stateSenateDistrict
      ) {
        setStatus("outside");
        return;
      }

      setMyIndividualDistrict(data.individualDistrict || null);
      setMyAtLargeDistrict(data.atLargeDistrict || null);
      setMyStateHouseDistrict(data.stateHouseDistrict || null);
      setMyStateSenateDistrict(data.stateSenateDistrict || null);
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
    setMyStateHouseDistrict(null);
    setMyStateSenateDistrict(null);
    setStatus("idle");
    setAddress("");
    setMatchedAddress("");
  };

  return (
    <Card accent="#E8734A" style={{ marginBottom: 18 }}>
      <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>
        {hasAnyResult ? "Your districts" : "Find your districts"}
      </div>

      {hasAnyResult ? (
        <div>
          {matchedAddress && (
            <div style={{ fontSize: 14, color: "#8A93A3", marginTop: 4, marginBottom: 8 }}>
              Matched: {matchedAddress}
            </div>
          )}

          <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 0.5, textTransform: "uppercase", color: "#E8A93B", marginTop: 8, marginBottom: 6 }}>
            County
          </div>
          <div style={{ fontSize: 14, color: "#8A93A3", marginBottom: 3 }}>Individual district</div>
          <div style={{ marginBottom: 8 }}>
            {myIndividualDistrict ? (
              <Pill tone="b">{myIndividualDistrict}</Pill>
            ) : (
              <span style={{ fontSize: 14, color: "#A9B0BE" }}>Not found</span>
            )}
          </div>
          <div style={{ fontSize: 14, color: "#8A93A3", marginBottom: 3 }}>At-large district</div>
          <div style={{ marginBottom: 14 }}>
            {myAtLargeDistrict ? (
              <Pill tone="a">{myAtLargeDistrict}</Pill>
            ) : (
              <span style={{ fontSize: 14, color: "#A9B0BE" }}>Not found</span>
            )}
          </div>

          <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 0.5, textTransform: "uppercase", color: "#2F8F8A", marginBottom: 6 }}>
            State
          </div>
          <div style={{ fontSize: 14, color: "#8A93A3", marginBottom: 3 }}>Missouri House district</div>
          <div style={{ marginBottom: 8 }}>
            {myStateHouseDistrict ? (
              <Pill tone="b">{myStateHouseDistrict}</Pill>
            ) : (
              <span style={{ fontSize: 14, color: "#A9B0BE" }}>Not found</span>
            )}
          </div>
          <div style={{ fontSize: 14, color: "#8A93A3", marginBottom: 3 }}>Missouri Senate district</div>
          <div style={{ marginBottom: 8 }}>
            {myStateSenateDistrict ? (
              <Pill tone="a">{myStateSenateDistrict}</Pill>
            ) : (
              <span style={{ fontSize: 14, color: "#A9B0BE" }}>Not found</span>
            )}
          </div>
          {(myStateHouseDistrict || myStateSenateDistrict) && (
            <div style={{ fontSize: 13, color: "#A9B0BE", marginBottom: 10, lineHeight: 1.4 }}>
              Candidate info for Missouri House/Senate races is coming soon — for now this just
              confirms which districts you're in.
            </div>
          )}

          <button
            onClick={reset}
            style={{
              background: "none",
              border: "none",
              color: "#2F8F8A",
              fontWeight: 700,
              fontSize: 15,
              cursor: "pointer",
              padding: 0,
            }}
          >
            Look up a different address
          </button>
        </div>
      ) : (
        <div>
          <div style={{ fontSize: 16, color: "#4E5A6C", lineHeight: 1.5, marginBottom: 10 }}>
            Type your address and we'll show the races on your ballot.
          </div>
          <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 18, lineHeight: 1.25, color: "#22314A", marginBottom: 8 }}>
            How to know who's on your ballot, find your district
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
              fontSize: 16,
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
            <div style={{ fontSize: 14, color: "#8A5E12", background: "#FDEDD3", borderRadius: 12, padding: "10px 12px", marginTop: 10, lineHeight: 1.5 }}>
              {errorMsg}
            </div>
          )}
          {status === "outside" && (
            <div style={{ fontSize: 14, color: "#8A5E12", background: "#FDEDD3", borderRadius: 12, padding: "10px 12px", marginTop: 10, lineHeight: 1.5 }}>
              That address matched, but it's outside the district boundaries we have on file —
              double check it's in Jackson County.
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

const IssuesContext = React.createContext([]);

const ISSUE_SHORT = { taxes: "Taxes", schools: "Schools", safety: "Public safety", health: "Health care", housing: "Housing", jobs: "Jobs", roads: "Roads", environment: "Environment", abortion: "Abortion", guns: "Guns" };

// Which issues each stated position (by its order in the candidate's list) speaks to.
const CANDIDATE_TAGS = {
  "Scott Fitzpatrick": [["taxes"], ["taxes"], ["schools"], ["schools"], []],
  "Quentin Wilson": [[], [], []],
  "Dustin Coffell": [],
  "Stacy Lake": [["taxes"], ["taxes"], [], ["roads"]],
  "Alan Rohlfing": [["taxes"], ["taxes"], ["taxes"], [], ["safety", "roads"]],
  "Kelly Thompson": [[], [], []],
  "Tiffany Price": [["schools"], ["schools"], ["health"], ["safety", "jobs"], ["guns", "safety"]],
  "Susan B. Wilson": [["taxes"], [], ["safety"], ["jobs"]],
};
const MEASURE_TAGS = { amend3: ["abortion", "health"], amend6: [], amend7: ["taxes"], amend8: ["safety"], propA: [], combat: ["safety", "health"] };


// Plain-language direction on an issue, only where the candidate's own statements support it.
// dir: "lower" | "raise" | "unstated" | "none"
const DIR_LABEL = { lower: "Would lower", raise: "Would raise", unstated: "Rate not stated", none: "Doesn't set rates" };
const STANCES = {
  "Alan Rohlfing": { taxes: { dir: "unstated", text: "He has not said whether he would raise or lower tax rates. He wants faster refunds or credits for homeowners overcharged by the 2023 assessments, fairer assessments that are easier to appeal, and cuts to what he calls frivolous county spending." } },
  "Stacy Lake": { taxes: { dir: "unstated", text: "In the material we reviewed she has not said whether she would raise or lower tax rates. She wants property assessment moved in-house, the Tyler Technologies contract ended, and a forensic audit of county finances." } },
  "Susan B. Wilson": { taxes: { dir: "unstated", text: "She has not said whether she would raise or lower tax rates. She wants data-driven property assessments, a faster and clearer appeals process, and county budgets passed on time." } },
  "Scott Fitzpatrick": { taxes: { dir: "none", text: "The State Auditor does not set tax rates. He says he would audit how state and local governments spend tax money, including school districts." } },
};

function candidateMatches(c, mine) {
  const tags = CANDIDATE_TAGS[c.name] || [];
  const found = [];
  tags.forEach((t) => t.forEach((id) => { if (mine.includes(id) && !found.includes(id)) found.push(id); }));
  return found;
}

function MatchChips({ ids, name }) {
  if (!ids.length) return null;
  return (
    <span style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
      {ids.map((id) => (
        <span key={id} style={{ background: "var(--pill-a-bg)", color: "var(--pill-a-fg)", fontSize: 14, fontWeight: 700, borderRadius: 999, padding: "4px 11px" }}>
          {"\u2605 " + ISSUE_SHORT[id] + ((STANCES[name] && STANCES[name][id]) ? ": " + DIR_LABEL[STANCES[name][id].dir].toLowerCase() : "")}
        </span>
      ))}
    </span>
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
  myStateHouseDistrict,
  setMyStateHouseDistrict,
  myStateSenateDistrict,
  setMyStateSenateDistrict,
}) {
  const confirmedDistricts = [
    myIndividualDistrict,
    myAtLargeDistrict,
    myStateHouseDistrict,
    myStateSenateDistrict,
  ].filter(Boolean);
  const visibleRaces = races.filter(
    (r) =>
      r.appliesTo === "countywide" ||
      r.appliesTo === "statewide" ||
      confirmedDistricts.length === 0 ||
      confirmedDistricts.includes(r.appliesTo)
  );
  // Districts with no race loaded because the seat genuinely isn't on this
  // year's ballot (e.g. a state Senate seat not up this cycle) — distinct
  // from a district we just haven't researched yet.
  const NOT_ON_BALLOT_THIS_CYCLE = {
    "State Senate District 7": "Senate seats are staggered 4-year terms, and this one isn't up again until 2028.",
  };

  const myIssues = React.useContext(IssuesContext);
  const raceScore = (r) => r.candidates.reduce((n, c) => n + candidateMatches(c, myIssues).length, 0);
  const orderedRaces = visibleRaces.map((r, i) => ({ r, i, score: raceScore(r) })).sort((a, b) => b.score - a.score || a.i - b.i);
  const anyMatch = orderedRaces.some((x) => x.score > 0);
  const missingDistricts = confirmedDistricts.filter(
    (d) => !races.some((r) => r.appliesTo === d) && !NOT_ON_BALLOT_THIS_CYCLE[d]
  );
  const notOnBallotDistricts = confirmedDistricts.filter(
    (d) => !races.some((r) => r.appliesTo === d) && NOT_ON_BALLOT_THIS_CYCLE[d]
  );

  return (
    <div>
      <DistrictFinder
        myIndividualDistrict={myIndividualDistrict}
        setMyIndividualDistrict={setMyIndividualDistrict}
        myAtLargeDistrict={myAtLargeDistrict}
        setMyAtLargeDistrict={setMyAtLargeDistrict}
        myStateHouseDistrict={myStateHouseDistrict}
        setMyStateHouseDistrict={setMyStateHouseDistrict}
        myStateSenateDistrict={myStateSenateDistrict}
        setMyStateSenateDistrict={setMyStateSenateDistrict}
      />

      <div
        style={{
          fontSize: 14,
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
          Candidates for the November 3, 2026 election. Check each candidate's own website before relying on this.
        </span>
      </div>

      {missingDistricts.length > 0 && (
        <div
          style={{
            fontSize: 14,
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

      {notOnBallotDistricts.map((d) => (
        <div
          key={d}
          style={{
            fontSize: 14,
            background: "#F1ECDF",
            borderRadius: 14,
            padding: "10px 14px",
            marginBottom: 18,
            color: "#56657A",
          }}
        >
          Your {d} isn't on this year's ballot — {NOT_ON_BALLOT_THIS_CYCLE[d]}
        </div>
      ))}

      {anyMatch && (
        <div style={{ fontSize: 15, color: "#4E5A6C", marginBottom: 14, lineHeight: 1.45 }}>
          Races that touch your issues are listed first. A {"\u2605"} means the candidate has stated a position on that issue.
        </div>
      )}
      {orderedRaces.map(({ r: race }, i) => (
        <div key={i} style={{ marginBottom: 22 }}>
          <SectionLabel>{race.office}</SectionLabel>
          {race.candidates.map((c) => (
            <CandidateCard key={c.name} c={c} saved={saved.includes(c.name)} toggleSave={toggleSave} onOpen={onOpen} />
          ))}
        </div>
      ))}

      {confirmedDistricts.length > 0 && (
        <div style={{ marginTop: 8 }}>
          <SectionLabel>Amendments and questions on your ballot</SectionLabel>
          {MEASURES.filter((m) => m.level === "Statewide" || myIndividualDistrict || myAtLargeDistrict).map((m) => (
            <MeasureCard key={m.id} m={m} />
          ))}
        </div>
      )}
    </div>
  );
}

function RegStep({ step, index }) {
  // The step's description stays hidden until the reader taps its title.
  const [open, setOpen] = useState(false);
  return (
    <Card accent="#2F8F8A" style={{ padding: 0 }}>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "20px 18px 20px 20px", background: "none", border: "none", cursor: "pointer", textAlign: "left", color: "inherit" }}
      >
        <span style={{ width: 36, height: 36, minWidth: 36, borderRadius: "50%", background: "#DDEEEC", color: "#1F6F69", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 19 }}>
          {index + 1}
        </span>
        <span style={{ flex: 1, minWidth: 0, fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 21, lineHeight: 1.15 }}>{step.title}</span>
        <span style={{ fontSize: 18, fontWeight: 800, color: "#2F8F8A" }}>{open ? "\u25B2" : "\u25BC"}</span>
      </button>
      {open && (
        <div style={{ padding: "0 18px 18px 20px" }}>
          <div style={{ fontSize: 16, color: "#4E5A6C", lineHeight: 1.55 }}>{step.detail}</div>
          {step.link && (
            <a href={step.link} target="_blank" rel="noreferrer" style={{ fontSize: 16, fontWeight: 700, display: "inline-block", marginTop: 10 }}>
              {step.linkLabel} →
            </a>
          )}
        </div>
      )}
    </Card>
  );
}

function CandidateCard({ c, saved, toggleSave, onOpen }) {
  const mine = React.useContext(IssuesContext);
  // Only the name and party show until the reader taps the name.
  const [open, setOpen] = useState(false);
  return (
    <Card accent={c.party === "Democratic" ? "var(--sun)" : "var(--river)"} style={{ padding: 0 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", gap: 10, padding: "20px 8px 20px 20px", background: "none", border: "none", cursor: "pointer", textAlign: "left", color: "inherit" }}
        >
          <span style={{ flex: 1, minWidth: 0 }}>
            <span style={{ display: "block", fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 22, lineHeight: 1.15 }}>{c.name}</span>
            <span style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
              <Pill tone={c.party === "Democratic" ? "a" : "b"}>{c.party}</Pill>
              {c.incumbent && <Pill>Incumbent</Pill>}
            </span>
            <MatchChips name={c.name} ids={candidateMatches(c, mine)} />
          </span>
          <span style={{ fontSize: 18, fontWeight: 800, color: "var(--river)" }}>{open ? "▲" : "▼"}</span>
        </button>
        <button
          onClick={() => toggleSave(c.name)}
          style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", lineHeight: 1, padding: "20px 18px 20px 8px" }}
          aria-label="Save candidate"
        >
          {saved ? "⭐" : "☆"}
        </button>
      </div>
      {open && (
        <div style={{ padding: "0 18px 18px 20px" }}>
          <div style={{ fontSize: 16, color: "var(--body-text)", lineHeight: 1.55 }}>{c.headline}</div>
          <button
            onClick={() => onOpen(c)}
            style={{ background: "none", border: "none", padding: 0, marginTop: 12, fontSize: 16, fontWeight: 700, color: "var(--river)", cursor: "pointer" }}
          >
            View full positions →
          </button>
        </div>
      )}
    </Card>
  );
}

const MEASURES = [
  {
    id: "amend3", level: "Statewide", name: "Amendment 3", short: "Abortion and minors' gender transition care",
    kind: "Put on the ballot by the legislature",
    what: "Would repeal the abortion-rights amendment voters approved in 2024. Abortion would be allowed only in limited cases (medical emergencies, serious fetal anomalies, and rape or incest up to 12 weeks), and gender transition procedures for anyone under 18 would be banned.",
    yes: "Repeal the 2024 amendment and adopt these restrictions.",
    no: "Keep the 2024 constitutional protections as they are.",
    for: "Supporters (Missouri Republican Party guide) say it restores the right to sue over harm from an abortion, requires written parental consent for minors, and makes the ban on gender transition procedures for minors permanent.",
    against: "Opponents (Kansas City Defender guide) say voters already decided this in 2024, the measure bundles two separate issues, and restoring the right later would take another petition campaign.",
    result: "Unofficial result: rejected, 55% No to 45% Yes.",
  },
  {
    id: "amend6", level: "Statewide", name: "Amendment 6", short: "Protecting citizen-initiated laws",
    kind: "Put on the ballot by citizen petition",
    what: "Would make the initiative and referendum process a protected right, let courts correct misleading ballot summaries, and require 80% of both legislative chambers, plus a statewide vote, to change or repeal a law voters passed by initiative.",
    yes: "Adopt these protections for voter-passed laws.",
    no: "Keep current rules, where the legislature can change voter-passed laws more easily.",
    for: "Supporters (Kansas City Defender guide) point to the legislature repealing voter-approved paid sick leave months after it took effect, and say this makes that harder.",
    against: "Opponents (Missouri Republican Party guide) say it shields voter-passed laws from legislative change at a higher bar than amending the Constitution, and note a Cole County judge ruled it unconstitutional.",
    result: "Unofficial result: approved, 60% Yes to 40% No.",
  },
  {
    id: "amend7", level: "Statewide", name: "Amendment 7", short: "Show-Me Prosperity Investment Fund",
    kind: "Put on the ballot by the legislature",
    what: "Would create a permanent state-managed investment fund, limit the legislature's access to it, and use its earnings to eliminate state taxes once the earnings can replace them.",
    yes: "Create the fund.",
    no: "Do not create the fund.",
    for: "Supporters (Missouri Republican Party guide) say a 3% cap on withdrawals protects the fund, and cite Alaska's Permanent Fund as a model while acknowledging the goal would take generations.",
    against: "Opponents (Kansas City Defender guide, citing the Missouri Budget Project) say the fund starts with no money and would need over $600 billion to replace state taxes, against a general budget of about $13 billion a year.",
    result: "Unofficial result: rejected, 61% No to 39% Yes.",
  },
  {
    id: "amend8", level: "Statewide", name: "Amendment 8", short: "Elected county sheriffs",
    kind: "Put on the ballot by the legislature",
    what: "Would write the election of county sheriffs into the Missouri Constitution and allow an elected sheriff to be removed only through a court case brought by the state Attorney General.",
    yes: "Adopt these changes.",
    no: "Keep current rules, where local prosecutors can also seek a sheriff's removal.",
    for: "Supporters (Missouri Republican Party guide) say it keeps the legislature from replacing elected sheriffs with appointees, which matters most in rural counties.",
    against: "Opponents (Kansas City Defender guide) say it moves removal power to the Attorney General, which could make a sheriff very hard to remove, and that it uses undefined language about \"traitors.\"",
    result: "Unofficial result: approved, 51% Yes to 49% No.",
  },
  {
    id: "propA", level: "Statewide", name: "Proposition A", short: "2025 congressional map",
    kind: "Referendum petition on a law the legislature passed",
    what: "Asks voters whether to approve House Bill 1 (2025), which replaced Missouri's congressional district map.",
    yes: "Approve the new map.",
    no: "Reject the new map and keep the 2022 districts.",
    for: "Supporters (Missouri Republican Party guide) say the map keeps more counties whole and strengthens rural representation.",
    against: "Opponents (Kansas City Defender guide) say it was drawn to favor Republicans and splits Kansas City at Troost Avenue.",
    result: "Unofficial result: new map rejected, 62% No to 38% Yes.",
  },
  {
    id: "combat", level: "Jackson County", name: "Question 1", short: "COMBAT sales tax renewal",
    kind: "County question",
    what: "Renews a quarter-cent county sales tax (about $31 million a year) for ten years. It pays for drug treatment and prevention, plus prosecution, detention, and policing of violent crime and drug offenses.",
    yes: "Renew the tax for ten years.",
    no: "Let the tax expire.",
    for: "Supporters say it funds addiction treatment, recovery housing, violence interruption, and youth programs that many community groups depend on.",
    against: "Critics (Kansas City Defender guide) say about 63% of the money has gone to the justice system and 37% to community programs.",
    result: "Reported passed by The Beacon; vote totals not found yet.",
  },
];

function MeasureCard({ m }) {
  const mine = React.useContext(IssuesContext);
  // Details stay hidden until the reader taps the measure's name.
  const [open, setOpen] = useState(false);
  return (
    <Card accent="var(--river)" style={{ padding: 0 }}>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "20px 18px 20px 20px", background: "none", border: "none", cursor: "pointer", textAlign: "left", color: "inherit" }}
      >
        <span style={{ flex: 1, minWidth: 0 }}>
          <span style={{ display: "block", fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 24, lineHeight: 1.1 }}>{m.name}</span>
          <span style={{ display: "block", fontSize: 16, color: "var(--body-text)", marginTop: 4, lineHeight: 1.35 }}>{m.short}</span>
          <MatchChips ids={(MEASURE_TAGS[m.id] || []).filter((id) => mine.includes(id))} />
        </span>
        <span style={{ fontSize: 18, fontWeight: 800, color: "var(--river)" }}>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div style={{ padding: "0 18px 18px 20px" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--mist)", marginBottom: 8 }}>{m.kind}</div>
          <div style={{ fontSize: 16, color: "var(--body-text)", lineHeight: 1.55, marginBottom: 14 }}>{m.what}</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
            <div style={{ flex: "1 1 160px", minWidth: 0, background: "var(--support-bg)", borderRadius: 14, padding: "12px 14px" }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: "var(--sprout)", letterSpacing: 0.5, marginBottom: 4 }}>A YES VOTE</div>
              <div style={{ fontSize: 16, color: "var(--ink)", lineHeight: 1.45 }}>{m.yes}</div>
            </div>
            <div style={{ flex: "1 1 160px", minWidth: 0, background: "var(--oppose-bg)", borderRadius: 14, padding: "12px 14px" }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: "var(--ember)", letterSpacing: 0.5, marginBottom: 4 }}>A NO VOTE</div>
              <div style={{ fontSize: 16, color: "var(--ink)", lineHeight: 1.45 }}>{m.no}</div>
            </div>
          </div>
          <div style={{ fontSize: 14, fontWeight: 800, color: "var(--mist)", letterSpacing: 0.5, marginBottom: 4 }}>ARGUMENT FOR</div>
          <div style={{ fontSize: 16, color: "var(--body-text)", lineHeight: 1.5, marginBottom: 12 }}>{m.for}</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: "var(--mist)", letterSpacing: 0.5, marginBottom: 4 }}>ARGUMENT AGAINST</div>
          <div style={{ fontSize: 16, color: "var(--body-text)", lineHeight: 1.5, marginBottom: 14 }}>{m.against}</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", background: "var(--pill-neutral-bg)", borderRadius: 12, padding: "10px 12px" }}>{m.result}</div>
        </div>
      )}
    </Card>
  );
}

function MeasuresScreen() {
  const groups = ["Statewide", "Jackson County"];
  return (
    <div>
      <div style={{ fontSize: 16, color: "#4E5A6C", lineHeight: 1.55, marginBottom: 16 }}>
        Tap a question to see what a yes or no vote meant. Results are unofficial.
      </div>
      {groups.map((g) => (
        <div key={g} style={{ marginBottom: 12 }}>
          <SectionLabel>{g}</SectionLabel>
          {MEASURES.filter((m) => m.level === g).map((m) => (
            <MeasureCard key={m.id} m={m} />
          ))}
        </div>
      ))}
      <div style={{ fontSize: 13, color: "#8A93A3", lineHeight: 1.5 }}>
        Sources: Missouri Secretary of State certified ballot list, Ballotpedia, The Beacon, and two
        voter guides with stated viewpoints (Missouri Republican Party; Kansas City Defender).
      </div>
    </div>
  );
}

function HomeButton({ icon, title, sub, color, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ width: "100%", display: "flex", alignItems: "center", gap: 16, padding: "22px 20px", marginBottom: 14, borderRadius: 24, border: "none", background: "var(--card-bg)", color: "var(--ink)", cursor: "pointer", textAlign: "left", boxShadow: "0 2px 10px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.06)", minHeight: 104 }}
    >
      <span style={{ width: 60, height: 60, minWidth: 60, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30 }}>{icon}</span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: "block", fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 25, lineHeight: 1.1 }}>{title}</span>
        <span style={{ display: "block", fontSize: 16, color: "var(--body-text)", marginTop: 5, lineHeight: 1.35 }}>{sub}</span>
      </span>
      <span style={{ fontSize: 26, fontWeight: 700, color: "var(--river)" }}>{"›"}</span>
    </button>
  );
}

const ISSUES = [
  { id: "taxes", label: "Taxes and property assessments", icon: "\u{1F3E0}" },
  { id: "schools", label: "Schools and education", icon: "\u{1F393}" },
  { id: "safety", label: "Crime and public safety", icon: "\u{1F6A8}" },
  { id: "health", label: "Health care", icon: "\u{1FA7A}" },
  { id: "housing", label: "Housing costs", icon: "\u{1F511}" },
  { id: "jobs", label: "Jobs and wages", icon: "\u{1F4BC}" },
  { id: "roads", label: "Roads, transit and infrastructure", icon: "\u{1F6E3}️" },
  { id: "environment", label: "Environment and clean water", icon: "\u{1F333}" },
  { id: "abortion", label: "Abortion policy", icon: "⚕️" },
  { id: "guns", label: "Gun laws", icon: "⚖️" },
];
const MAX_ISSUES = 5;
const SETUP_KEY = "showme-setup-v1";

function readSetup() {
  try {
    const raw = localStorage.getItem(SETUP_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}
function writeSetup(v) {
  try { localStorage.setItem(SETUP_KEY, JSON.stringify(v)); } catch (e) {}
}

function IntroScreen({ initial, onDone }) {
  const [picked, setPicked] = useState(initial ? initial.issues : []);
  const toggle = (id) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : p.length >= MAX_ISSUES ? p : [...p, id]));
  const full = picked.length >= MAX_ISSUES;
  return (
    <div>
      <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 30, lineHeight: 1.15, marginBottom: 6 }}>
        What matters most to you?
      </div>
      <div style={{ fontSize: 17, color: "var(--body-text)", lineHeight: 1.45, marginBottom: 6 }}>
        Pick up to {MAX_ISSUES}. You can change this later.
      </div>
      <div style={{ fontSize: 15, fontWeight: 700, color: "var(--river)", marginBottom: 16 }}>
        {picked.length} of {MAX_ISSUES} picked
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        {ISSUES.map((it) => {
          const on = picked.includes(it.id);
          const locked = full && !on;
          return (
            <button
              key={it.id}
              onClick={() => toggle(it.id)}
              aria-pressed={on}
              style={{ display: "flex", alignItems: "center", gap: 14, width: "100%", minHeight: 64, padding: "12px 16px", borderRadius: 18, border: "3px solid " + (on ? "var(--river)" : "transparent"), background: on ? "var(--pill-b-bg)" : "var(--card-bg)", color: "var(--ink)", cursor: locked ? "default" : "pointer", opacity: locked ? 0.5 : 1, textAlign: "left", fontSize: 18, fontWeight: 700, boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }}
            >
              <span style={{ fontSize: 26, width: 34, textAlign: "center" }}>{it.icon}</span>
              <span style={{ flex: 1, minWidth: 0, lineHeight: 1.2 }}>{it.label}</span>
              <span style={{ fontSize: 22, fontWeight: 800, color: "var(--river)" }}>{on ? "✓" : ""}</span>
            </button>
          );
        })}
      </div>
      <div style={{ fontSize: 15, color: "var(--body-text)", lineHeight: 1.5, background: "var(--pill-neutral-bg)", borderRadius: 16, padding: "14px 16px", marginBottom: 16 }}>
        We count your picks anonymously to see what voters care about. We never store your name, address or contact info.
      </div>
      <button
        onClick={() => onDone(picked, true)}
        disabled={picked.length === 0}
        style={{ width: "100%", minHeight: 58, borderRadius: 18, border: "none", background: "var(--river)", color: "#fff", fontSize: 18, fontWeight: 800, cursor: picked.length ? "pointer" : "default", opacity: picked.length ? 1 : 0.5, marginBottom: 10 }}
      >
        Share anonymously and continue
      </button>
      <div style={{ fontSize: 13, color: "var(--mist)", textAlign: "center", marginTop: 6 }}>
        Your picks are also saved on this device.
      </div>
    </div>
  );
}

function HomeScreen({ go, setup }) {
  return (
    <div>
      <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 30, lineHeight: 1.15, marginBottom: 6 }}>
        What do you want to do?
      </div>
      <div style={{ fontSize: 17, color: "var(--body-text)", lineHeight: 1.45, marginBottom: 22 }}>
        Pick one. You can come back here any time.
      </div>
      <HomeButton icon={"\u{1F5F3}️"} title="Register to vote" sub="Four short steps" color="var(--pill-a-bg)" onClick={() => go("register")} />
      <HomeButton icon={"\u{1F4CB}"} title="Who and what's on my ballot?" sub="Enter your address to see candidates and amendments" color="var(--pill-b-bg)" onClick={() => go("candidates")} />
      <HomeButton icon={"\u{1F4DA}"} title="How voting works" sub="Federal, state and county" color="var(--support-bg)" onClick={() => go("learn")} />
      <div style={{ marginTop: 8, fontSize: 16, color: "var(--body-text)", lineHeight: 1.5 }}>
        {setup && setup.issues.length > 0 ? (
          <span>
            <strong>Your issues:</strong> {setup.issues.map((id) => (ISSUES.find((i) => i.id === id) || {}).label).join(", ")}.{" "}
          </span>
        ) : (
          <span>You haven't picked any issues yet. </span>
        )}
        <button onClick={() => go("intro")} style={{ background: "none", border: "none", padding: 0, color: "var(--river)", fontSize: 16, fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}>
          {setup && setup.issues.length > 0 ? "Change" : "Pick issues"}
        </button>
      </div>
    </div>
  );
}

function PositionList({ title, items, tone, tags }) {
  const mine = React.useContext(IssuesContext);
  const color = tone === "for" ? "var(--sprout)" : "var(--ember)";
  const bg = tone === "for" ? "var(--support-bg)" : "var(--oppose-bg)";
  return (
    <div style={{ marginBottom: 14, background: bg, borderRadius: 16, padding: "14px 16px" }}>
      <div style={{ fontSize: 14, fontWeight: 800, color, letterSpacing: 0.5, marginBottom: 8 }}>{title}</div>
      <ul style={{ margin: 0, paddingLeft: 18, fontSize: 16, lineHeight: 1.65, color: "var(--ink)" }}>
        {items.map((it, i) => {
          const hit = tags && tags[i] ? tags[i].filter((id) => mine.includes(id)) : [];
          return (
            <li key={i} style={hit.length ? { fontWeight: 700 } : undefined}>
              {it}
              {hit.length > 0 && <span style={{ color: "var(--pill-a-fg)", fontSize: 14 }}>{" \u2605 " + hit.map((id) => ISSUE_SHORT[id]).join(", ")}</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function CandidateDetail({ candidate: c, saved, onSave, onBack }) {
  const mine = React.useContext(IssuesContext);
  const stanceIds = candidateMatches(c, mine).filter((id) => STANCES[c.name] && STANCES[c.name][id]);
  return (
    <div>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "var(--river)", fontWeight: 700, fontSize: 16, marginBottom: 14, cursor: "pointer", padding: 0 }}>← Back to candidates</button>
      <div style={{ background: "linear-gradient(135deg, var(--ink) 0%, var(--river) 130%)", borderRadius: 20, padding: 20, color: "#FBF6EC", marginBottom: 16, boxShadow: "0 8px 20px rgba(0,0,0,0.25)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 23 }}>{c.name}</div>
            <div style={{ marginTop: 8, display: "flex", gap: 6, flexWrap: "wrap" }}>
              <span style={{ background: "rgba(255,255,255,0.18)", borderRadius: 999, padding: "3px 10px", fontSize: 14, fontWeight: 700 }}>{c.party}</span>
              {c.incumbent && <span style={{ background: "rgba(255,255,255,0.18)", borderRadius: 999, padding: "3px 10px", fontSize: 14, fontWeight: 700 }}>Incumbent</span>}
            </div>
          </div>
          <button onClick={onSave} style={{ background: "none", border: "none", fontSize: 26, cursor: "pointer" }} aria-label="Save candidate">{saved ? "\u2B50" : "\u2606"}</button>
        </div>
        <div style={{ fontSize: 16, marginTop: 12, opacity: 0.92 }}>{c.headline}</div>
      </div>

      {stanceIds.length > 0 && (
        <div style={{ background: "var(--pill-a-bg)", borderRadius: 16, padding: "14px 16px", marginBottom: 14 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: "var(--pill-a-fg)", letterSpacing: 0.5, marginBottom: 8 }}>ON YOUR ISSUES</div>
          {stanceIds.map((id) => {
            const st = STANCES[c.name][id];
            const col = st.dir === "lower" ? "var(--sprout)" : st.dir === "raise" ? "var(--ember)" : "var(--mist)";
            return (
              <div key={id} style={{ marginBottom: 6 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 4 }}>
                  <span style={{ fontSize: 17, fontWeight: 800, color: "var(--ink)" }}>{ISSUE_SHORT[id]}</span>
                  <span style={{ fontSize: 14, fontWeight: 800, color: "#fff", background: col, borderRadius: 999, padding: "3px 11px" }}>{DIR_LABEL[st.dir]}</span>
                </div>
                <div style={{ fontSize: 16, color: "var(--ink)", lineHeight: 1.5 }}>{st.text}</div>
              </div>
            );
          })}
        </div>
      )}
      {c.supports && c.supports.length > 0 && <PositionList title="STATED SUPPORT" items={c.supports} tone="for" tags={CANDIDATE_TAGS[c.name]} />}
      {c.opposes && c.opposes.length > 0 && <PositionList title="STATED OPPOSITION" items={c.opposes} tone="against" />}
      {(!c.supports || c.supports.length === 0) && (!c.opposes || c.opposes.length === 0) && (
        <div style={{ fontSize: 14, color: "var(--mist)", background: "var(--pill-neutral-bg)", borderRadius: 14, padding: "12px 14px", marginBottom: 14 }}>
          No specific stated positions found yet for this candidate — see the note below.
        </div>
      )}

      <div style={{ background: "var(--card-bg)", border: "1px solid var(--input-border)", borderRadius: 16, padding: 16, marginTop: 4 }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: "var(--sun)", marginBottom: 6 }}>HOW THIS COULD AFFECT YOU</div>
        <div style={{ fontSize: 16, lineHeight: 1.6, color: "var(--ink)" }}>{c.impact}</div>
      </div>

      {c.website && (
        <a href={c.website} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "var(--ink)", color: "#FBF6EC", fontWeight: 700, fontSize: 16, padding: "13px 16px", borderRadius: 14, marginTop: 14 }}>
          Visit {c.name.split(" ")[0]}'s campaign website ↗
        </a>
      )}

      <div style={{ fontSize: 13, color: "var(--mist)", marginTop: 14, lineHeight: 1.5 }}>
        Positions are summarized from public campaign statements and local election reporting (Oct 2026) and simplified for readability. Always check a candidate's official site for their full, current platform before voting.
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
        <div style={{ fontSize: 14, marginTop: 4 }}>
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
              <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 19 }}>
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
