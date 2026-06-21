import { useState } from "react";
import { Shield, AlertTriangle, CheckCircle2, AlertCircle, Loader2, Languages, ClipboardPaste } from "lucide-react";

// ---------------------------------------------------------
// BILINGUAL TEXT — sab UI strings yahin se aate hain
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
// DUMMY RESPONSE — Person 1 ka real backend ready hone tak
// isi se UI test karo. Jab backend ready ho, callAnalyzeAPI()
// function ke andar wala fetch() uncomment/replace kar dena.
// ---------------------------------------------------------
async function callAnalyzeAPI(jobText) {
  // ---- REAL BACKEND CALL (Person 1 ka kaam ho jaaye tab ye use karo) ----
  // const res = await fetch("http://localhost:8000/analyze", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ text: jobText }),
  // });
  // if (!res.ok) throw new Error("Server error");
  // return await res.json();

  // ---- DUMMY DATA (testing ke liye, isse pehle delete mat karna) ----
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
    : {
        risk_score: 12,
        verdict: "green",
        red_flags: [],
      };
}

// ---------------------------------------------------------
// SMALL HELPERS
// ---------------------------------------------------------
const VERDICT_STYLES = {
  green: {
    ring: "ring-emerald-400/40",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    bar: "bg-emerald-400",
    icon: CheckCircle2,
  },
  yellow: {
    ring: "ring-amber-400/40",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    bar: "bg-amber-400",
    icon: AlertCircle,
  },
  red: {
    ring: "ring-red-400/40",
    bg: "bg-red-500/10",
    text: "text-red-400",
    bar: "bg-red-400",
    icon: AlertTriangle,
  },
};

function scoreToVerdict(score) {
  if (score >= 70) return "red";
  if (score >= 40) return "yellow";
  return "green";
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
    } catch (e) {
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
      // clipboard permission denied — silently ignore
    }
  }

  function reset() {
    setResult(null);
    setJobText("");
    setError("");
  }

  return (
    <div className="min-h-screen bg-[#0B1220] text-[#E8ECF4] flex flex-col items-center px-4 py-10 sm:py-16">
      {/* ---------- HEADER ---------- */}
      <header className="w-full max-w-2xl flex items-center justify-between mb-8 sm:mb-12">
        <div className="flex items-center gap-2.5">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center">
            <Shield className="w-9 h-9 sm:w-10 sm:h-10 text-[#4F8EF7]" strokeWidth={1.6} fill="rgba(79,142,247,0.12)" />
          </div>
          <span className="font-semibold text-lg sm:text-xl tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {t.brand}
          </span>
        </div>

        <button
          onClick={() => setLang(lang === "en" ? "hi" : "en")}
          className="flex items-center gap-1.5 text-xs sm:text-sm px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
        >
          <Languages className="w-3.5 h-3.5" />
          {lang === "en" ? "हिंदी" : "English"}
        </button>
      </header>

      {/* ---------- MAIN CARD ---------- */}
      <main className="w-full max-w-2xl">
        <p className="text-[#8B95AB] text-sm sm:text-base mb-5 sm:mb-6">{t.tagline}</p>

        {!result && (
          <div className="space-y-3">
            <div className="relative">
              <textarea
                value={jobText}
                onChange={(e) => setJobText(e.target.value)}
                placeholder={t.placeholder}
                rows={9}
                disabled={loading}
                className="w-full resize-none rounded-2xl bg-[#131B2E] border border-white/10 focus:border-[#4F8EF7]/60 focus:ring-2 focus:ring-[#4F8EF7]/20 outline-none p-4 sm:p-5 text-sm sm:text-base placeholder:text-[#5C6479] transition-colors disabled:opacity-50"
              />
              <button
                onClick={handlePaste}
                disabled={loading}
                className="absolute top-3 right-3 flex items-center gap-1 text-xs text-[#8B95AB] hover:text-[#E8ECF4] bg-white/5 hover:bg-white/10 px-2.5 py-1.5 rounded-lg transition-colors disabled:opacity-0"
              >
                <ClipboardPaste className="w-3.5 h-3.5" />
                {t.pasteBtn}
              </button>
            </div>

            {error && (
              <p className="text-red-400 text-sm flex items-center gap-1.5 animate-[slideInFromLeft_0.2s_ease-out]">
                <AlertCircle className="w-4 h-4" /> {error}
              </p>
            )}

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full relative overflow-hidden rounded-2xl bg-[#4F8EF7] hover:bg-[#3F7DE0] disabled:bg-[#4F8EF7]/60 text-white font-medium py-3.5 sm:py-4 text-sm sm:text-base transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span
                    className="bg-clip-text text-transparent bg-[length:200%_100%]"
                    style={{
                      backgroundImage: "linear-gradient(90deg, #ffffffaa 0%, #ffffff 50%, #ffffffaa 100%)",
                      animation: "shimmer 1.6s linear infinite",
                    }}
                  >
                    {t.analyzing}
                  </span>
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
          <div className="animate-[slideInFromRight_0.35s_ease-out] space-y-5">
            <div
              className={`rounded-2xl border ${VERDICT_STYLES[result.verdict].ring} ${VERDICT_STYLES[result.verdict].bg} p-5 sm:p-6 ${
                result.verdict === "red" ? "animate-[shake_0.5s_ease-in-out]" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-wider text-[#8B95AB]">{t.resultTitle}</span>
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
                <span className="text-sm text-[#8B95AB]">{t.riskScore}</span>
                <span className={`text-2xl font-semibold ${VERDICT_STYLES[result.verdict].text}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {result.risk_score}
                  <span className="text-sm text-[#5C6479]">/100</span>
                </span>
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <div
                  className={`h-full rounded-full ${VERDICT_STYLES[result.verdict].bar} transition-all duration-700 ease-out`}
                  style={{ width: `${result.risk_score}%` }}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#131B2E] p-5 sm:p-6">
              <span className="text-xs uppercase tracking-wider text-[#8B95AB] mb-3 block">{t.redFlagsTitle}</span>
              {result.red_flags.length === 0 ? (
                <p className="text-sm text-[#8B95AB] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {t.noFlags}
                </p>
              ) : (
                <ul className="space-y-2.5">
                  {result.red_flags.map((flag, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm sm:text-base text-[#D4D9E5] animate-[slideInFromLeft_0.25s_ease-out]"
                      style={{ animationDelay: `${i * 60}ms`, animationFillMode: "backwards" }}
                    >
                      <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-red-400" />
                      {flag}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button
              onClick={reset}
              className="w-full rounded-2xl border border-white/10 hover:bg-white/5 text-[#E8ECF4] font-medium py-3.5 sm:py-4 text-sm sm:text-base transition-colors"
            >
              {t.newScan}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}