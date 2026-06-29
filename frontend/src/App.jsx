import { useState, useRef } from "react";
import { AlertTriangle, CheckCircle2, AlertCircle, Loader2, Languages, ShieldCheck, Eye, EyeOff, ArrowLeft } from "lucide-react";

// ─── COLORS ───────────────────────────────────────────────
const C = {
  bg: "#F2F0EB",
  white: "#ffffff",
  olive: "#6B8C5A",
  oliveDark: "#4a6b38",
  oliveLight: "#edf0e8",
  oliveBorder: "#c8d4bc",
  text: "#2c3a20",
  muted: "#7a8c6e",
  inputBorder: "#d6ddd0",
  inputBg: "#fafaf8",
};

// ─── BILINGUAL TEXT ────────────────────────────────────────
const TEXT = {
  en: {
    brand: "JobShield AI",
    sub: "Trusted Job Verifier",
    signIn: "Sign In",
    signUp: "Sign Up",
    email: "Email Address",
    password: "Password",
    confirmPass: "Confirm Password",
    name: "Full Name",
    signInBtn: "Sign In",
    signUpBtn: "Create Account",
    noAccount: "Don't have an account?",
    haveAccount: "Already have an account?",
    otpTitle: "Verify Your Email",
    otpSub: "We've sent a 4-digit code to",
    otpLabel: "Enter OTP",
    verifyBtn: "Verify & Continue",
    resend: "Resend OTP",
    back: "Back",
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
    logout: "Logout",
    welcome: "Welcome",
  },
  hi: {
    brand: "JobShield AI",
    sub: "विश्वसनीय जॉब सत्यापनकर्ता",
    signIn: "साइन इन",
    signUp: "साइन अप",
    email: "ईमेल पता",
    password: "पासवर्ड",
    confirmPass: "पासवर्ड की पुष्टि करें",
    name: "पूरा नाम",
    signInBtn: "साइन इन करें",
    signUpBtn: "खाता बनाएं",
    noAccount: "खाता नहीं है?",
    haveAccount: "पहले से खाता है?",
    otpTitle: "ईमेल सत्यापित करें",
    otpSub: "हमने 4 अंकों का कोड भेजा है",
    otpLabel: "OTP दर्ज करें",
    verifyBtn: "सत्यापित करें और जारी रखें",
    resend: "OTP दोबारा भेजें",
    back: "वापस",
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
    logout: "लॉगआउट",
    welcome: "स्वागत है",
  },
};

// ─── DUMMY ANALYZE API ─────────────────────────────────────
async function callAnalyzeAPI(jobText) {
  // ---- REAL BACKEND CALL (uncomment when Person 1 backend is ready) ----
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

// ─── REUSABLE INPUT ────────────────────────────────────────
function Input({ label, type = "text", value, onChange, placeholder, rightEl }) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: C.muted, marginBottom: "5px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
      <div style={{ position: "relative" }}>
        <input
          type={type} value={value} onChange={onChange} placeholder={placeholder}
          style={{ width: "100%", padding: rightEl ? "11px 40px 11px 14px" : "11px 14px", borderRadius: "10px", border: `1.5px solid ${C.inputBorder}`, backgroundColor: C.inputBg, fontSize: "14px", color: C.text, outline: "none", boxSizing: "border-box", fontFamily: "'Inter', sans-serif" }}
          onFocus={e => e.target.style.borderColor = C.olive}
          onBlur={e => e.target.style.borderColor = C.inputBorder}
        />
        {rightEl && <div style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}>{rightEl}</div>}
      </div>
    </div>
  );
}

// ─── SHARED LOGO ───────────────────────────────────────────
function Logo({ t }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px", justifyContent: "center" }}>
      <div style={{ width: "42px", height: "42px", borderRadius: "50%", backgroundColor: "#e8f0e1", border: `2px solid ${C.olive}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <ShieldCheck size={22} color={C.oliveDark} strokeWidth={2} />
      </div>
      <div>
        <div style={{ fontWeight: "800", fontSize: "18px", color: C.text, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.1 }}>{t.brand}</div>
        <div style={{ fontSize: "9px", color: C.olive, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: "600" }}>{t.sub}</div>
      </div>
    </div>
  );
}

// ─── OLIVE BUTTON ──────────────────────────────────────────
function OliveBtn({ onClick, disabled, children, loading }) {
  return (
    <button onClick={onClick} disabled={disabled}
      style={{ width: "100%", padding: "13px", borderRadius: "11px", backgroundColor: disabled ? "#9ab08a" : C.olive, color: "#fff", fontWeight: "700", fontSize: "15px", border: "none", cursor: disabled ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "6px" }}>
      {children}
    </button>
  );
}

// ═══════════════════════════════════════════════════════════
// PAGE 1 — AUTH (Sign In / Sign Up)
// ═══════════════════════════════════════════════════════════
function AuthPage({ t, onSuccess }) {
  const [mode, setMode] = useState("signin"); // "signin" | "signup"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  function validate() {
    if (mode === "signup" && !name.trim()) return "Please enter your name.";
    if (!email.includes("@")) return "Enter a valid email.";
    if (pass.length < 6) return "Password must be at least 6 characters.";
    if (mode === "signup" && pass !== confirm) return "Passwords do not match.";
    return null;
  }

  async function handleSubmit() {
    const e = validate();
    if (e) { setErr(e); return; }
    setErr(""); setLoading(true);
    await new Promise(r => setTimeout(r, 900)); // simulate API
    setLoading(false);
    onSuccess(email, name || email.split("@")[0]);
  }

  return (
    <div style={{ width: "100%", maxWidth: "420px" }}>
      <Logo t={t} />
      <div style={{ backgroundColor: C.white, borderRadius: "20px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", border: `1px solid ${C.oliveBorder}`, padding: "28px" }}>

        {/* TABS */}
        <div style={{ display: "flex", backgroundColor: C.oliveLight, borderRadius: "10px", padding: "4px", marginBottom: "22px" }}>
          {["signin", "signup"].map(m => (
            <button key={m} onClick={() => { setMode(m); setErr(""); }}
              style={{ flex: 1, padding: "8px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "600", fontSize: "14px", backgroundColor: mode === m ? C.white : "transparent", color: mode === m ? C.oliveDark : C.muted, boxShadow: mode === m ? "0 1px 4px rgba(0,0,0,0.1)" : "none", transition: "all 0.2s" }}>
              {m === "signin" ? t.signIn : t.signUp}
            </button>
          ))}
        </div>

        {mode === "signup" && (
          <Input label={t.name} value={name} onChange={e => setName(e.target.value)} placeholder="Riya Sharma" />
        )}
        <Input label={t.email} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
        <Input label={t.password} type={showPass ? "text" : "password"} value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••"
          rightEl={showPass ? <EyeOff size={16} color={C.muted} onClick={() => setShowPass(false)} /> : <Eye size={16} color={C.muted} onClick={() => setShowPass(true)} />}
        />
        {mode === "signup" && (
          <Input label={t.confirmPass} type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="••••••••" />
        )}

        {err && <p style={{ color: "#dc2626", fontSize: "13px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "5px" }}><AlertCircle size={13} />{err}</p>}

        <OliveBtn onClick={handleSubmit} disabled={loading}>
          {loading ? <><Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} /> Loading...</> : mode === "signin" ? t.signInBtn : t.signUpBtn}
        </OliveBtn>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// PAGE 2 — OTP VERIFICATION
// ═══════════════════════════════════════════════════════════
function OTPPage({ t, email, onVerified, onBack }) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [resent, setResent] = useState(false);
  const refs = [useRef(), useRef(), useRef(), useRef()];

  function handleChange(i, val) {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 3) refs[i + 1].current.focus();
  }

  function handleKey(i, e) {
    if (e.key === "Backspace" && !otp[i] && i > 0) refs[i - 1].current.focus();
  }

  async function handleVerify() {
    if (otp.join("").length < 4) { setErr("Enter the 4-digit OTP."); return; }
    setErr(""); setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    // Demo: any 4-digit OTP works (replace with real check later)
    onVerified();
  }

  async function handleResend() {
    setResent(true);
    setTimeout(() => setResent(false), 3000);
  }

  return (
    <div style={{ width: "100%", maxWidth: "420px" }}>
      <Logo t={t} />
      <div style={{ backgroundColor: C.white, borderRadius: "20px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", border: `1px solid ${C.oliveBorder}`, padding: "28px" }}>

        <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: "5px", color: C.muted, fontSize: "13px", background: "none", border: "none", cursor: "pointer", marginBottom: "18px", padding: 0 }}>
          <ArrowLeft size={14} /> {t.back}
        </button>

        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div style={{ width: "52px", height: "52px", borderRadius: "50%", backgroundColor: C.oliveLight, border: `2px solid ${C.olive}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
            <ShieldCheck size={26} color={C.oliveDark} />
          </div>
          <h2 style={{ fontSize: "18px", fontWeight: "700", color: C.text, margin: "0 0 6px", fontFamily: "'Space Grotesk', sans-serif" }}>{t.otpTitle}</h2>
          <p style={{ fontSize: "13px", color: C.muted, margin: 0 }}>{t.otpSub}<br /><strong style={{ color: C.oliveDark }}>{email}</strong></p>
        </div>

        {/* OTP BOXES */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginBottom: "20px" }}>
          {otp.map((d, i) => (
            <input key={i} ref={refs[i]} value={d} maxLength={1}
              onChange={e => handleChange(i, e.target.value)}
              onKeyDown={e => handleKey(i, e)}
              style={{ width: "56px", height: "60px", textAlign: "center", fontSize: "24px", fontWeight: "700", borderRadius: "12px", border: `2px solid ${d ? C.olive : C.inputBorder}`, backgroundColor: d ? C.oliveLight : C.inputBg, color: C.text, outline: "none", fontFamily: "'Space Grotesk', sans-serif" }}
              onFocus={e => e.target.style.borderColor = C.olive}
              onBlur={e => e.target.style.borderColor = d ? C.olive : C.inputBorder}
            />
          ))}
        </div>

        {err && <p style={{ color: "#dc2626", fontSize: "13px", textAlign: "center", marginBottom: "10px" }}>{err}</p>}

        <OliveBtn onClick={handleVerify} disabled={loading}>
          {loading ? <><Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} /> Verifying...</> : t.verifyBtn}
        </OliveBtn>

        <div style={{ textAlign: "center", marginTop: "14px" }}>
          {resent
            ? <span style={{ fontSize: "13px", color: C.olive, fontWeight: "600" }}>✓ OTP Resent!</span>
            : <button onClick={handleResend} style={{ fontSize: "13px", color: C.muted, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>{t.resend}</button>
          }
        </div>

        <p style={{ fontSize: "11px", color: C.muted, textAlign: "center", marginTop: "10px" }}>
          Demo: Enter any 4 digits to continue
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// PAGE 3 — MAIN ANALYZE PAGE
// ═══════════════════════════════════════════════════════════
function AnalyzePage({ t, userName, onLogout }) {
  const [jobText, setJobText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

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
    <div style={{ width: "100%", maxWidth: "500px" }}>
      {/* TOP NAV */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: C.oliveLight, border: `2px solid ${C.olive}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ShieldCheck size={18} color={C.oliveDark} />
          </div>
          <div>
            <div style={{ fontWeight: "700", fontSize: "15px", color: C.text, fontFamily: "'Space Grotesk', sans-serif" }}>{t.brand}</div>
            <div style={{ fontSize: "9px", color: C.olive, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: "600" }}>{t.sub}</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "12px", color: C.muted }}>{t.welcome}, <strong style={{ color: C.oliveDark }}>{userName}</strong></span>
          <button onClick={onLogout} style={{ fontSize: "11px", color: C.muted, background: C.oliveLight, border: `1px solid ${C.oliveBorder}`, borderRadius: "8px", padding: "5px 10px", cursor: "pointer" }}>{t.logout}</button>
        </div>
      </div>

      {/* CARD */}
      <div style={{ backgroundColor: C.white, borderRadius: "20px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", border: `1px solid ${C.oliveBorder}`, padding: "26px" }}>
        {!result ? (
          <>
            <h2 style={{ fontSize: "17px", fontWeight: "700", color: C.text, margin: "0 0 14px", fontFamily: "'Space Grotesk', sans-serif" }}>{t.tagline}</h2>
            <textarea value={jobText} onChange={e => setJobText(e.target.value)} placeholder={t.placeholder} rows={8} disabled={loading}
              style={{ width: "100%", resize: "none", borderRadius: "12px", border: `1.5px solid ${C.inputBorder}`, padding: "13px", fontSize: "14px", color: C.text, backgroundColor: C.inputBg, outline: "none", boxSizing: "border-box", fontFamily: "'Inter', sans-serif" }}
              onFocus={e => e.target.style.borderColor = C.olive}
              onBlur={e => e.target.style.borderColor = C.inputBorder}
            />
            {error && <p style={{ color: "#dc2626", fontSize: "13px", margin: "8px 0", display: "flex", alignItems: "center", gap: "5px" }}><AlertCircle size={13} />{error}</p>}
            <OliveBtn onClick={handleAnalyze} disabled={loading}>
              {loading ? <><Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} />{t.analyzing}</> : <><ShieldCheck size={15} />{t.analyzeBtn}</>}
            </OliveBtn>
          </>
        ) : (
          <>
            <div style={{ border: `2px solid ${STYLES[result.verdict].border}`, backgroundColor: STYLES[result.verdict].bg, borderRadius: "14px", padding: "18px", marginBottom: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: C.muted, fontWeight: "600" }}>{t.resultTitle}</span>
                {(() => { const Icon = STYLES[result.verdict].icon; return (
                  <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "13px", fontWeight: "700", color: STYLES[result.verdict].text }}>
                    <Icon size={14} />{t.verdicts[result.verdict]}
                  </span>
                ); })()}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                <span style={{ fontSize: "13px", color: C.muted }}>{t.riskScore}</span>
                <span style={{ fontSize: "26px", fontWeight: "800", color: STYLES[result.verdict].text, fontFamily: "'Space Grotesk', sans-serif" }}>
                  {result.risk_score}<span style={{ fontSize: "13px", color: "#aaa", fontWeight: "400" }}>/100</span>
                </span>
              </div>
              <div style={{ height: "8px", borderRadius: "99px", backgroundColor: "#e0e7d8", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${result.risk_score}%`, backgroundColor: STYLES[result.verdict].bar, borderRadius: "99px", transition: "width 0.7s ease-out" }} />
              </div>
            </div>

            <div style={{ border: `1px solid ${C.inputBorder}`, borderRadius: "14px", padding: "16px", marginBottom: "14px", backgroundColor: C.inputBg }}>
              <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: C.muted, fontWeight: "600", marginBottom: "10px" }}>{t.redFlagsTitle}</div>
              {result.red_flags.length === 0
                ? <div style={{ display: "flex", alignItems: "center", gap: "7px", color: C.olive, fontSize: "14px" }}><CheckCircle2 size={15} />{t.noFlags}</div>
                : <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "9px" }}>
                    {result.red_flags.map((f, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "14px", color: "#3d4f30" }}>
                        <AlertTriangle size={14} color="#dc2626" style={{ marginTop: "2px", flexShrink: 0 }} />{f}
                      </li>
                    ))}
                  </ul>
              }
            </div>

            <button onClick={reset} style={{ width: "100%", padding: "12px", borderRadius: "11px", border: `1.5px solid ${C.oliveBorder}`, backgroundColor: C.oliveLight, color: C.oliveDark, fontWeight: "600", fontSize: "14px", cursor: "pointer" }}>
              {t.newScan}
            </button>
          </>
        )}
      </div>
      <div style={{ textAlign: "center", marginTop: "14px", fontSize: "11px", color: "#9aaa8e" }}>Protected by JobShield AI • Powered by Claude</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// ROOT APP — manages which page to show
// ═══════════════════════════════════════════════════════════
export default function App() {
  const [lang, setLang] = useState("en");
  const [page, setPage] = useState("auth"); // "auth" | "otp" | "analyze"
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const t = TEXT[lang];

  function handleAuthSuccess(email, name) {
    setUserEmail(email);
    setUserName(name);
    setPage("otp");
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", fontFamily: "'Inter', sans-serif" }}>

      {/* LANG TOGGLE (always visible) */}
      {page !== "analyze" && (
        <div style={{ position: "fixed", top: "16px", right: "16px" }}>
          <button onClick={() => setLang(lang === "en" ? "hi" : "en")}
            style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", padding: "6px 14px", borderRadius: "20px", border: `1.5px solid ${C.oliveBorder}`, backgroundColor: C.oliveLight, color: C.oliveDark, cursor: "pointer", fontWeight: "500" }}>
            <Languages size={13} />
            {lang === "en" ? "हिंदी" : "English"}
          </button>
        </div>
      )}

      {page === "auth" && <AuthPage t={t} onSuccess={handleAuthSuccess} />}
      {page === "otp" && <OTPPage t={t} email={userEmail} onVerified={() => setPage("analyze")} onBack={() => setPage("auth")} />}
      {page === "analyze" && <AnalyzePage t={t} userName={userName} onLogout={() => { setPage("auth"); setUserName(""); setUserEmail(""); }} />}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
