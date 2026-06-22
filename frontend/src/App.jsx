import { useState, useEffect } from "react";
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Languages,
  ClipboardPaste,
  Eye,
  EyeOff,
  Menu,
  X,
  LogOut,
  History,
  ScanSearch,
  ChevronLeft,
  ChevronRight,
  Trash2,
} from "lucide-react";

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

    // Auth
    loginTitle: "Welcome back",
    signupTitle: "Create your account",
    nameLabel: "Full name",
    namePlaceholder: "Your full name",
    emailLabel: "Email",
    emailPlaceholder: "you@example.com",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter password",
    loginBtn: "Log in",
    signupBtn: "Sign up",
    noAccount: "Don't have an account?",
    haveAccount: "Already have an account?",
    switchToSignup: "Sign up",
    switchToLogin: "Log in",
    authError: "Please fill all fields correctly.",

    // Welcome
    welcomeBack: "Welcome",
    welcomeSub: "Glad to have you here. Let's get you set up.",
    continueBtn: "Continue",

    // Onboarding
    onboard1Title: "Paste any job posting",
    onboard1Body: "Copy the full text of a job ad — company name, salary, description, and contact details — and paste it in.",
    onboard2Title: "AI scans for red flags",
    onboard2Body: "Our AI checks for upfront fees, fake companies, unrealistic salaries, and other common scam patterns.",
    onboard3Title: "Get an instant verdict",
    onboard3Body: "See a risk score and a clear list of red flags so you know whether it's safe to apply.",
    back: "Back",
    next: "Next",
    getStarted: "Get started",
    skip: "Skip",

    // Sidebar / Topbar
    navAnalyze: "Analyze",
    navHistory: "History",
    logout: "Logout",

    // History
    historyTitle: "Scan History",
    historyEmpty: "No scans yet. Analyzed postings will show up here.",
    clearHistory: "Clear History",
    clearConfirmTitle: "Clear all history?",
    clearConfirmBody: "This will permanently delete all your past scans. This can't be undone.",
    cancel: "Cancel",
    confirmClear: "Delete all",
    viewDetails: "View details",
    backToHistory: "Back to history",
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

    // Auth
    loginTitle: "वापसी पर स्वागत है",
    signupTitle: "अपना अकाउंट बनाएं",
    nameLabel: "पूरा नाम",
    namePlaceholder: "आपका पूरा नाम",
    emailLabel: "ईमेल",
    emailPlaceholder: "you@example.com",
    passwordLabel: "पासवर्ड",
    passwordPlaceholder: "पासवर्ड डालें",
    loginBtn: "लॉग इन करें",
    signupBtn: "साइन अप करें",
    noAccount: "अकाउंट नहीं है?",
    haveAccount: "पहले से अकाउंट है?",
    switchToSignup: "साइन अप करें",
    switchToLogin: "लॉग इन करें",
    authError: "कृपया सभी फ़ील्ड सही से भरें।",

    // Welcome
    welcomeBack: "स्वागत है",
    welcomeSub: "आपको यहां देखकर खुशी हुई। चलिए सेटअप करते हैं।",
    continueBtn: "आगे बढ़ें",

    // Onboarding
    onboard1Title: "कोई भी जॉब पोस्टिंग पेस्ट करें",
    onboard1Body: "जॉब विज्ञापन का पूरा टेक्स्ट कॉपी करें — कंपनी का नाम, वेतन, विवरण और संपर्क विवरण — और यहां पेस्ट करें।",
    onboard2Title: "AI रेड फ्लैग्स खोजता है",
    onboard2Body: "हमारा AI एडवांस फीस, फर्जी कंपनियों, अवास्तविक वेतन और अन्य सामान्य धोखाधड़ी पैटर्न की जांच करता है।",
    onboard3Title: "तुरंत परिणाम पाएं",
    onboard3Body: "जोखिम स्कोर और रेड फ्लैग्स की स्पष्ट सूची देखें ताकि आपको पता चले कि आवेदन करना सुरक्षित है या नहीं।",
    back: "पीछे",
    next: "आगे",
    getStarted: "शुरू करें",
    skip: "स्किप करें",

    // Sidebar / Topbar
    navAnalyze: "जांच करें",
    navHistory: "इतिहास",
    logout: "लॉगआउट",

    // History
    historyTitle: "स्कैन इतिहास",
    historyEmpty: "अभी तक कोई स्कैन नहीं। जांची गई पोस्टिंग यहां दिखेंगी।",
    clearHistory: "इतिहास साफ़ करें",
    clearConfirmTitle: "सारा इतिहास साफ़ करें?",
    clearConfirmBody: "इससे आपके सभी पुराने स्कैन हमेशा के लिए डिलीट हो जाएंगे। यह वापस नहीं हो सकता।",
    cancel: "रद्द करें",
    confirmClear: "सब डिलीट करें",
    viewDetails: "विवरण देखें",
    backToHistory: "इतिहास पर वापस जाएं",
  },
};

// ---------------------------------------------------------
// REAL AI API CALL
// ---------------------------------------------------------
async function callAnalyzeAPI(jobText) {
  const systemPrompt = `You are JobShield AI, a fraud detector for job postings aimed at Indian job seekers. 
Analyze the given job posting text and respond with ONLY a JSON object, no preamble, no markdown fences, no explanation.

JSON shape:
{
  "risk_score": number (0-100, higher = more likely fraud),
  "verdict": "green" | "yellow" | "red",
  "red_flags": string[] (short, specific reasons; empty array if none found)
}

Rules for verdict: green = 0-39, yellow = 40-69, red = 70-100.`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{ role: "user", content: jobText }],
    }),
  });

  if (!res.ok) throw new Error("Server error");
  const data = await res.json();
  const textBlock = data.content.find((c) => c.type === "text");
  const raw = (textBlock?.text || "").trim();
  const cleaned = raw.replace(/```json|```/g, "").trim();
  const parsed = JSON.parse(cleaned);

  return {
    risk_score: Math.round(parsed.risk_score),
    verdict: parsed.verdict,
    red_flags: Array.isArray(parsed.red_flags) ? parsed.red_flags : [],
  };
}

const VERDICT_STYLES = {
  green: { ring: "ring-emerald-400/40", bg: "bg-emerald-50", text: "text-emerald-600", bar: "bg-emerald-500", icon: CheckCircle2 },
  yellow: { ring: "ring-amber-400/40", bg: "bg-amber-50", text: "text-amber-600", bar: "bg-amber-500", icon: AlertCircle },
  red: { ring: "ring-red-400/40", bg: "bg-red-50", text: "text-red-600", bar: "bg-red-500", icon: AlertTriangle },
};

function scoreToVerdict(score) {
  if (score >= 70) return "red";
  if (score >= 40) return "yellow";
  return "green";
}

function initials(name) {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] || "").toUpperCase() + (parts[1]?.[0] || "").toUpperCase();
}

async function loadHistory() {
  try {
    const result = await window.storage.get("scan-history", false);
    return result ? JSON.parse(result.value) : [];
  } catch { return []; }
}

async function saveHistory(history) {
  try {
    await window.storage.set("scan-history", JSON.stringify(history), false);
  } catch {}
}

// ---------------------------------------------------------
// AUTH SCREEN — Balanced Light Blue & White Centered Card
// ---------------------------------------------------------
function AuthScreen({ lang, setLang, onAuthed }) {
  const t = TEXT[lang];
  const [mode, setMode] = useState("login"); 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const emailValid = /^\S+@\S+\.\S+$/.test(email);
    const passwordValid = password.length >= 4;
    const nameValid = mode === "login" || name.trim().length > 0;

    if (!emailValid || !passwordValid || !nameValid) {
      setError(t.authError);
      return;
    }
    setError("");
    onAuthed({ name: mode === "signup" ? name.trim() : email.split("@")[0], email });
  }

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 flex flex-col items-center justify-center px-4 py-8">
      {/* Container to keep layout clean, centered, and slightly compact */}
      <div className="w-full max-w-md bg-white border border-blue-100 rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-blue-500" strokeWidth={2} fill="rgba(59,130,246,0.1)" />
            <span className="font-bold text-xl text-gray-900 tracking-tight">
              {t.brand}
            </span>
          </div>
          <button
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
          >
            <Languages className="w-3.5 h-3.5" />
            {lang === "en" ? "हिंदी" : "English"}
          </button>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          {mode === "login" ? t.loginTitle : t.signupTitle}
        </h1>
        <p className="text-gray-600 text-sm mb-6 font-medium">{t.tagline}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label className="text-xs font-bold text-gray-700 mb-1.5 block">{t.nameLabel}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.namePlaceholder}
                className="w-full rounded-xl bg-white border-2 border-gray-200 focus:border-blue-500 focus:outline-none px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 font-medium transition-colors"
              />
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-gray-700 mb-1.5 block">{t.emailLabel}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              className="w-full rounded-xl bg-white border-2 border-gray-200 focus:border-blue-500 focus:outline-none px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 font-medium transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 mb-1.5 block">{t.passwordLabel}</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t.passwordPlaceholder}
                className="w-full rounded-xl bg-white border-2 border-gray-200 focus:border-blue-500 focus:outline-none px-4 py-3 pr-11 text-sm text-gray-900 placeholder:text-gray-400 font-medium transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-600 text-xs font-semibold flex items-center gap-1.5 bg-red-50 p-2.5 rounded-xl border border-red-200">
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold py-3.5 text-sm shadow-sm transition-colors flex items-center justify-center gap-2 mt-2"
          >
            <Shield className="w-4 h-4" />
            {mode === "login" ? t.loginBtn : t.signupBtn}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-5 font-medium">
          {mode === "login" ? t.noAccount : t.haveAccount}{" "}
          <button
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setError("");
            }}
            className="text-blue-600 font-bold hover:underline ml-1"
          >
            {mode === "login" ? t.switchToSignup : t.switchToLogin}
          </button>
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// WELCOME SCREEN
// ---------------------------------------------------------
function WelcomeScreen({ lang, user, onContinue }) {
  const t = TEXT[lang];
  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm text-center bg-white border border-blue-100 rounded-3xl p-8 shadow-md">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-5 border border-blue-100">
          <Shield className="w-8 h-8 text-blue-500" strokeWidth={2} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {t.welcomeBack}, {user.name} 👋
        </h1>
        <p className="text-gray-600 text-sm mb-6 font-medium">{t.welcomeSub}</p>
        <button
          onClick={onContinue}
          className="w-full rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold py-3.5 text-sm shadow-sm transition-colors"
        >
          {t.continueBtn}
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// ONBOARDING SLIDES
// ---------------------------------------------------------
function OnboardingSlides({ lang, onDone }) {
  const t = TEXT[lang];
  const [step, setStep] = useState(0);

  const slides = [
    { Icon: ClipboardPaste, title: t.onboard1Title, body: t.onboard1Body },
    { Icon: ScanSearch, title: t.onboard2Title, body: t.onboard2Body },
    { Icon: CheckCircle2, title: t.onboard3Title, body: t.onboard3Body },
  ];

  const isLast = step === slides.length - 1;
  const { Icon, title, body } = slides[step];

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm bg-white border border-blue-100 rounded-3xl p-6 shadow-md">
        <div className="flex justify-end mb-2">
          {!isLast && (
            <button onClick={onDone} className="text-xs font-bold text-gray-400 hover:text-blue-500 transition-colors">
              {t.skip}
            </button>
          )}
        </div>

        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-4 border border-blue-100">
            <Icon className="w-8 h-8 text-blue-500" strokeWidth={2} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600 text-sm font-medium leading-relaxed px-2">{body}</p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-6">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${i === step ? "w-6 bg-blue-500" : "w-1.5 bg-blue-200"}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          {step > 0 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="flex-1 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-3 text-sm transition-colors flex items-center justify-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" /> {t.back}
            </button>
          )}
          <button
            onClick={() => (isLast ? onDone() : setStep((s) => s + 1))}
            className="flex-1 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 text-sm shadow-sm transition-colors flex items-center justify-center gap-1.5"
          >
            {isLast ? t.getStarted : t.next}
            {!isLast && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// SIDEBAR
// ---------------------------------------------------------
function Sidebar({ lang, user, page, setPage, onLogout, mobileOpen, setMobileOpen }) {
  const t = TEXT[lang];
  const navItems = [
    { key: "analyze", label: t.navAnalyze, icon: ScanSearch },
    { key: "history", label: t.navHistory, icon: History },
  ];

  const content = (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center gap-2 px-5 py-5 border-b border-gray-100">
        <Shield className="w-7 h-7 text-blue-500" strokeWidth={2} fill="rgba(59,130,246,0.1)" />
        <span className="font-bold text-base text-gray-900 tracking-tight">{t.brand}</span>
        <button onClick={() => setMobileOpen(false)} className="ml-auto md:hidden text-gray-500">
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => { setPage(key); setMobileOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-colors ${
              page === key ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Icon className="w-4.5 h-4.5" /> {label}
          </button>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-gray-100">
        <div className="flex items-center gap-2.5 px-3 py-2 mb-2 bg-gray-50 rounded-xl">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600 shrink-0">
            {initials(user.name)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-4.5 h-4.5" /> {t.logout}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden md:flex md:w-60 md:flex-col border-r border-gray-100 h-screen sticky top-0 bg-white shrink-0">
        {content}
      </aside>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl">{content}</aside>
        </div>
      )}
    </>
  );
}

// ---------------------------------------------------------
// TOPBAR
// ---------------------------------------------------------
function Topbar({ lang, setLang, user, title, onMenuClick }) {
  return (
    <header className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="md:hidden text-gray-600">
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-base sm:text-lg font-bold text-gray-900">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setLang(lang === "en" ? "hi" : "en")}
          className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
        >
          <Languages className="w-3.5 h-3.5" />
          {lang === "en" ? "हिंदी" : "English"}
        </button>
        <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">
          {initials(user.name)}
        </div>
      </div>
    </header>
  );
}

// ---------------------------------------------------------
// ANALYZE PAGE
// ---------------------------------------------------------
function AnalyzePage({ lang, onScanSaved }) {
  const t = TEXT[lang];
  const [jobText, setJobText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function handleAnalyze() {
    if (!jobText.trim()) {
      setError(t.emptyError);
      return;
    }
    setError(""); setResult(null); setLoading(true);
    try {
      const data = await callAnalyzeAPI(jobText);
      const verdict = data.verdict || scoreToVerdict(data.risk_score);
      const finalResult = { ...data, verdict };
      setResult(finalResult);
      onScanSaved({ ...finalResult, job_text: jobText, timestamp: Date.now() });
    } catch (e) {
      setError("Something went wrong. Try again.");
    } finally { setLoading(false); }
  }

  async function handlePaste() {
    try {
      const clip = await navigator.clipboard.readText();
      setJobText(clip);
    } catch {}
  }

  return (
    <div className="w-full max-w-2xl bg-white border border-gray-100 rounded-3xl p-5 sm:p-6 shadow-sm">
      <p className="text-gray-600 text-sm font-medium mb-4">{t.tagline}</p>
      {!result && (
        <div className="space-y-4">
          <div className="relative">
            <textarea
              value={jobText}
              onChange={(e) => setJobText(e.target.value)}
              placeholder={t.placeholder}
              rows={8}
              disabled={loading}
              className="w-full resize-none rounded-2xl bg-gray-50 border-2 border-gray-100 focus:border-blue-500 focus:outline-none p-4 text-sm text-gray-900 placeholder:text-gray-400 font-medium transition-colors"
            />
            <button
              onClick={handlePaste}
              disabled={loading}
              className="absolute top-3 right-3 flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1.5 rounded-xl hover:bg-blue-100 transition-colors"
            >
              <ClipboardPaste className="w-3.5 h-3.5" /> {t.pasteBtn}
            </button>
          </div>

          {error && (
            <p className="text-red-600 text-xs font-semibold flex items-center gap-1.5 bg-red-50 p-2.5 rounded-xl border border-red-100">
              <AlertCircle className="w-4 h-4" /> {error}
            </p>
          )}

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full rounded-xl bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-bold py-3.5 text-sm shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> <span>{t.analyzing}</span>
              </>
            ) : (
              <>
                <Shield className="w-4 h-4" /> {t.analyzeBtn}
              </>
            )}
          </button>
        </div>
      )}
      {result && <ResultCard lang={lang} result={result} onReset={() => { setResult(null); setJobText(""); }} footerLabel={t.newScan} />}
    </div>
  );
}

// ---------------------------------------------------------
// RESULT CARD
// ---------------------------------------------------------
function ResultCard({ lang, result, onReset, footerLabel }) {
  const t = TEXT[lang];
  return (
    <div className="space-y-4">
      <div className={`rounded-2xl border ${VERDICT_STYLES[result.verdict].ring} ${VERDICT_STYLES[result.verdict].bg} p-5`}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs uppercase font-bold text-gray-500 tracking-wider">{t.resultTitle}</span>
          {(() => {
            const Icon = VERDICT_STYLES[result.verdict].icon;
            return (
              <span className={`flex items-center gap-1.5 text-sm font-bold ${VERDICT_STYLES[result.verdict].text}`}>
                <Icon className="w-4 h-4" /> {t.verdicts[result.verdict]}
              </span>
            );
          })()}
        </div>
        <div className="mb-2 flex items-baseline justify-between">
          <span className="text-sm font-bold text-gray-600">{t.riskScore}</span>
          <span className={`text-2xl font-bold ${VERDICT_STYLES[result.verdict].text}`}>
            {result.risk_score}<span className="text-xs text-gray-400 font-medium">/100</span>
          </span>
        </div>
        <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
          <div className={`h-full rounded-full ${VERDICT_STYLES[result.verdict].bar}`} style={{ width: `${result.risk_score}%` }} />
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
        <span className="text-xs uppercase font-bold text-gray-500 tracking-wider mb-3 block">{t.redFlagsTitle}</span>
        {result.red_flags.length === 0 ? (
          <p className="text-sm font-bold text-emerald-600 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> {t.noFlags}
          </p>
        ) : (
          <ul className="space-y-2">
            {result.red_flags.map((flag, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm font-semibold text-gray-800">
                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-red-500" /> {flag}
              </li>
            ))}
          </ul>
        )}
      </div>

      {onReset && (
        <button
          onClick={onReset}
          className="w-full rounded-xl border-2 border-gray-200 hover:bg-gray-50 text-gray-800 font-bold py-3 text-sm transition-colors"
        >
          {footerLabel}
        </button>
      )}
    </div>
  );
}

// ---------------------------------------------------------
// HISTORY PAGE
// ---------------------------------------------------------
function HistoryPage({ lang, history, setHistory }) {
  const t = TEXT[lang];
  const [selected, setSelected] = useState(null);
  const [confirmClear, setConfirmClear] = useState(false);

  if (selected) {
    return (
      <div className="w-full max-w-2xl bg-white border border-gray-100 rounded-3xl p-5 shadow-sm">
        <button onClick={() => setSelected(null)} className="flex items-center gap-1.5 text-sm font-bold text-blue-600 mb-4">
          <ChevronLeft className="w-4 h-4" /> {t.backToHistory}
        </button>
        <p className="text-xs font-bold text-gray-400 mb-3">{new Date(selected.timestamp).toLocaleString()}</p>
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 mb-4 text-sm font-medium text-gray-700 max-h-36 overflow-y-auto whitespace-pre-wrap">
          {selected.job_text}
        </div>
        <ResultCard lang={lang} result={selected} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl bg-white border border-gray-100 rounded-3xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-500 text-sm font-bold">{history.length > 0 ? `${history.length} scans` : ""}</p>
        {history.length > 0 && (
          <button onClick={() => setConfirmClear(true)} className="flex items-center gap-1.5 text-sm font-bold text-red-500 hover:text-red-600">
            <Trash2 className="w-4 h-4" /> {t.clearHistory}
          </button>
        )}
      </div>

      {confirmClear && (
        <div className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-blue-50">
            <h3 className="text-lg font-bold text-gray-900">{t.clearConfirmTitle}</h3>
            <p className="text-sm font-medium text-gray-600">{t.clearConfirmBody}</p>
            <div className="flex items-center gap-3 justify-end">
              <button onClick={() => setConfirmClear(false)} className="px-4 py-2 text-sm font-bold border rounded-xl hover:bg-gray-50">{t.cancel}</button>
              <button onClick={async () => { setHistory([]); await saveHistory([]); setConfirmClear(false); }} className="px-4 py-2 text-sm font-bold bg-red-500 text-white rounded-xl hover:bg-red-600">{t.confirmClear}</button>
            </div>
          </div>
        </div>
      )}

      {history.length === 0 ? (
        <div className="bg-gray-50 rounded-2xl p-10 text-center border border-gray-100">
          <History className="w-8 h-8 text-gray-400 mx-auto mb-2" strokeWidth={2} />
          <p className="text-sm font-bold text-gray-500">{t.historyEmpty}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {history.slice().reverse().map((item, i) => {
            const Icon = VERDICT_STYLES[item.verdict].icon;
            return (
              <button
                key={i}
                onClick={() => setSelected(item)}
                className="w-full text-left rounded-xl border border-gray-100 hover:border-blue-200 bg-white p-4 transition-colors flex items-start gap-3"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${VERDICT_STYLES[item.verdict].bg}`}>
                  <Icon className={`w-4.5 h-4.5 ${VERDICT_STYLES[item.verdict].text}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-gray-900 truncate mb-0.5">{item.job_text}</p>
                  <p className="text-xs font-semibold text-gray-400">{new Date(item.timestamp).toLocaleDateString()} · Score {item.risk_score}</p>
                </div>
                <span className={`text-xs font-bold shrink-0 ${VERDICT_STYLES[item.verdict].text}`}>{t.verdicts[item.verdict]}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------
// MAIN APPLICATION HUB
// ---------------------------------------------------------
export default function App() {
  const [lang, setLang] = useState("en");
  const [stage, setStage] = useState("auth"); 
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("analyze"); 
  const [history, setHistory] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    async function initHistory() {
      const data = await loadHistory();
      setHistory(data);
    }
    if (stage === "dashboard") initHistory();
  }, [stage]);

  const handleScanSaved = async (newScan) => {
    const updatedHistory = [...history, newScan];
    setHistory(updatedHistory);
    await saveHistory(updatedHistory);
  };

  if (stage === "auth") {
    return <AuthScreen lang={lang} setLang={setLang} onAuthed={(userData) => { setUser(userData); setStage("welcome"); }} />;
  }
  if (stage === "welcome") {
    return <WelcomeScreen lang={lang} user={user} onContinue={() => setStage("onboarding")} />;
  }
  if (stage === "onboarding") {
    return <OnboardingSlides lang={lang} onDone={() => setStage("dashboard")} />;
  }

  const currentPageTitle = page === "analyze" ? TEXT[lang].navAnalyze : TEXT[lang].navHistory;

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 flex flex-col md:flex-row">
      <Sidebar lang={lang} user={user} page={page} setPage={setPage} mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} onLogout={() => { setStage("auth"); setUser(null); }} />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar lang={lang} setLang={setLang} user={user} title={currentPageTitle} onMenuClick={() => setMobileMenuOpen(true)} />
        <main className="p-4 sm:p-6 max-w-4xl w-full mx-auto flex-1 flex flex-col items-center justify-start">
          {page === "analyze" ? (
            <AnalyzePage lang={lang} onScanSaved={handleScanSaved} />
          ) : (
            <HistoryPage lang={lang} history={history} setHistory={setHistory} />
          )}
        </main>
      </div>
    </div>
  );
}
