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
// REAL AI API CALL — Anthropic API se directly analysis
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

Rules for verdict: green = 0-39, yellow = 40-69, red = 70-100.
Look for: upfront payment/registration fee requests, unrealistic salary for the role, vague/unverifiable company details, contact only via personal WhatsApp/Telegram, urgency pressure tactics, requests for sensitive personal/bank info before hiring, poor grammar mixed with corporate claims, work-from-home with guaranteed high pay for no experience.
Respond ONLY with the JSON object.`;

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

function initials(name) {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] || "").toUpperCase() + (parts[1]?.[0] || "").toUpperCase();
}

async function loadHistory() {
  try {
    const result = await window.storage.get("scan-history", false);
    return result ? JSON.parse(result.value) : [];
  } catch {
    return [];
  }
}

async function saveHistory(history) {
  try {
    await window.storage.set("scan-history", JSON.stringify(history), false);
  } catch {
    // storage failed — ignore silently, history just won't persist
  }
}

// ---------------------------------------------------------
// AUTH SCREEN — Login / Sign up
// ---------------------------------------------------------
function AuthScreen({ lang, setLang, onAuthed }) {
  const t = TEXT[lang];
  const [mode, setMode] = useState("login"); // 'login' | 'signup'
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
    <div className="min-h-screen bg-white text-[#1a1a2e] flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2.5">
            <Shield className="w-9 h-9 text-[#4F8EF7]" strokeWidth={1.6} fill="rgba(79,142,247,0.12)" />
            <span className="font-semibold text-lg tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {t.brand}
            </span>
          </div>
          <button
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-black/10 bg-black/[0.03] hover:bg-black/[0.06] transition-colors"
          >
            <Languages className="w-3.5 h-3.5" />
            {lang === "en" ? "हिंदी" : "English"}
          </button>
        </div>

        <h1 className="text-2xl font-semibold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {mode === "login" ? t.loginTitle : t.signupTitle}
        </h1>
        <p className="text-[#5C6479] text-sm mb-6">{t.tagline}</p>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === "signup" && (
            <div>
              <label className="text-xs text-[#5C6479] mb-1.5 block">{t.nameLabel}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.namePlaceholder}
                className="w-full rounded-xl bg-[#f5f5f5] border border-black/10 focus:border-[#4F8EF7]/60 focus:ring-2 focus:ring-[#4F8EF7]/20 outline-none px-4 py-3 text-sm transition-colors"
              />
            </div>
          )}

          <div>
            <label className="text-xs text-[#5C6479] mb-1.5 block">{t.emailLabel}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              className="w-full rounded-xl bg-[#f5f5f5] border border-black/10 focus:border-[#4F8EF7]/60 focus:ring-2 focus:ring-[#4F8EF7]/20 outline-none px-4 py-3 text-sm transition-colors"
            />
          </div>

          <div>
            <label className="text-xs text-[#5C6479] mb-1.5 block">{t.passwordLabel}</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t.passwordPlaceholder}
                className="w-full rounded-xl bg-[#f5f5f5] border border-black/10 focus:border-[#4F8EF7]/60 focus:ring-2 focus:ring-[#4F8EF7]/20 outline-none px-4 py-3 pr-11 text-sm transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B95AB] hover:text-[#1a1a2e]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" /> {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-2xl bg-[#4F8EF7] hover:bg-[#3F7DE0] text-white font-medium py-3.5 text-sm transition-colors flex items-center justify-center gap-2 mt-2"
          >
            <Shield className="w-4 h-4" />
            {mode === "login" ? t.loginBtn : t.signupBtn}
          </button>
        </form>

        <p className="text-center text-sm text-[#5C6479] mt-5">
          {mode === "login" ? t.noAccount : t.haveAccount}{" "}
          <button
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setError("");
            }}
            className="text-[#4F8EF7] font-medium hover:underline"
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
    <div className="min-h-screen bg-white text-[#1a1a2e] flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm text-center">
        <div className="w-16 h-16 rounded-full bg-[#4F8EF7]/10 flex items-center justify-center mx-auto mb-6">
          <Shield className="w-8 h-8 text-[#4F8EF7]" strokeWidth={1.6} />
        </div>
        <h1 className="text-2xl font-semibold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {t.welcomeBack}, {user.name} 👋
        </h1>
        <p className="text-[#5C6479] text-sm mb-8">{t.welcomeSub}</p>
        <button
          onClick={onContinue}
          className="w-full rounded-2xl bg-[#4F8EF7] hover:bg-[#3F7DE0] text-white font-medium py-3.5 text-sm transition-colors"
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
    <div className="min-h-screen bg-white text-[#1a1a2e] flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="flex justify-end mb-4">
          {!isLast && (
            <button onClick={onDone} className="text-xs text-[#8B95AB] hover:text-[#1a1a2e]">
              {t.skip}
            </button>
          )}
        </div>

        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-[#4F8EF7]/10 flex items-center justify-center mb-6">
            <Icon className="w-10 h-10 text-[#4F8EF7]" strokeWidth={1.5} />
          </div>
          <h2 className="text-xl font-semibold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {title}
          </h2>
          <p className="text-[#5C6479] text-sm leading-relaxed px-2">{body}</p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-8">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${i === step ? "w-6 bg-[#4F8EF7]" : "w-1.5 bg-[#4F8EF7]/20"}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          {step > 0 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="flex-1 rounded-2xl border border-black/10 hover:bg-black/[0.03] text-[#1a1a2e] font-medium py-3.5 text-sm transition-colors flex items-center justify-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              {t.back}
            </button>
          )}
          <button
            onClick={() => (isLast ? onDone() : setStep((s) => s + 1))}
            className="flex-1 rounded-2xl bg-[#4F8EF7] hover:bg-[#3F7DE0] text-white font-medium py-3.5 text-sm transition-colors flex items-center justify-center gap-1.5"
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
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <Shield className="w-8 h-8 text-[#4F8EF7]" strokeWidth={1.6} fill="rgba(79,142,247,0.12)" />
        <span className="font-semibold text-base tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {t.brand}
        </span>
        <button onClick={() => setMobileOpen(false)} className="ml-auto md:hidden text-[#8B95AB]">
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => {
              setPage(key);
              setMobileOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
              page === key ? "bg-[#4F8EF7]/10 text-[#4F8EF7] font-medium" : "text-[#5C6479] hover:bg-black/[0.03]"
            }`}
          >
            <Icon className="w-4.5 h-4.5" />
            {label}
          </button>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-black/[0.06]">
        <div className="flex items-center gap-2.5 px-3 py-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-[#4F8EF7]/10 flex items-center justify-center text-xs font-medium text-[#4F8EF7] shrink-0">
            {initials(user.name)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs text-[#8B95AB] truncate">{user.email}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#5C6479] hover:bg-black/[0.03] transition-colors"
        >
          <LogOut className="w-4.5 h-4.5" />
          {t.logout}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-60 md:flex-col border-r border-black/[0.06] h-screen sticky top-0 bg-white shrink-0">
        {content}
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
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
    <header className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-black/[0.06] bg-white sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="md:hidden text-[#5C6479]">
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-base sm:text-lg font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setLang(lang === "en" ? "hi" : "en")}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-black/10 bg-black/[0.03] hover:bg-black/[0.06] transition-colors"
        >
          <Languages className="w-3.5 h-3.5" />
          {lang === "en" ? "हिंदी" : "English"}
        </button>
        <div className="w-8 h-8 rounded-full bg-[#4F8EF7]/10 flex items-center justify-center text-xs font-medium text-[#4F8EF7]">
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
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const data = await callAnalyzeAPI(jobText);
      const verdict = data.verdict || scoreToVerdict(data.risk_score);
      const finalResult = { ...data, verdict };
      setResult(finalResult);
      onScanSaved({ ...finalResult, job_text: jobText, timestamp: Date.now() });
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
    <div className="w-full max-w-2xl">
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
              className="w-full resize-none rounded-2xl bg-[#f5f5f5] border border-black/10 focus:border-[#4F8EF7]/60 focus:ring-2 focus:ring-[#4F8EF7]/20 outline-none p-4 sm:p-5 text-sm sm:text-base placeholder:text-[#5C6479] transition-colors disabled:opacity-50"
            />
            <button
              onClick={handlePaste}
              disabled={loading}
              className="absolute top-3 right-3 flex items-center gap-1 text-xs text-[#8B95AB] hover:text-[#1a1a2e] bg-black/[0.03] hover:bg-black/[0.06] px-2.5 py-1.5 rounded-lg transition-colors disabled:opacity-0"
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

      {result && <ResultCard lang={lang} result={result} onReset={reset} />}
    </div>
  );
}

// ---------------------------------------------------------
// RESULT CARD — shared between AnalyzePage and HistoryPage detail view
// ---------------------------------------------------------
function ResultCard({ lang, result, onReset, footerLabel }) {
  const t = TEXT[lang];
  return (
    <div className="space-y-5">
      <div
        className={`rounded-2xl border ${VERDICT_STYLES[result.verdict].ring} ${VERDICT_STYLES[result.verdict].bg} p-5 sm:p-6`}
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
        <div className="h-2 rounded-full bg-black/5 overflow-hidden">
          <div
            className={`h-full rounded-full ${VERDICT_STYLES[result.verdict].bar} transition-all duration-700 ease-out`}
            style={{ width: `${result.risk_score}%` }}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-black/10 bg-[#f5f5f5] p-5 sm:p-6">
        <span className="text-xs uppercase tracking-wider text-[#8B95AB] mb-3 block">{t.redFlagsTitle}</span>
        {result.red_flags.length === 0 ? (
          <p className="text-sm text-[#8B95AB] flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {t.noFlags}
          </p>
        ) : (
          <ul className="space-y-2.5">
            {result.red_flags.map((flag, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm sm:text-base text-[#2c2c3a]">
                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-red-500" />
                {flag}
              </li>
            ))}
          </ul>
        )}
      </div>

      {onReset && (
        <button
          onClick={onReset}
          className="w-full rounded-2xl border border-black/10 hover:bg-black/[0.03] text-[#1a1a2e] font-medium py-3.5 sm:py-4 text-sm sm:text-base transition-colors"
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

  async function handleClear() {
    setHistory([]);
    await saveHistory([]);
    setConfirmClear(false);
    setSelected(null);
  }

  if (selected) {
    return (
      <div className="w-full max-w-2xl">
        <button
          onClick={() => setSelected(null)}
          className="flex items-center gap-1.5 text-sm text-[#5C6479] hover:text-[#1a1a2e] mb-5"
        >
          <ChevronLeft className="w-4 h-4" />
          {t.backToHistory}
        </button>
        <p className="text-xs text-[#8B95AB] mb-4">{new Date(selected.timestamp).toLocaleString()}</p>
        <div className="rounded-2xl border border-black/10 bg-[#f5f5f5] p-4 mb-5 text-sm text-[#5C6479] max-h-40 overflow-y-auto whitespace-pre-wrap">
          {selected.job_text}
        </div>
        <ResultCard lang={lang} result={selected} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="flex items-center justify-between mb-5">
        <p className="text-[#8B95AB] text-sm">{history.length > 0 ? `${history.length} scans` : ""}</p>
        {history.length > 0 && (
          <button
            onClick={() => setConfirmClear(true)}
            className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
            {t.clearHistory}
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="rounded-2xl border border-black/10 bg-[#f5f5f5] p-10 text-center">
          <History className="w-8 h-8 text-[#8B95AB] mx-auto mb-3" strokeWidth={1.5} />
          <p className="text-sm text-[#8B95AB]">{t.historyEmpty}</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {history
            .slice()
            .reverse()
            .map((item, i) => {
              const Icon = VERDICT_STYLES[item.verdict].icon;
              return (
                <button
                  key={i}
                  onClick={() => setSelected(item)}
                  className="w-full text-left rounded-2xl border border-black/10 hover:border-black/20 bg-white p-4 transition-colors flex items-start gap-3"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${VERDICT_STYLES[item.verdict].bg}`}>
                    <Icon className={`w-4.5 h-4.5 ${VERDICT_STYLES[item.verdict].text}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-[#1a1a2e] truncate mb-0.5">{item.job_text.slice(0, 70)}{item.job_text.length > 70 ? "..." : ""}</p>
                    <p className="text-xs text-[#8B95AB]">{new Date(item.timestamp).toLocaleDateString()} · {t.riskScore} {item.risk_score}/100</p>
                  </div>
                  <span className={`text-xs font-medium shrink-0 ${VERDICT_STYLES[item.verdict].text}`}>
                    {t.verdicts[item.verdict]}
                  </span>
                </button>
              );
            })}
        </div>
      )}

      {confirmClear && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="font-semibold text-lg mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {t.clearConfirmTitle}
            </h3>
            <p className="text-sm text-[#5C6479] mb-6">{t.clearConfirmBody}</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setConfirmClear(false)}
                className="flex-1 rounded-xl border border-black/10 hover:bg-black/[0.03] py-2.5 text-sm font-medium transition-colors"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleClear}
                className="flex-1 rounded-xl bg-red-500 hover:bg-red-600 text-white py-2.5 text-sm font-medium transition-colors"
              >
                {t.confirmClear}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------
// MAIN APP — routing between auth / welcome / onboarding / app
// ---------------------------------------------------------
export default function App() {
  const [lang, setLang] = useState("en");
  const [stage, setStage] = useState("auth"); // auth | welcome | onboarding | app
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("analyze"); // analyze | history
  const [mobileOpen, setMobileOpen] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory().then(setHistory);
  }, []);

  function handleAuthed(userData) {
    setUser(userData);
    setStage("welcome");
  }

  function handleLogout() {
    setUser(null);
    setStage("auth");
    setPage("analyze");
  }

  async function handleScanSaved(scan) {
    const updated = [...history, scan];
    setHistory(updated);
    await saveHistory(updated);
  }

  if (stage === "auth") {
    return <AuthScreen lang={lang} setLang={setLang} onAuthed={handleAuthed} />;
  }

  if (stage === "welcome") {
    return <WelcomeScreen lang={lang} user={user} onContinue={() => setStage("onboarding")} />;
  }

  if (stage === "onboarding") {
    return <OnboardingSlides lang={lang} onDone={() => setStage("app")} />;
  }

  const t = TEXT[lang];
  const pageTitle = page === "analyze" ? t.navAnalyze : t.navHistory;

  return (
    <div className="min-h-screen bg-white text-[#1a1a2e] flex">
      <Sidebar
        lang={lang}
        user={user}
        page={page}
        setPage={setPage}
        onLogout={handleLogout}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar lang={lang} setLang={setLang} user={user} title={pageTitle} onMenuClick={() => setMobileOpen(true)} />

        <main className="flex-1 flex flex-col items-center px-4 py-8 sm:py-10">
          {page === "analyze" && <AnalyzePage lang={lang} onScanSaved={handleScanSaved} />}
          {page === "history" && <HistoryPage lang={lang} history={history} setHistory={setHistory} />}
        </main>
      </div>
    </div>
  );
}
