import { useState } from "react";
import { Shield, AlertTriangle, CheckCircle2, AlertCircle, Loader2, Languages, ClipboardPaste } from "lucide-react";

// ---------------------------------------------------------
// BILINGUAL TEXT
// ---------------------------------------------------------
const TEXT = {
  en: {
    brand: "JobShield AI",
    tagline: "Paste a job posting. We'll tell you if it's safe.",
    placeholder: "Paste the full job posting text here — company name, salary, description, contact details...",
    analyzeBtn: "Analyze Posting",
    analyzing: "Scanning for red flags...",
    pasteBtn: "Paste",
    emptyError: "Paste a job posting first.",
    resultTitle: "Analysis Result",
    riskScore: "Risk Score",
    redFlagsTitle: "Red Flags Found",
    noFlags: "No red flags detected.",
    verdicts: { green: "Looks Genuine", yellow: "Proceed with Caution", red: "Likely Fraud" },
    newScan: "Analyze Another",
  },
  hi: {
    brand: "JobShield AI",
    tagline: "नौकरी की पोस्टिंग पेस्ट करें। हम बताएंगे यह सुरक्षित है या नहीं।",
    placeholder: "यहां पूरी जॉब पोस्टिंग पेस्ट करें — कंपनी का नाम, वेतन, विवरण, संपर्क विवरण...",
    analyzeBtn: "जांच करें",
    analyzing: "रेड फ्लैग्स खोजे जा रहे हैं...",
    pasteBtn: "पेस्ट करें",
    emptyError: "पहले जॉब पोस्टिंग पेस्ट करें।",
    resultTitle: "जांच का परिणाम",
    riskScore: "जोखिम स्कोर",
    redFlagsTitle: "मिले हुए रेड फ्लैग्स",
    noFlags: "कोई रेड फ्लैग नहीं मिला।",
    verdicts: { green: "असली लगता है", yellow: "सावधानी से आगे बढ़ें", red: "धोखाधड़ी की संभावना" },
    newScan: "दोबारा जांच करें",
  },
};

// ---------------------------------------------------------
// API CALL
// ---------------------------------------------------------
async function callAnalyzeAPI(jobText) {
  // ---- REAL BACKEND CALL (uncomment when Person 1 backend ready) ----
  // const res = await fetch("http://localhost:8000/analyze", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ text: jobText }),
  // });
  // if (!res.ok) throw new Error("Server error");
  // return await res.json();

  // ---- DUMMY DATA ----
  await new Promise((r) => setTimeout(r, 1600));
  const isFraud = jobText.toLowerCase().includes("fee") || jobText.toLowerCase().includes("upfront");
  return isFraud
    ? {
        risk_score: 92,
        verdict: "red",
        red_flags: [
          "Asks for upfront payment / registration fee",
          "Unrealistic salary for the role described",
          "Vague company name with no verifiable details",
          "Contact only via personal WhatsApp number",
        ],
      }
    : { risk_score: 12, verdict: "green", red_flags: [] };
}

// ---------------------------------------------------------
// COLOUR PALETTE
// Olive Green  → #5C6B3A  (primary actions, accents)
// Light Olive  → #7A8C4E  (hover states)
// Off-White    → #F7F5EF  (page background)
// Card White   → #FFFFFF  (card surfaces)
// Border       → #DDD9CE  (subtle borders)
// Text Dark    → #2C2C1E  (headings)
// Text Mid     → #5A5A42  (body)
// Text Light   → #8C8C72  (hints/labels)
// ---------------------------------------------------------

const VERDICT_STYLES = {
  green: {
    ring: "ring-2 ring-emerald-400/50",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    bar: "bg-emerald-500",
    border: "border-emerald-200",
    icon: CheckCircle2,
  },
  yellow: {
    ring: "ring-2 ring-amber-400/50",
    bg: "bg-amber-50",
    text: "text-amber-700",
    bar: "bg-amber-500",
    border: "border-amber-200",
    icon: AlertCircle,
  },
  red: {
    ring: "ring-2 ring-red-400/50",
    bg: "bg-red-50",
    text: "text-red-700",
    bar: "bg-red-500",
    border: "border-red-200",
    icon: AlertTriangle,
  },
};

function scoreToVerdict(score) {
  if (score >= 70) return "red";
  if (score >= 40) return "yellow";
  return "green";
}

// ---------------------------------------------------------
// JOBSHIELD LOGO COMPONENT
// ---------------------------------------------------------
function JobShieldLogo() {
  return (
    <div className="flex items-center gap-2.5">
      {/* Shield with subtle green glow behind it */}
      <div className="relative flex items-center justify-center">
        {/* Green trust circle behind shield */}
        <div
          className="absolute w-10 h-10 rounded-full"
          style={{ background: "radial-gradient(circle, #7A8C4E55 0%, #5C6B3A22 60%, transparent 100%)" }}
        />
        {/* Outer ring */}
        <div
          className="absolute w-9 h-9 rounded-full border-2"
          style={{ borderColor: "#5C6B3A33" }}
        />
        {/* Shield icon */}
        <Shield
          className="relative w-7 h-7"
          style={{ color: "#5C6B3A" }}
          strokeWidth={2}
          fill="#5C6B3A18"
        />
        {/* Small checkmark dot at bottom of shield */}
        <div
          className="absolute bottom-0 right-0 w-3 h-3 rounded-full flex items-center justify-center"
          style={{ background: "#5C6B3A", border: "1.5px solid #F7F5EF" }}
        >
          <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
            <path d="M1.5 3.5L3 5L5.5 2" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Brand name */}
      <div className="flex flex-col leading-none">
        <span
          className="font-bold text-base sm:text-lg tracking-tight"
          style={{ color: "#2C2C1E", fontFamily: "'Space Grotesk', system-ui, sans-serif", letterSpacing: "-0.02em" }}
        >
          Job<span style={{ color: "#5C6B3A" }}>Shield</span>
        </span>
        <span
          className="text-[9px] font-medium tracking-widest uppercase"
          style={{ color: "#8C8C72" }}
        >
          AI Verified
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// MAIN APP
// ---------------------------------------------------------
export default function App() {
  const [lang, setLang] = useState("en");
  const [jobText, setJobText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const t = TEXT[lang];

  async function handleAnalyze() {
    if (!jobText.trim()) {
      setError(t.emptyError);
      return;
    }
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const data = await callAnalyzeAPI(jobText);
      const verdict = data.verdict || scoreToVerdict(data.risk_score);
      setResult({ ...data, verdict });
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handlePaste() {
    try {
      const clip = await navigator.clipboard.readText();
      setJobText(clip);
    } catch {
      // clipboard permission denied
    }
  }

  function reset() {
    setResult(null);
    setJobText("");
    setError("");
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center px-4 py-10 sm:py-16"
      style={{ background: "#F7F5EF", color: "#2C2C1E" }}
    >
      {/* ---------- HEADER ---------- */}
      <header className="w-full max-w-2xl flex items-center justify-between mb-10 sm:mb-14">
        <JobShieldLogo />

        <button
          onClick={() => setLang(lang === "en" ? "hi" : "en")}
          className="flex items-center gap-1.5 text-xs sm:text-sm px-3.5 py-2 rounded-full border font-medium transition-colors"
          style={{
            borderColor: "#DDD9CE",
            background: "#FFFFFF",
            color: "#5A5A42",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#5C6B3A"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#5C6B3A"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#FFFFFF"; e.currentTarget.style.color = "#5A5A42"; e.currentTarget.style.borderColor = "#DDD9CE"; }}
        >
          <Languages className="w-3.5 h-3.5" />
          {lang === "en" ? "हिंदी" : "English"}
        </button>
      </header>

      {/* ---------- HERO LINE ---------- */}
      <div className="w-full max-w-2xl mb-6">
        <p className="text-sm sm:text-base" style={{ color: "#5A5A42" }}>{t.tagline}</p>
      </div>

      {/* ---------- MAIN CARD ---------- */}
      <main className="w-full max-w-2xl">
        {!result && (
          <div
            className="rounded-2xl p-6 sm:p-8 space-y-4"
            style={{ background: "#FFFFFF", border: "1px solid #DDD9CE", boxShadow: "0 2px 12px 0 #2C2C1E0A" }}
          >
            <div className="relative">
              <textarea
                value={jobText}
                onChange={(e) => setJobText(e.target.value)}
                placeholder={t.placeholder}
                rows={9}
                disabled={loading}
                className="w-full resize-none rounded-xl outline-none p-4 sm:p-5 text-sm sm:text-base transition-colors disabled:opacity-50"
                style={{
                  background: "#F7F5EF",
                  border: "1.5px solid #DDD9CE",
                  color: "#2C2C1E",
                  fontFamily: "system-ui, sans-serif",
                }}
                onFocus={e => { e.currentTarget.style.borderColor = "#5C6B3A"; e.currentTarget.style.boxShadow = "0 0 0 3px #5C6B3A18"; }}
                onBlur={e => { e.currentTarget.style.borderColor = "#DDD9CE"; e.currentTarget.style.boxShadow = "none"; }}
              />
              {/* Placeholder text color fix via inline style */}
              <style>{`textarea::placeholder { color: #A0A08A; }`}</style>

              <button
                onClick={handlePaste}
                disabled={loading}
                className="absolute top-3 right-3 flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg transition-colors disabled:opacity-0"
                style={{ background: "#F0EDE4", color: "#5C6B3A", border: "1px solid #DDD9CE" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#5C6B3A"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#F0EDE4"; e.currentTarget.style.color = "#5C6B3A"; }}
              >
                <ClipboardPaste className="w-3.5 h-3.5" />
                {t.pasteBtn}
              </button>
            </div>

            {error && (
              <p className="text-red-600 text-sm flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" /> {error}
              </p>
            )}

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full rounded-xl font-semibold py-3.5 sm:py-4 text-sm sm:text-base transition-all flex items-center justify-center gap-2"
              style={{
                background: loading ? "#8C9E6A" : "#5C6B3A",
                color: "#FFFFFF",
                letterSpacing: "0.01em",
                boxShadow: loading ? "none" : "0 2px 8px #5C6B3A44",
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "#4A5A2E"; }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.background = "#5C6B3A"; }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {t.analyzing}
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  {t.analyzeBtn}
                </>
              )}
            </button>
          </div>
        )}

        {/* ---------- RESULT ---------- */}
        {result && (
          <div className="space-y-4 animate-[slideInFromRight_0.35s_ease-out]">
            {/* Verdict Card */}
            <div
              className={`rounded-2xl border p-5 sm:p-6 ${VERDICT_STYLES[result.verdict].bg} ${VERDICT_STYLES[result.verdict].border} ${VERDICT_STYLES[result.verdict].ring}`}
              style={{ boxShadow: "0 2px 12px 0 #2C2C1E0A" }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-wider font-medium" style={{ color: "#8C8C72" }}>
                  {t.resultTitle}
                </span>
                {(() => {
                  const Icon = VERDICT_STYLES[result.verdict].icon;
                  return (
                    <span className={`flex items-center gap-1.5 text-sm font-semibold ${VERDICT_STYLES[result.verdict].text}`}>
                      <Icon className="w-4 h-4" />
                      {t.verdicts[result.verdict]}
                    </span>
                  );
                })()}
              </div>

              <div className="mb-1.5 flex items-baseline justify-between">
                <span className="text-sm font-medium" style={{ color: "#5A5A42" }}>{t.riskScore}</span>
                <span
                  className={`text-2xl font-bold ${VERDICT_STYLES[result.verdict].text}`}
                  style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
                >
                  {result.risk_score}
                  <span className="text-sm font-normal" style={{ color: "#8C8C72" }}>/100</span>
                </span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: "#E8E5DC" }}>
                <div
                  className={`h-full rounded-full ${VERDICT_STYLES[result.verdict].bar} transition-all duration-700 ease-out`}
                  style={{ width: `${result.risk_score}%` }}
                />
              </div>
            </div>

            {/* Red Flags Card */}
            <div
              className="rounded-2xl p-5 sm:p-6"
              style={{ background: "#FFFFFF", border: "1px solid #DDD9CE", boxShadow: "0 2px 12px 0 #2C2C1E0A" }}
            >
              <span className="text-xs uppercase tracking-wider font-medium mb-3 block" style={{ color: "#8C8C72" }}>
                {t.redFlagsTitle}
              </span>
              {result.red_flags.length === 0 ? (
                <p className="text-sm flex items-center gap-1.5" style={{ color: "#5A5A42" }}>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {t.noFlags}
                </p>
              ) : (
                <ul className="space-y-2.5">
                  {result.red_flags.map((flag, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm sm:text-base animate-[slideInFromLeft_0.25s_ease-out]"
                      style={{ color: "#2C2C1E", animationDelay: `${i * 60}ms`, animationFillMode: "backwards" }}
                    >
                      <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-red-500" />
                      {flag}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* New Scan Button */}
            <button
              onClick={reset}
              className="w-full rounded-xl border font-medium py-3.5 sm:py-4 text-sm sm:text-base transition-colors"
              style={{ borderColor: "#DDD9CE", background: "#FFFFFF", color: "#5A5A42" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#5C6B3A"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#5C6B3A"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#FFFFFF"; e.currentTarget.style.color = "#5A5A42"; e.currentTarget.style.borderColor = "#DDD9CE"; }}
            >
              {t.newScan}
            </button>
          </div>
        )}
      </main>

      {/* ---------- FOOTER TRUST BAR ---------- */}
      <footer className="mt-12 flex items-center gap-2 text-xs" style={{ color: "#8C8C72" }}>
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#5C6B3A" }} />
        AI-powered fraud detection
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#5C6B3A" }} />
        No data stored
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#5C6B3A" }} />
        Free to use
      </footer>
    </div>
  );
}
