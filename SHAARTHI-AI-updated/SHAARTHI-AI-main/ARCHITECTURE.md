# 🏗️ Saarthi AI - System Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          SAARTHI AI ECOSYSTEM                            │
└─────────────────────────────────────────────────────────────────────────┘

                          ┌─────────────────────┐
                          │  End Users (India)  │
                          │  4 Personas         │
                          │  ┌─────────────┐   │
                          │  │ Amma        │   │
                          │  │ Business    │   │
                          │  │ Senior      │   │
                          │  │ Student     │   │
                          │  └─────────────┘   │
                          └────────┬────────────┘
                                   │
                   ┌───────────────┼───────────────┐
                   │               │               │
        ┌──────────▼──────┐   ┌───▼────────┐  ┌──▼──────────┐
        │  Voice Input    │   │ Text Input  │  │Scam Shield  │
        │  (Speech-to-    │   │             │  │Detection    │
        │   Text)         │   │             │  │             │
        └──────────┬──────┘   └───┬────────┘  └──┬───────────┘
                   └───────────────┼───────────────┘
                                   │
                        ┌──────────▼──────────┐
                        │   React Frontend    │
                        │   (Vite Build)      │
                        │                     │
                        │  ┌──────────────┐   │
                        │  │ Components   │   │
                        │  │ Contexts     │   │
                        │  │ Hooks        │   │
                        │  │ Services     │   │
                        │  └──────────────┘   │
                        └──────────┬──────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    │              │              │
        ┌───────────▼────┐  ┌──────▼──────┐  ┌──▼──────────┐
        │  Gemini AI     │  │  Scam       │  │  Voice      │
        │  (Recipe,      │  │  Detection  │  │  Service    │
        │  Study Notes,  │  │  Engine     │  │  (TTS/STT)  │
        │  Career, etc)  │  │             │  │             │
        └───────────┬────┘  └──────┬──────┘  └──┬───────────┘
                    │              │              │
                    └──────────────┼──────────────┘
                                   │
                        ┌──────────▼──────────┐
                        │  Node.js Backend    │
                        │  (Express)          │
                        │                     │
                        │  Routes:            │
                        │  /api/auth          │
                        │  /api/recipes       │
                        │  /api/schemes       │
                        │  /api/scholarships  │
                        │  /api/customers     │
                        └──────────┬──────────┘
                                   │
                        ┌──────────▼──────────┐
                        │  MongoDB Database   │
                        │  (Atlas)            │
                        │                     │
                        │  Collections:       │
                        │  - Users            │
                        │  - Recipes          │
                        │  - Schemes          │
                        │  - Scholarships     │
                        │  - Customers        │
                        └─────────────────────┘

```

---

## Data Flow Architecture

```
USER INTERACTION → FRONTEND COMPONENTS → CONTEXT/HOOKS → SERVICES

┌─────────────────┐
│   User Input    │
│  (4 Personas)   │
└────────┬────────┘
         │
    ┌────▼────┐
    │ Landing │
    └────┬────┘
         │
    ┌────▼────────┐
    │   Login      │
    │ (JWT Auth)   │
    └────┬────────┘
         │
    ┌────▼──────────────┐
    │  Select Mode      │
    │  ┌────────────┐   │
    │  │ Amma       │   │
    │  │ Business   │   │
    │  │ Senior     │   │
    │  │ Student    │   │
    │  └────────────┘   │
    └────┬──────────────┘
         │
    ┌────▼────────────────────────────┐
    │  Dashboard with AI Features      │
    │                                   │
    │  Feature Tabs:                    │
    │  ┌──────────────────────────┐    │
    │  │ AI Service Call          │    │
    │  │ - Gemini API             │    │
    │  │ - Scam Detection         │    │
    │  │ - Voice Service          │    │
    │  └──────┬───────────────────┘    │
    │         │                        │
    │  ┌──────▼───────────────────┐    │
    │  │ Backend API Response      │    │
    │  │ + Persona-specific AI     │    │
    │  └──────┬───────────────────┘    │
    │         │                        │
    │  ┌──────▼───────────────────┐    │
    │  │ UI Update + Voice Output  │    │
    │  └──────────────────────────┘    │
    └─────────────────────────────────┘
         │
         │ Save to DB
         │
    ┌────▼──────────────┐
    │  MongoDB Storage   │
    │  (User Data)       │
    └───────────────────┘
```

---

## AI Integration Architecture

```
PERSONA DETECTION → AI PROMPT → API CALL → RESPONSE → PERSONA OUTPUT

┌────────────────┐
│ Detect Mode    │
│ - Amma         │
│ - Business     │
│ - Senior       │
│ - Student      │
└────────┬───────┘
         │
    ┌────▼─────────────────────────┐
    │ Persona System Prompt         │
    │                               │
    │ + Personality traits          │
    │ + Context specific to mode    │
    │ + Language preferences        │
    │ + Response style              │
    └────────┬──────────────────────┘
             │
        ┌────▼──────────────┐
        │  User Input +     │
        │  Template Prompt  │
        └────────┬──────────┘
                 │
             ┌───▼──────────────────────┐
             │  Gemini 2.0 Flash API    │
             │                          │
             │  Input: System Prompt +  │
             │         User Query       │
             │                          │
             │  Output: Structured JSON │
             └───┬──────────────────────┘
                 │
        ┌────────▼─────────────┐
        │ Parse Response JSON   │
        └────────┬─────────────┘
                 │
        ┌────────▼──────────────────────┐
        │ Apply Persona Voice Settings   │
        │                                │
        │ Voice Tone, Speed, Pitch,      │
        │ Language, Personality traits   │
        └────────┬──────────────────────┘
                 │
        ┌────────▼──────────────┐
        │ User-Facing Output    │
        │                        │
        │ - Text Response        │
        │ - Voice Output (TTS)   │
        │ - Persona-specific UI  │
        └────────────────────────┘
```

---

## Scam Detection Flow

```
INCOMING MESSAGE → PATTERN MATCHING → RISK SCORING → ALERT

┌─────────────────────────────────┐
│ Incoming Message                │
│ - SMS                           │
│ - WhatsApp                      │
│ - UPI Transaction               │
│ - Email/Link                    │
└────────────┬────────────────────┘
             │
      ┌──────▼──────────────────┐
      │ Pattern Matching Engine │
      │                         │
      │ Check against 20+       │
      │ known scam patterns     │
      └──────┬─────────────────┘
             │
      ┌──────▼─────────────────┐
      │ Assign Risk Scores     │
      │                        │
      │ High Risk: 30-50 pts  │
      │ Med Risk: 15-25 pts   │
      │ Low Risk: 5-10 pts    │
      └──────┬────────────────┘
             │
      ┌──────▼──────────────────┐
      │ Aggregate Risk Score    │
      │                         │
      │ Total Risk %            │
      │ Risk Level:             │
      │ CRITICAL/HIGH/MEDIUM/LOW│
      └──────┬─────────────────┘
             │
      ┌──────▼────────────────────────┐
      │ Generate Recommendation        │
      │                                │
      │ Based on Risk Level:           │
      │ - DO NOT CLICK (>80%)         │
      │ - BE CAUTIOUS (40-80%)        │
      │ - LIKELY SAFE (<40%)          │
      └──────┬───────────────────────┘
             │
      ┌──────▼────────────────────────┐
      │ User Alert + Education         │
      │                                │
      │ - Risk score display           │
      │ - Detected threats list        │
      │ - Safety tips for category     │
      │ - Protective actions           │
      └────────────────────────────────┘
```

---

## Voice Service Architecture

```
INPUT → LANGUAGE DETECT → PERSONA VOICE → OUTPUT

Speech Input (STT)
      │
┌─────▼────────────────────┐
│ Speech Recognition API   │
│                          │
│ Languages:              │
│ - English (en-US)      │
│ - Hindi (hi-IN)        │
│ - Tamil (ta-IN)        │
│ - Telugu (te-IN)       │
└─────┬────────────────────┘
      │
      └────► Text Transcript
             │
      ┌──────▼──────────────┐
      │ Process with AI     │
      │ (Gemini)            │
      └──────┬──────────────┘
             │
      ┌──────▼──────────────────┐
      │ Generate Response Text  │
      └──────┬──────────────────┘
             │
      ┌──────▼──────────────────────────┐
      │ Persona Voice Settings           │
      │                                   │
      │ Amma Mode:                       │
      │ - Pitch: 0.8 (warm)             │
      │ - Speed: 0.9 (slower)           │
      │ - Tone: caring                  │
      │                                   │
      │ Senior Mode:                     │
      │ - Pitch: 0.7 (gentle)           │
      │ - Speed: 0.7 (very slow)        │
      │ - Tone: patient                 │
      │                                   │
      │ Business Mode:                   │
      │ - Pitch: 1.0 (professional)     │
      │ - Speed: 1.0 (normal)           │
      │ - Tone: authoritative           │
      │                                   │
      │ Student Mode:                    │
      │ - Pitch: 1.1 (energetic)        │
      │ - Speed: 1.1 (engaging)         │
      │ - Tone: encouraging             │
      └──────┬──────────────────────────┘
             │
      ┌──────▼──────────────────┐
      │ Text-to-Speech Output   │
      │                         │
      │ - Language-specific     │
      │ - Persona-specific tone │
      │ - Accessible for all    │
      └─────────────────────────┘
```

---

## Database Schema

```
Users (Authentication)
├─ id
├─ email
├─ password (hashed)
├─ name
├─ phone
├─ mode (amma/business/senior/student)
├─ language
└─ createdAt

Recipes
├─ id
├─ userId
├─ name
├─ cuisine
├─ ingredients[]
├─ steps[]
├─ cookingTime
├─ difficulty
├─ nutrition{}
└─ createdAt

Schemes
├─ id
├─ name
├─ category
├─ benefit
├─ eligibility
├─ documents[]
├─ deadline
└─ applicationUrl

Scholarships
├─ id
├─ name
├─ amount
├─ eligibility
├─ deadline
├─ category
└─ university

Customers (Business Mode)
├─ id
├─ userId
├─ name
├─ phone
├─ email
├─ company
├─ purchaseHistory[]
└─ totalSpent
```

---

## Deployment Architecture

```
GitHub Repository
       │
       ├─────────────────────────┐
       │                         │
   ┌───▼─────┐           ┌──────▼────┐
   │ Frontend │           │ Backend    │
   │ (src/)   │           │(backend/)  │
   └───┬─────┘           └──────┬─────┘
       │                         │
   ┌───▼──────────────┐  ┌──────▼────────────┐
   │ Vercel Deploy    │  │ Vercel Deploy     │
   │                  │  │                   │
   │ Build: npm build │  │ Root Dir: backend │
   │ Output: dist/    │  │ Start: node ..    │
   └───┬──────────────┘  └──────┬────────────┘
       │                         │
   ┌───▼──────────────┐  ┌──────▼────────────┐
   │ Live Frontend    │  │ Live API          │
   │ saarthi-ai.      │  │ saarthi-api.      │
   │ vercel.app       │  │ vercel.app/api    │
   └────────┬─────────┘  └──────┬────────────┘
            │                    │
            └────────┬───────────┘
                     │
            ┌────────▼──────────────┐
            │ MongoDB Atlas         │
            │ (Cloud Database)      │
            │                       │
            │ Connection String:    │
            │ mongodb+srv://...     │
            └───────────────────────┘
```

---

This architecture ensures:
✅ Scalability - Microservices ready
✅ Security - JWT auth, encrypted passwords
✅ Accessibility - Multi-language, voice-enabled
✅ Performance - Vite build optimization
✅ Reliability - Redundant services, fallbacks
