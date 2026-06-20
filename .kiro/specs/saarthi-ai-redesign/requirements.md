# Requirements Document

## Introduction

Saarthi AI is an India-focused digital companion platform that provides personalised AI guidance to four distinct user groups: homemakers/families (Amma), senior citizens (Senior), students (Student), and small business owners (Business). The current implementation renders all personas and features together in a single dashboard. This redesign introduces a dedicated journey — Landing → Persona Selection → Persona Dashboard — where each persona has its own visual identity, navigation, AI assistant, and toolset. The redesign also elevates the UI to a premium, culturally-relevant, startup-ready standard with glassmorphism aesthetics, a saffron/navy Indian colour palette, and full voice and accessibility support.

---

## Glossary

- **Platform**: The complete Saarthi AI web application (React + Vite frontend, Node.js/Express backend).
- **Persona**: One of four user archetypes — Amma, Senior, Student, Business — each with its own dashboard, features, AI system prompt, and visual theme.
- **Landing Page**: The public-facing entry page a user sees before selecting a persona.
- **Persona Selection Page**: The page that presents all four personas as selectable cards.
- **Persona Dashboard**: The authenticated, persona-specific workspace a user lands in after selecting a persona.
- **AI_Service**: The centralised frontend service that calls the Gemini API using persona-specific system prompts.
- **Scam_Shield**: The module that analyses text messages, WhatsApp messages, emails, and URLs for scam risk.
- **Voice_Assistant**: The browser-based speech-to-text and text-to-speech subsystem.
- **Senior_Mode**: A UI accessibility layer that increases font sizes, contrast, button size, and simplifies navigation for elderly users.
- **Router**: The React client-side routing layer that maps URLs to page components.
- **Auth_Service**: The frontend authentication service backed by JWT tokens and the Express `/api/auth` routes.
- **Gemini_API**: Google's Generative Language API (gemini-2.0-flash model) used for all AI responses.
- **GST**: Goods and Services Tax — Indian indirect tax relevant to the Business persona.

---

## Requirements

### Requirement 1: Landing Page Redesign

**User Story:** As a first-time visitor, I want to see a compelling, culturally-relevant landing page that clearly communicates Saarthi's value proposition, so that I understand who it is for and feel motivated to explore further.

#### Acceptance Criteria

1. THE Platform SHALL render a Landing Page at the root URL (`/`) that is visible without authentication.
2. WHEN the Landing Page loads, THE Platform SHALL display a hero section containing a "Namaste 🙏" greeting, the Saarthi brand name, a value-proposition headline, a short sub-headline, and a primary CTA button labelled "Choose Your Saarthi".
3. WHEN a visitor clicks the "Choose Your Saarthi" CTA, THE Router SHALL navigate the visitor to the Persona Selection Page.
4. THE Landing Page SHALL contain a problems section that presents at least four distinct pain points: digital scams, digital literacy challenges, career confusion, and government scheme awareness.
5. THE Landing Page SHALL contain a persona showcase section that displays preview cards for all four personas: Amma Saarthi, Senior Saarthi, Student Saarthi, and Business Saarthi.
6. THE Landing Page SHALL contain a core features section that highlights AI Assistant, Scam Shield, Government Schemes, Learning Hub, and Voice Support.
7. THE Landing Page SHALL contain an impact/trust section and a footer with relevant links.
8. THE Landing Page SHALL apply the brand colour palette: Primary Saffron `#FF9933`, Navy Blue `#1B365D`, Ivory `#FFF8E7`, Gold `#D4AF37`, Dark Navy `#0F172A`.
9. THE Platform SHALL render the Landing Page responsively across mobile (≥320px), tablet (≥768px), and desktop (≥1280px) viewport widths.
10. WHEN the Landing Page renders, THE Platform SHALL load all above-the-fold content within 3 seconds on a standard broadband connection.

---

### Requirement 2: Persona Selection Page

**User Story:** As a visitor who clicked "Choose Your Saarthi", I want to see four clear, premium persona cards so that I can identify which Saarthi companion is right for me and enter their dedicated experience.

#### Acceptance Criteria

1. THE Platform SHALL render a Persona Selection Page at the route `/personas`.
2. THE Persona Selection Page SHALL display four persona cards: Amma Saarthi, Senior Saarthi, Student Saarthi, and Business Saarthi.
3. WHEN a persona card renders, THE Platform SHALL display: a persona illustration or icon, the persona name, a one-sentence description, a list of three or more key benefits, and an "Enter [Persona]" button.
4. WHEN a user clicks "Enter [Persona]", THE Router SHALL navigate the user to the authentication flow if the user is unauthenticated, or directly to that persona's Dashboard if the user is already authenticated.
5. THE Persona Selection Page SHALL apply glassmorphism card styling: semi-transparent backgrounds, backdrop blur, and subtle border highlights.
6. WHEN a user hovers over a persona card, THE Platform SHALL display a smooth visual focus effect (scale or glow) within 200ms.
7. THE Persona Selection Page SHALL be fully responsive, displaying cards in a two-column grid on tablet and desktop, and a single-column stack on mobile.

---

### Requirement 3: Persona-Specific Dashboards

**User Story:** As an authenticated user who has selected a persona, I want to land on a dedicated dashboard tailored to my persona so that I immediately see features and tools relevant to my life.

#### Acceptance Criteria

1. THE Platform SHALL render a dedicated Dashboard for each of the four personas at distinct routes: `/dashboard/student`, `/dashboard/senior`, `/dashboard/amma`, `/dashboard/business`.
2. IF an unauthenticated user attempts to access a Dashboard route, THEN THE Router SHALL redirect the user to the authentication page.
3. WHEN a Dashboard renders, THE Platform SHALL display a left-side navigation sidebar containing: Dashboard, AI Assistant, Scam Shield, Resources, Government Schemes, and Settings links.
4. WHEN a Dashboard renders, THE Platform SHALL apply a visual theme derived from the selected persona's colour identity.
5. THE Student Dashboard SHALL expose the following feature modules: Career Guidance, Study Planner, Internship Finder, Resume Builder, Notes Summarizer, Skill Roadmap, and AI Study Assistant.
6. THE Senior Dashboard SHALL expose the following feature modules: Scam Protection, Health Reminders, Emergency Contacts, Government Benefits, Voice Assistant, and Safety Alerts.
7. THE Amma Dashboard SHALL expose the following feature modules: Government Schemes, Family Assistance, Health Information, Digital Literacy, Scam Awareness, and Voice Guidance.
8. THE Business Dashboard SHALL expose the following feature modules: GST Guidance, Business Insights, Loan Discovery, Market Trends, Customer Growth, and AI Business Advisor.
9. THE Platform SHALL persist the active persona selection in `localStorage` so that a returning authenticated user is taken directly to their last-used Dashboard.
10. WHEN a user wishes to switch personas, THE Platform SHALL provide a "Switch Persona" action in the sidebar that navigates back to the Persona Selection Page.

---

### Requirement 4: Persona-Specific AI Assistant

**User Story:** As a user on any persona Dashboard, I want to chat with an AI assistant whose personality, language, and knowledge is tailored to my persona, so that the guidance I receive feels personally relevant and trustworthy.

#### Acceptance Criteria

1. THE AI_Service SHALL accept a `persona` parameter and apply the corresponding system prompt before sending any request to the Gemini_API.
2. THE Student persona system prompt SHALL instruct the AI to act as a career mentor and study assistant using motivating, student-appropriate language.
3. THE Senior persona system prompt SHALL instruct the AI to use simple language, short sentences, and a safety-first focus appropriate for elderly users.
4. THE Amma persona system prompt SHALL instruct the AI to provide family support, government scheme guidance, and household advice using warm, empathetic language.
5. THE Business persona system prompt SHALL instruct the AI to deliver growth-oriented, data-aware business advisory in professional language.
6. WHEN a user submits a message in the AI Assistant panel, THE AI_Service SHALL send the message with the active persona's system prompt to the Gemini_API and return a response within 10 seconds under normal network conditions.
7. IF the Gemini_API returns an error or does not respond within 10 seconds, THEN THE AI_Service SHALL display a user-visible error message without crashing the UI.
8. THE AI_Service SHALL be implemented as a single reusable module consumed by all four persona dashboards, with persona configuration injected at the call site.
9. WHEN a response is received, THE Platform SHALL render the AI response text in the chat panel and optionally read it aloud via the Voice_Assistant if voice mode is active.

---

### Requirement 5: Scam Shield Module

**User Story:** As any Saarthi user, I want to paste a suspicious message, email, or URL into a Scam Shield tool and get an instant risk assessment, so that I can protect myself and my family from digital fraud.

#### Acceptance Criteria

1. THE Platform SHALL provide a Scam Shield module accessible from the sidebar navigation within every persona Dashboard.
2. THE Scam_Shield SHALL support four input channels: SMS, WhatsApp Message, Email, and URL.
3. WHEN a user selects an input channel and submits content, THE Scam_Shield SHALL return a result within 2 seconds.
4. THE Scam_Shield SHALL classify every analysis result into one of three verdict levels: SAFE, SUSPICIOUS, or HIGH RISK.
5. WHEN a result is returned, THE Scam_Shield SHALL display: the verdict level with a colour-coded badge (green / amber / red), a numeric risk score from 0 to 100, a plain-language explanation of detected threats, and a list of recommended actions.
6. THE Scam_Shield SHALL detect, at minimum, the following threat categories: phishing links, OTP/credential theft, lottery/prize scams, employment fraud, investment fraud, UPI fraud patterns, and shortened URLs masking destinations.
7. IF the submitted URL does not start with `https`, THEN THE Scam_Shield SHALL include a non-HTTPS warning as a risk indicator.
8. THE Scam_Shield SHALL display persona-appropriate safety tips alongside the result (e.g., simpler language for Senior persona).
9. FOR ALL valid text inputs, the Scam_Shield risk scoring function SHALL return equivalent risk scores when the same input is submitted multiple times (idempotence property).

---

### Requirement 6: Voice Assistant

**User Story:** As a user — especially a senior citizen or rural homemaker — I want to interact with Saarthi by speaking rather than typing, so that I can use the platform even if I am not comfortable with a keyboard.

#### Acceptance Criteria

1. THE Platform SHALL display a "Talk to Saarthi" button on every persona Dashboard.
2. WHEN a user activates the "Talk to Saarthi" button, THE Voice_Assistant SHALL begin listening using the browser's Web Speech API speech-to-text capability.
3. WHEN speech recognition produces a transcript, THE Voice_Assistant SHALL pass that transcript to the AI_Service as the user's query.
4. WHEN the AI_Service returns a response, THE Voice_Assistant SHALL read the response aloud using the browser's SpeechSynthesis API with persona-specific voice settings (pitch, rate, and language code).
5. THE Voice_Assistant SHALL use the following voice configurations per persona:
   - Student: pitch 1.1, rate 1.1, motivating tone
   - Senior: pitch 0.7, rate 0.7, patient and clear tone
   - Amma: pitch 0.8, rate 0.9, warm and caring tone
   - Business: pitch 1.0, rate 1.0, professional tone
6. THE Voice_Assistant SHALL support at minimum the following language codes: `en-US`, `hi-IN`, `ta-IN`, `te-IN`.
7. IF the user's browser does not support the Web Speech API, THEN THE Platform SHALL display a visible fallback notice that voice is unavailable and prompt the user to use text input.
8. WHEN voice input is active, THE Platform SHALL display a visual listening indicator so the user knows the microphone is open.

---

### Requirement 7: Senior Accessibility Mode

**User Story:** As a senior citizen, I want the platform to automatically apply larger text, high contrast, and simpler navigation when I use the Senior persona, so that I can read and navigate comfortably without strain.

#### Acceptance Criteria

1. WHEN the Senior Dashboard is active, THE Platform SHALL apply Senior_Mode automatically, without requiring any additional action from the user.
2. WHILE Senior_Mode is active, THE Platform SHALL render all body text at a minimum of 18px and all headings at a minimum of 24px.
3. WHILE Senior_Mode is active, THE Platform SHALL ensure all interactive buttons are at least 48px × 48px in tap/click target size.
4. WHILE Senior_Mode is active, THE Platform SHALL apply a high-contrast colour scheme with a contrast ratio of at least 4.5:1 for all text-on-background combinations, per WCAG 2.1 AA guidance.
5. WHILE Senior_Mode is active, THE Platform SHALL display navigation labels as full text (not icon-only), so that the user understands each navigation item without prior knowledge.
6. THE Platform SHALL provide a toggle in the Senior Dashboard Settings panel to enable or disable Senior_Mode manually.

---

### Requirement 8: Navigation and Routing Architecture

**User Story:** As a developer and as a user, I want the platform to have a clear, consistent routing and navigation structure so that every page is reachable by URL and the sidebar remains consistent within each persona.

#### Acceptance Criteria

1. THE Router SHALL implement client-side routing using React's routing conventions, supporting the following routes: `/` (Landing), `/personas` (Persona Selection), `/auth` (Login/Register), `/dashboard/student`, `/dashboard/senior`, `/dashboard/amma`, `/dashboard/business`.
2. THE Platform SHALL render a persistent sidebar navigation within all four Dashboard routes.
3. THE sidebar SHALL contain links for: Dashboard (home for the persona), AI Assistant, Scam Shield, Resources, Government Schemes, and Settings.
4. WHEN a user navigates using the browser back/forward buttons, THE Router SHALL correctly restore the appropriate page state.
5. THE Platform SHALL display a 404 Not Found page for any route not defined in the Router.
6. WHEN a user is authenticated and navigates to `/`, THE Router SHALL redirect the user to the persona selection page or their last active persona dashboard.

---

### Requirement 9: UI Design System and Visual Identity

**User Story:** As a product stakeholder, I want the platform to have a consistent, premium visual identity so that the product looks trustworthy, modern, and culturally relevant to Indian users.

#### Acceptance Criteria

1. THE Platform SHALL define and apply a shared design-token CSS file that exports the following colour variables: `--saffron: #FF9933`, `--navy: #1B365D`, `--ivory: #FFF8E7`, `--gold: #D4AF37`, `--dark-navy: #0F172A`.
2. THE Platform SHALL use glassmorphism card styles — semi-transparent background, `backdrop-filter: blur(≥8px)`, and a 1px semi-transparent border — on all persona cards, dashboard feature cards, and modal panels.
3. THE Platform SHALL apply smooth CSS transitions of 200–300ms duration on all interactive elements (buttons, cards, sidebar links).
4. THE Platform SHALL use a professional, readable font pairing: a display/heading font for titles and a sans-serif body font for content.
5. THE Platform SHALL render all pages with modern spacing: minimum 16px gutter on mobile, 24px gutter on tablet, 32px gutter on desktop.
6. THE Platform SHALL be responsive across viewport widths from 320px to 1920px.
7. THE Platform SHALL not use inline style objects as the primary styling mechanism; CSS modules, Tailwind, or a design-token-driven global stylesheet SHALL be used instead.

---

### Requirement 10: Codebase Restructuring and Component Architecture

**User Story:** As a developer maintaining or extending Saarthi, I want a clean, well-organised codebase with reusable components and a clear API layer, so that features can be added or changed without touching unrelated code.

#### Acceptance Criteria

1. THE Platform SHALL organise the `src/` directory with the following top-level folders: `pages/`, `components/`, `features/`, `services/`, `contexts/`, `hooks/`, `styles/`, `config/`, and `utils/`.
2. THE Platform SHALL place each persona's dashboard and feature components inside a dedicated sub-folder under `features/` (e.g., `features/student/`, `features/senior/`, `features/amma/`, `features/business/`).
3. THE Platform SHALL expose all shared UI primitives (Button, Card, Input, Badge, Modal, Sidebar) as named exports from a single `components/shared/index.js` barrel file.
4. THE Platform SHALL consolidate all Gemini API calls into a single `services/ai.js` module that accepts a `{ persona, query, context }` argument and returns a standardised response shape.
5. THE Platform SHALL remove all duplicate page components (the parallel `src/components/pages/` and `src/pages/` directories currently both contain Dashboard, Landing, and Login — one set SHALL be removed).
6. WHEN a new persona feature is added, THE Platform SHALL not require changes to any other persona's feature folder.
7. THE Platform SHALL define all persona configuration (system prompts, colours, feature list, voice settings) in a single `config/personas.js` file that is imported by all consuming modules.

---

### Requirement 11: Authentication Flow

**User Story:** As a new or returning user, I want a smooth login and registration experience that remembers my selected persona, so that I can quickly get back to the tools I need.

#### Acceptance Criteria

1. THE Auth_Service SHALL support user registration with the following required fields: name, email, phone number, password, and preferred language.
2. WHEN a user submits the registration form with valid data, THE Auth_Service SHALL create a new user account and automatically log the user in.
3. WHEN a user submits the registration form with an email that already exists, THE Auth_Service SHALL return a descriptive error message within 3 seconds without crashing the UI.
4. WHEN a user submits the login form with valid credentials, THE Auth_Service SHALL authenticate the user and navigate them to the Persona Selection Page or their last active persona Dashboard within 3 seconds.
5. IF a login attempt fails due to incorrect credentials, THEN THE Auth_Service SHALL display a clear error message and allow the user to retry.
6. WHEN a user logs out, THE Auth_Service SHALL clear all session tokens from `localStorage` and redirect the user to the Landing Page.
7. THE Platform SHALL preserve the user's selected persona in `localStorage` across sessions so that a returning authenticated user is taken directly to their last Dashboard.

---

### Requirement 12: Government Schemes and Resources

**User Story:** As any Saarthi user, I want to browse and search government schemes and resources relevant to my persona, so that I can discover benefits I am entitled to.

#### Acceptance Criteria

1. THE Platform SHALL provide a Government Schemes section accessible from the sidebar within all four persona Dashboards.
2. WHEN a user opens Government Schemes, THE Platform SHALL display a list of schemes pre-filtered to the active persona's relevance (e.g., education schemes for Student, health/welfare schemes for Amma, pension/senior schemes for Senior, MSME schemes for Business).
3. WHEN a user selects a scheme, THE Platform SHALL display: scheme name, benefit description, eligibility criteria, required documents, application deadline (where applicable), and a link to the official application portal.
4. THE Platform SHALL allow a user to search schemes by keyword; WHEN a user types at least 2 characters in the search field, THE Platform SHALL filter the displayed list within 300ms.
5. THE AI_Service SHALL be available within the Government Schemes section so a user can ask the AI to explain any scheme in plain language appropriate for their persona.
