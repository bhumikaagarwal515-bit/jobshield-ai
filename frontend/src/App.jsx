import { useState } from "react";
import { Shield, AlertTriangle, CheckCircle2, AlertCircle, Loader2, Languages, ClipboardPaste, ShieldCheck } from "lucide-react";

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

const VERDICT_STYLES = {
  green: {
    border: "border-[#6B8C5A]",
    bg: "bg-[#f0f5ec]",
    text: "text-[#4a6b38]",
    bar: "bg-[#6B8C5A]",
    icon: CheckCircle2,
  },
  yellow: {
    border: "border-amber-400",
    bg: "bg-amber-50",
    text: "text-amber-700",
    bar: "bg-amber-400",
    icon: AlertCircle,
  },
  red: {
    border: "border-red-400",
    bg: "bg-red-50",
    text: "text-red-600",
    bar: "bg-red-500",
    icon: AlertTriangle,
  },
};

function scoreToVerdict(score) {
  if (score >= 70) return "red";
  if (score >= 40) return "yellow";
  return "green";
}

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
      const verdict = data.verdict || scoreToVerdict(data.risk_score);
      setResult({ ...data, verdict });
    } catch { setError("Something went wrong. Try again."); }
    finally { setLoading(false); }
  }

  async function handlePaste() {
    try { const clip = await navigator.clipboard.readText(); setJobText(clip); } catch {}
  }

  function reset() { setResult(null); setJobText(""); setError(""); }

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-10 sm:py-16"
      style={{ backgroundColor: "#F7F5F0", fontFamily: "'Inter', sans-serif" }}>

      {/* HEADER */}
      <header className="w-full max-w-2xl flex items-center justify-between mb-10 sm:mb-14">
        <div className="flex items-center gap-3">
          {/* LOGO — green trusted badge behind shield */}
          <div className="relative flex items-center justify-center w-11 h-11">
            <div className="absolute inset-0 rounded-full bg-[#6B8C5A] opacity-15"></div>
            <div className="absolute inset-[3px] rounded-full bg-[#6B8C5A] opacity-10"></div>
            <ShieldCheck className="w-7 h-7 text-[#4a6b38] relative z-10" strokeWidth={1.8} />
          </div>
          <div>
            <span className="font-bold text-lg sm:text-xl text-[#2c3a20] tracking-tight block leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              JobShield AI
            </span>
            <span className="text-[10px] text-[#6B8C5A] font-medium tracking-widest uppercase">Trusted Job Verifier</span>
          </div>
        </div>

        <button
          onClick={() => setLang(lang === "en" ? "hi" : "en")}
          className="flex items-center gap-1.5 text-xs sm:text-sm px-3 py-1.5 rounded-full border transition-colors"
          style={{ borderColor: "#c8d4bc", backgroundColor: "#edf0e8", color: "#4a6b38" }}
        >
          <Languages className="w-3.5 h-3.5" />
          {lang === "en" ? "हिंदी" : "English"}
        </button>
      </header>

      {/* MAIN */}
      <main className="w-full max-w-2xl">
        <p className="text-sm sm:text-base mb-6" style={{ color: "#7a8c6e" }}>{t.tagline}</p>

        {!result && (
          <div className="space-y-3">
            <div className="relative">
              <textarea
                value={jobText}
                onChange={(e) => setJobText(e.target.value)}
                placeholder={t.placeholder}
                rows={9}
                disabled={loading}
                className="w-full resize-none rounded-2xl outline-none p-4 sm:p-5 text-sm sm:text-base transition-colors disabled:opacity-50"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1.5px solid #d6ddd0",
                  color: "#2c3a20",
                  caretColor: "#6B8C5A",
                }}
                onFocus={e => e.target.style.borderColor = "#6B8C5A"}
                onBlur={e => e.target.style.borderColor = "#d6ddd0"}
              />
              <button
                onClick={handlePaste}
                disabled={loading}
                className="absolute top-3 right-3 flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg transition-colors"
                style={{ backgroundColor: "#edf0e8", color: "#6B8C5A" }}
              >
                <ClipboardPaste className="w-3.5 h-3.5" />
                {t.pasteBtn}
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-sm flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" /> {error}
              </p>
            )}

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full rounded-2xl text-white font-semibold py-3.5 sm:py-4 text-sm sm:text-base transition-all flex items-center justify-center gap-2"
              style={{ backgroundColor: loading ? "#9ab08a" : "#6B8C5A" }}
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" />{t.analyzing}</>
              ) : (
                <><ShieldCheck className="w-4 h-4" />{t.analyzeBtn}</>
              )}
            </button>
          </div>
        )}

        {/* RESULT */}
        {result && (
          <div className="space-y-4 animate-[slideInFromRight_0.35s_ease-out]">
            <div
              className={`rounded-2xl border-2 ${VERDICT_STYLES[result.verdict].border} ${VERDICT_STYLES[result.verdict].bg} p-5 sm:p-6 ${result.verdict === "red" ? "animate-[shake_0.5s_ease-in-out]" : ""}`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-wider" style={{ color: "#7a8c6e" }}>{t.resultTitle}</span>
                {(() => {
                  const Icon = VERDICT_STYLES[result.verdict].icon;
                  return (
                    <span className={`flex items-center gap-1.5 text-sm font-semibold ${VERDICT_STYLES[result.verdict].text}`}>
                      <Icon className="w-4 h-4" />{t.verdicts[result.verdict]}
                    </span>
                  );
                })()}
              </div>
              <div className="mb-1.5 flex items-baseline justify-between">
                <span className="text-sm" style={{ color: "#7a8c6e" }}>{t.riskScore}</span>
                <span className={`text-2xl font-bold ${VERDICT_STYLES[result.verdict].text}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {result.risk_score}<span className="text-sm font-normal text-gray-400">/100</span>
                </span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#e0e7d8" }}>
                <div
                  className={`h-full rounded-full ${VERDICT_STYLES[result.verdict].bar} transition-all duration-700 ease-out`}
                  style={{ width: `${result.risk_score}%` }}
                />
              </div>
            </div>

            <div className="rounded-2xl border p-5 sm:p-6" style={{ borderColor: "#d6ddd0", backgroundColor: "#FFFFFF" }}>
              <span className="text-xs uppercase tracking-wider mb-3 block" style={{ color: "#7a8c6e" }}>{t.redFlagsTitle}</span>
              {result.red_flags.length === 0 ? (
                <p className="text-sm flex items-center gap-1.5" style={{ color: "#7a8c6e" }}>
                  <CheckCircle2 className="w-4 h-4 text-[#6B8C5A]" /> {t.noFlags}
                </p>
              ) : (
                <ul className="space-y-2.5">
                  {result.red_flags.map((flag, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm sm:text-base" style={{ color: "#3d4f30" }}>
                      <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-red-500" />
                      {flag}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button
              onClick={reset}
              className="w-full rounded-2xl font-medium py-3.5 sm:py-4 text-sm sm:text-base transition-colors"
              style={{ border: "1.5px solid #c8d4bc", backgroundColor: "#edf0e8", color: "#4a6b38" }}
            >
              {t.newScan}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
