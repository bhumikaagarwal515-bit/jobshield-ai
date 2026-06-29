import { useState } from "react";
import { AlertTriangle, CheckCircle2, AlertCircle, Loader2, Languages, ShieldCheck } from "lucide-react";

const TEXT = {
  en: {
    brand: "JobShield AI",
    tagline: "Verify any job posting instantly",
    placeholder: "Paste the full job posting here — company name, salary, description, contact details...",
    analyzeBtn: "Analyze Posting",
    analyzing: "Scanning for red flags...",
    emptyError: "Please paste a job posting first.",
    resultTitle: "Analysis Result",
    riskScore: "Risk Score",
    redFlagsTitle: "Red Flags Found",
    noFlags: "No red flags detected.",
    verdicts: { green: "Looks Genuine", yellow: "Proceed with Caution", red: "Likely Fraud" },
    newScan: "Analyze Another",
  },
  hi: {
    brand: "JobShield AI",
    tagline: "किसी भी जॉब पोस्टिंग को तुरंत जांचें",
    placeholder: "यहां पूरी जॉब पोस्टिंग पेस्ट करें — कंपनी का नाम, वेतन, विवरण, संपर्क विवरण...",
    analyzeBtn: "जांच करें",
    analyzing: "रेड फ्लैग्स खोजे जा रहे हैं...",
    emptyError: "पहले जॉब पोस्टिंग पेस्ट करें।",
    resultTitle: "जांच का परिणाम",
    riskScore: "जोखिम स्कोर",
    redFlagsTitle: "मिले हुए रेड फ्लैग्स",
    noFlags: "कोई रेड फ्लैग नहीं मिला।",
    verdicts: { green: "असली लगता है", yellow: "सावधानी से आगे बढ़ें", red: "धोखाधड़ी की संभावना" },
    newScan: "दोबारा जांच करें",
  },
};

async function callAnalyzeAPI(jobText) {
  // ---- REAL BACKEND CALL ----
  // const res = await fetch("http://localhost:8000/analyze", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ text: jobText }),
  // });
  // if (!res.ok) throw new Error("Server error");
  // return await res.json();

  await new Promise((r) => setTimeout(r, 1600));
  const isFraud = jobText.toLowerCase().includes("fee") || jobText.toLowerCase().includes("upfront");
  return isFraud
    ? { risk_score: 92, verdict: "red", red_flags: ["Asks for upfront payment / registration fee", "Unrealistic salary for the role described", "Vague company name with no verifiable details", "Contact only via personal WhatsApp number"] }
    : { risk_score: 12, verdict: "green", red_flags: [] };
}

const STYLES = {
  green: { border: "#6B8C5A", bg: "#f0f5ec", text: "#4a6b38", bar: "#6B8C5A", icon: CheckCircle2 },
  yellow: { border: "#d97706", bg: "#fffbeb", text: "#b45309", bar: "#f59e0b", icon: AlertCircle },
  red: { border: "#dc2626", bg: "#fff5f5", text: "#dc2626", bar: "#ef4444", icon: AlertTriangle },
};

function scoreToVerdict(s) { return s >= 70 ? "red" : s >= 40 ? "yellow" : "green"; }

export default function App() {
  const [lang, setLang] = useState("en");
  const [jobText, setJobText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const t = TEXT[lang];

  async function handleAnalyze() {
    if (!jobText.trim()) { setError(t.emptyError); return; }
    setError(""); setResult(null); setLoading(true);
    try {
      const data = await callAnalyzeAPI(jobText);
      setResult({ ...data, verdict: data.verdict || scoreToVerdict(data.risk_score) });
    } catch { setError("Something went wrong. Try again."); }
    finally { setLoading(false); }
  }

  function reset() { setResult(null); setJobText(""); setError(""); }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F2F0EB", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", fontFamily: "'Inter', sans-serif" }}>

      {/* TOP NAV */}
      <div style={{ width: "100%", maxWidth: "480px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        {/* LOGO */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "38px", height: "38px", borderRadius: "50%", backgroundColor: "#e8f0e1", border: "2px solid #6B8C5A", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ShieldCheck size={20} color="#4a6b38" strokeWidth={2} />
          </div>
          <div>
            <div style={{ fontWeight: "700", fontSize: "16px", color: "#2c3a20", fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.1 }}>JobShield AI</div>
            <div style={{ fontSize: "9px", color: "#6B8C5A", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: "600" }}>Trusted Job Verifier</div>
          </div>
        </div>

        {/* LANG TOGGLE */}
        <button onClick={() => setLang(lang === "en" ? "hi" : "en")}
          style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", padding: "6px 14px", borderRadius: "20px", border: "1.5px solid #c8d4bc", backgroundColor: "#edf0e8", color: "#4a6b38", cursor: "pointer", fontWeight: "500" }}>
          <Languages size={13} />
          {lang === "en" ? "हिंदी" : "English"}
        </button>
      </div>

      {/* MAIN CARD */}
      <div style={{ width: "100%", maxWidth: "480px", backgroundColor: "#ffffff", borderRadius: "20px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", border: "1px solid #dde5d4", padding: "28px" }}>

        {!result ? (
          <>
            <div style={{ marginBottom: "16px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#2c3a20", margin: "0 0 4px 0", fontFamily: "'Space Grotesk', sans-serif" }}>{t.tagline}</h2>
            </div>

            <textarea
              value={jobText}
              onChange={(e) => setJobText(e.target.value)}
              placeholder={t.placeholder}
              rows={7}
              disabled={loading}
              style={{ width: "100%", resize: "none", borderRadius: "12px", border: "1.5px solid #d6ddd0", padding: "14px", fontSize: "14px", color: "#2c3a20", backgroundColor: "#fafaf8", outline: "none", boxSizing: "border-box", fontFamily: "'Inter', sans-serif", marginBottom: "4px" }}
              onFocus={e => e.target.style.borderColor = "#6B8C5A"}
              onBlur={e => e.target.style.borderColor = "#d6ddd0"}
            />

            {error && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#dc2626", fontSize: "13px", marginBottom: "10px" }}>
                <AlertCircle size={14} /> {error}
              </div>
            )}

            <button onClick={handleAnalyze} disabled={loading}
              style={{ width: "100%", padding: "14px", borderRadius: "12px", backgroundColor: loading ? "#9ab08a" : "#6B8C5A", color: "#fff", fontWeight: "600", fontSize: "15px", border: "none", cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "12px" }}>
              {loading ? <><Loader2 size={16} className="animate-spin" style={{ animation: "spin 1s linear infinite" }} />{t.analyzing}</> : <><ShieldCheck size={16} />{t.analyzeBtn}</>}
            </button>
          </>
        ) : (
          <>
            {/* RESULT */}
            <div style={{ border: `2px solid ${STYLES[result.verdict].border}`, backgroundColor: STYLES[result.verdict].bg, borderRadius: "14px", padding: "20px", marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#7a8c6e", fontWeight: "600" }}>{t.resultTitle}</span>
                {(() => { const Icon = STYLES[result.verdict].icon; return (
                  <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "13px", fontWeight: "700", color: STYLES[result.verdict].text }}>
                    <Icon size={15} />{t.verdicts[result.verdict]}
                  </span>
                ); })()}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                <span style={{ fontSize: "13px", color: "#7a8c6e" }}>{t.riskScore}</span>
                <span style={{ fontSize: "26px", fontWeight: "800", color: STYLES[result.verdict].text, fontFamily: "'Space Grotesk', sans-serif" }}>
                  {result.risk_score}<span style={{ fontSize: "13px", color: "#aaa", fontWeight: "400" }}>/100</span>
                </span>
              </div>
              <div style={{ height: "8px", borderRadius: "99px", backgroundColor: "#e0e7d8", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${result.risk_score}%`, backgroundColor: STYLES[result.verdict].bar, borderRadius: "99px", transition: "width 0.7s ease-out" }} />
              </div>
            </div>

            {/* RED FLAGS */}
            <div style={{ border: "1px solid #dde5d4", borderRadius: "14px", padding: "18px", marginBottom: "16px", backgroundColor: "#fafaf8" }}>
              <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#7a8c6e", fontWeight: "600", marginBottom: "12px" }}>{t.redFlagsTitle}</div>
              {result.red_flags.length === 0 ? (
                <div style={{ display: "flex", alignItems: "center", gap: "7px", color: "#6B8C5A", fontSize: "14px" }}>
                  <CheckCircle2 size={15} /> {t.noFlags}
                </div>
              ) : (
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                  {result.red_flags.map((flag, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "14px", color: "#3d4f30" }}>
                      <AlertTriangle size={15} color="#dc2626" style={{ marginTop: "2px", flexShrink: 0 }} />{flag}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button onClick={reset}
              style={{ width: "100%", padding: "12px", borderRadius: "12px", border: "1.5px solid #c8d4bc", backgroundColor: "#edf0e8", color: "#4a6b38", fontWeight: "600", fontSize: "14px", cursor: "pointer" }}>
              {t.newScan}
            </button>
          </>
        )}
      </div>

      {/* FOOTER */}
      <div style={{ marginTop: "16px", fontSize: "11px", color: "#9aaa8e" }}>Protected by JobShield AI • Powered by Claude</div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
