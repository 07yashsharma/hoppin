# hopin — AI-Powered Smart Cab Booking & Highway Pooling Platform

[![Tests](https://img.shields.io/badge/tests-10%2F10%20passing-emerald.svg)]()
[![Frontend](https://img.shields.io/badge/frontend-React%20%7C%20TypeScript%20%7C%20Vite%20%7C%20Tailwind-lime.svg)]()
[![Backend](https://img.shields.io/badge/backend-Node.js%20%7C%20Express%20REST-black.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)]()

> **"GOOD ROUTES. BETTER COMPANY."**  
> *City to city, street to street. Find people heading your way, share a cab, and make the journey cost less.*

`hopin` is a distinctive, premium mobility web application designed for intra-city rides and interstate highway corridors across India (including Jaipur–Delhi NCR and Jaipur–Ajmer). It pairs compatible travelers into verified shared cabs using a deterministic, multi-factor AI route-matching algorithm—reducing travel costs by ~37%, cutting highway empty seats, and avoiding excess CO₂ emissions.

---

## 🎨 Visual Identity & Brand System

- **Palette**: Warm off-white (`#F5F3EB`), near-black (`#171916`), vivid lime green (`#C5F55A`), cobalt blue (`#345CFF`), and warm orange (`#FF7948`).
- **Typography**: Space Grotesk (display headlines), JetBrains Mono (technical metadata tags and telemetry), and Inter (clean UI text).
- **Aesthetic**: Handcrafted creative coding studio style, terminal-inspired metadata tags, tactile borders (`border-2 border-hopin-dark`), and offset box shadows (`shadow-[4px_4px_0px_0px_#171916]`).
- **3D Interaction**: Interactive mouse-responsive 3D route sculpture with perspective depth and highway telemetry.

---

## 🌟 Key Capabilities

### 1. Smart Booking Engine
- **Triple Journey Scope**: City Transit (intra-Jaipur), Outstation (Jaipur–Ajmer), and Interstate Expressways (Jaipur–Delhi NCR via NH 48).
- **Location Autocomplete**: Verified Indian transit hubs with exact coordinates (Jaipur Junction, Delhi IGI Airport Terminal 3, Cyber Hub Gurugram, Ajmer Sharif, MI Road, Mansarovar Metro).
- **Detour Tolerance Slider**: Commuters declare their personal maximum allowable detour (10 to 45 minutes).
- **Ride Mode Choice**: Toggle between **AI Shared Pool** (save ~37%) and **Private Solo Cab**.
- **Real-Time Fare & Corridor Preview**: Dynamic distance calculation, time estimates, and interactive RouteMap.

### 2. Core Feature: Explainable AI Route-Matching Engine
A deterministic, testable spatial optimization algorithm in `backend/src/services/routeEngine.js`:
1. **Geographic Proximity**: Calculates road-network distance between pickup and drop-off points.
2. **Directional Vector Alignment**: Computes travel bearings ($\theta_A, \theta_B$) and Cosine similarity $\cos(\Delta \theta)$. Divergent headings ($\cos < 0.45$) are rejected.
3. **Temporal Alignment**: Departure time differential ($|T_A - T_B|$). Scaled smoothly with hard limits (30 min for city, 50 min for interstate).
4. **Waypoint Permutation Optimization**: Evaluates all valid pickup/drop orderings ($P_A \to P_B \to D_A \to D_B$, $P_A \to P_B \to D_B \to D_A$) to minimize total vehicle kilometers.
5. **Vehicle Capacity & Luggage Constraints**: Enforces passenger and cargo limits.
6. **Multi-Factor Score (0 – 100)**: Weighted composition of pickup proximity (25%), dropoff corridor alignment (25%), heading similarity (20%), departure proximity (15%), and detour penalty (15%).
7. **Explainable AI Reasoning**: Generates plain-English bullet explanations of why routes match or why candidate pairs were rejected.

### 3. Fair Pricing & Guaranteed Reconciliation
- **Transparent Formula**:
  $$\text{Private Fare} = \text{Base} + (\text{Solo Distance} \times \text{Rate/km}) + (\text{Duration} \times \text{Rate/min}) + \text{Platform Fee} + \text{GST (5\%)}$$
  $$\text{Shared Fare} = \text{Solo Fare} \times (1 - \text{Discount Factor}) \pm \text{Detour Offset}$$
- **Reconciliation**:
  $$\text{Passenger A Contribution} + \text{Passenger B Contribution} = \text{Driver Payout (85\%)} + \text{Platform Commission (15\%)}$$
- Guaranteed savings of ₹1,200 to ₹1,500 (~37%) per passenger on the Jaipur–Delhi corridor.

### 4. Passenger Profiles & Verified Co-Passenger Ratings
- **Pre-Booking Co-Passenger Preview**: Display name, verified badges (Phone, Corporate Email, Govt ID), completed ride count, and star ratings.
- **Multi-Category 5-Star Reviews**: Punctuality, Courtesy & Respect, Communication, Vehicle Cleanliness, and Overall Experience.
- **Character Tags**: Predefined chips including *"On time"*, *"Polite"*, *"Good communicator"*, *"Respectful"*, and *"Quiet"*.
- **Integrity Safeguards**: Reviews are unlocked exclusively after a booking is marked completed; duplicate submissions are strictly prevented.

### 5. Safety Protocols & Demo Emergency SOS
- **Emergency SOS**: Clear demo-mode disclaimer alerting registered emergency contacts with GPS telemetry and incident logging.
- **Emergency Contacts**: Manage trusted family/friends for instant SMS notifications.
- **Driver Verification**: Commercial AITP / state tourist permits and license verification.
- **Safety Reporting & Blocking**: In-app incident reporting and one-click user blocking.

### 6. Commercial Captain Terminal (Driver Portal)
- **Online/Offline Dispatch Toggle**.
- **Assigned Ride Passenger Manifest**: Step-by-step pickup order and customer OTP verification.
- **Trip Actions**: *"Arrived at Pickup"*, *"Start Trip (Verify OTP)"*, and *"Complete Trip & Credit Wallet"*.
- **Earnings Telemetry**: Real-time driver payout (85%), wallet balance, and completed trips counter.

### 7. Operations Admin Dashboard
- **Platform Analytics**: Total rides, completed rides, match acceptance rate (%), cumulative passenger savings (₹), and avoided CO₂ emissions (kg).
- **Incident Escalation Desk**: Moderate safety tickets and user disputes.
- **Pricing Policy Configuration**: Interactive slider to adjust platform commission take-rate (5%–25%) and toggle auto-vehicle dispatch.

---

## 🛠️ Project Structure

```
hopin/
├── backend/
│   ├── src/
│   │   ├── controllers/       # Auth, Rides, Matches, Reviews, Safety, Driver, Admin
│   │   ├── data/              # Verified Indian locations, seed data, database store
│   │   ├── services/          # AI Route-Matching engine & pricing services
│   │   ├── tests/             # 10 automated test suites (node:test)
│   │   └── server.js          # Express app entry point (port 5000)
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/        # Navbar, RouteMap, LiveMatchVisualizer, CoPassengerCard, SOS Modal, Footer
│   │   ├── context/           # AuthContext with 1-click persona switching
│   │   ├── pages/             # All 15 functional pages
│   │   ├── services/          # Typed API client
│   │   ├── App.tsx            # React Router v6 setup
│   │   └── main.tsx
│   ├── vite.config.ts         # Vite config with backend proxy
│   ├── tailwind.config.js     # Custom hopin palette & typography
│   └── package.json
├── .gitignore
├── .env.example
├── package.json
└── README.md
```

---

## 🚀 Instant Quickstart

### 1. Installation
```bash
# Clone the repository
git clone <YOUR_REPO_URL>
cd hopin

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Run the Platform
In one terminal, start the backend:
```bash
cd backend
node src/server.js
# Backend runs at http://localhost:5000
```

In a second terminal, start the frontend:
```bash
cd frontend
npm run dev
# Frontend runs at http://localhost:5173
```

### 3. Run Automated Tests
```bash
cd backend
npm test
# Runs 10/10 automated tests covering distance, headings, waypoint permutations, and pricing reconciliation.
```

---

## 🤖 Guide for AI Assistants Editing this Repository

When modifying or extending this codebase:
1. **Preserve the brand name**: The application is named **`hopin`**.
2. **Follow the design tokens**:
   - Palette: `bg-hopin-bg` (`#F5F3EB`), `text-hopin-dark` (`#171916`), `bg-hopin-lime` (`#C5F55A`), `text-hopin-cobalt` (`#345CFF`).
   - Font families: `font-display` (Space Grotesk), `font-mono` (JetBrains Mono), `font-sans` (Inter).
   - Card styling: `border-2 border-hopin-dark shadow-[4px_4px_0px_0px_#171916]`.
3. **Preserve Route Matching Integrity**:
   - The matching logic in `backend/src/services/routeEngine.js` must remain deterministic and testable.
   - Run `npm test` inside `backend/` to ensure all 10 tests continue passing after changes.
4. **Preserve Dual Acceptance Workflow**:
   - Matches require both passengers to accept before assigning a driver.
   - Maintain the simulated demo data and pre-seeded personas (Rohan, Priya, Vikram, Admin) in `backend/src/data/seedData.js`.

---

## 📄 License
MIT License. Crafted for Indian Highway Mobility.
