from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
from dotenv import load_dotenv
import os
import json

# .env file se API key load karo
load_dotenv()

app = FastAPI()

# CORS allow karo taaki frontend (React) backend se baat kar sake
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Groq client banaya
client = Groq(api_key=os.getenv("GROQ_API_KEY"))


# Request body ka structure define kiya
class JobPosting(BaseModel):
    text: str


@app.get("/")
def home():
    return {"message": "JobShield AI backend chal raha hai"}


@app.post("/analyze")
def analyze_job(job: JobPosting):
    # Prompt jo Groq ko bhejenge
    prompt = f"""Tum ek fraud detection AI ho. Niche diye gaye job posting ko analyze karo aur fraud signs check karo:
- Unrealistic salary (bahut zyada paisa kam kaam ke liye)
- Vague company details (company ka naam ya address clear nahi)
- Upfront payment maanga gaya ho (registration fee, training fee)
- Suspicious contact info (sirf WhatsApp number, no official email)

Job Posting:
{job.text}

Sirf neeche diye JSON format mein jawab do, koi extra text nahi:
{{
  "risk_score": <0 se 100 ke beech ek number>,
  "verdict": "<Green ya Yellow ya Red>",
  "red_flags": ["<flag 1>", "<flag 2>", ...],
  "summary": "<1-2 line mein verdict ka reason>"
}}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=0.3,
    )

    result_text = response.choices[0].message.content

    # JSON nikalne ki koshish karo (kabhi kabhi AI extra text bhi de deta hai)
    try:
        start = result_text.find("{")
        end = result_text.rfind("}") + 1
        json_str = result_text[start:end]
        result_json = json.loads(json_str)
    except Exception as e:
        result_json = {
            "risk_score": 50,
            "verdict": "Yellow",
            "red_flags": ["AI response parse nahi ho saka"],
            "summary": "Error aaya analysis mein, dobara try karo"
        }

    return result_json