# **CONVEX.WORLD**

## **Constitutional Interface Design & Build Brief**

**Version 1.0** 

---

## **1\. What You Are Building**

This is **not** a marketing website, dashboard, or explorer.

Convex.world is a **live observation interface** into a deterministic economic system where **humans and autonomous agents participate under the same rules**.

The site should feel like:

* Instrumentation  
* Infrastructure  
* A system that is already running

If the experience feels promotional, playful, or gamified, it is wrong.

## **2\. Core Concept**

### **Economic Participants (Not “Users”)**

Everyone interacting with Convex is an **economic participant**.

* Humans define intent, policy, and constraints  
* Autonomous agents execute logic continuously  
* Both share:  
  * The same costs  
  * The same finality  
  * The same accountability

The UI must reflect **symmetry**, not hierarchy.

## **3\. Non-Negotiable Principles**

### **No User Illusions**

1. **No softening** — costs and limits must be visible  
2. **No faking** — no fake progress bars or artificial loading  
3. **No hidden state** — inspectable within three interactions  
4. **No anthropomorphism** — agents are not assistants or characters

### **Calm Over Clever**

* Precision beats flair  
* Restraint beats novelty  
* Meaningful motion only

## **4\. Visual System (Brand-Correct)**

All colors and typography are derived from the **official Convex Brand Manual** and must remain compliant .

### **Color Palette**

#### **Core Surfaces (≈80% of UI)**

| Usage | Color |
| ----- | ----- |
| Primary background | **Convex Dark Blue** `#0F206C` |
| Secondary surfaces | Dark Blue tints (90–80%) |
| Primary text | White `#FFFFFF` |
| Secondary text | Light Blue / Gray tints `#CFD2E2` |

Convex Dark Blue acts as the “rich black.”  
Avoid pure black for large surfaces.

#### **Functional Accents (≤10% usage)**

| Meaning | Color |
| ----- | ----- |
| Active / focus / selection | Medium Blue `#416BA9` |
| Compute / Juice | Rich Yellow `#E0CC00` |
| Consensus / success | Apple Green `#93D500` |
| Constraint / non-resolution | Blue pressure (not red errors) |

Accent colors signal **system state**, not decoration.

### **Typography**

#### **Primary Typeface**

**Inter**

* Headlines  
* Section titles  
* UI labels

Rules:

* Title Case (not ALL CAPS)  
* Avoid heavy weights unless necessary

#### **Secondary Typeface**

**Source Sans Variable** (or Source Sans Pro fallback)

* Body text  
* Explanatory copy  
* Metadata

#### **Code & Addresses**

* JetBrains Mono or Fira Code  
* Use only where semantic precision is required  
* Never truncate addresses silently

## **5\. Motion & Interaction**

* Motion must be slow, mathematical, and purposeful  
* If animation is noticeable, it is too strong  
* Motion communicates **state change**, not delight

## **6\. Key UI Concepts to Implement**

### **6.1 Participant Identity**

* All participants use the **same geometric base**  
* No avatars, faces, or characters

**Differentiation via behavior only:**

* Human participants: low-frequency, steady state  
* Autonomous agents: subtle high-frequency micro-activity

### **6.2 Constraint Ring (Signature Element)**

A radial boundary around an agent showing its operational limits:

* Spending caps  
* Memory limits  
* Authorization bounds  
* Duration constraints

**Behavior:**

* When limits are approached, show **resistance/pressure**  
* No collisions, explosions, or dramatic effects  
* This represents deterministic system physics

### **6.3 Negotiated Handshake (Offer → Resolution → Settlement)**

Replaces traditional “Submit / Approve” flows.

**States:**

1. **Offer** — asset enters a pending state  
2. **Resolution** — receiving agent evaluates conditions  
3. **Settlement** — state converges and finalizes

If conditions are not met:

* Asset calmly returns to the origin  
* This is not an error; it is non-resolution

### **6.4 Resource Instrumentation**

* **Juice Gauge** — predictive compute cost  
* **Memory Indicator** — storage usage and reclaim

These should look like **meters**, not progress bars.

### **6.5 Live System Observer**

The site must subtly indicate it is connected to the network.

* A calm lattice or mesh layer  
* Responds only to real consensus updates  
* One real data signal layer; everything else procedural

No looping videos. No fake motion.

## **7\. Homepage Structure**

### **Above the Fold**

* Dark blue background  
* Subtle lattice motion  
* No hero graphics

**Primary headline:**

Convex is a deterministic economic system shared by humans and autonomous agents.

**Secondary line:**

Both participate under the same rules, the same physics, and the same finality.

### **Proof of Life Strip**

A thin, real-time status band:

* Consensus height  
* Active participants  
* Recent Juice consumed  
* Memory reclaimed

This is **status**, not analytics.

### **Participation Models**

Three calm sections (not cards):

* Human Participant  
* Autonomous Agent  
* Joint Systems

Minimal copy. No icons.

### **Economics \= Physics**

Explain:

* Compute has weight  
* Storage is recyclable  
* State converges deterministically

### **Live Inspector**

Read-only inspector showing:

* CNS name  
* Balances  
* Juice  
* CVM Lisp source (collapsed by default)

This is for engineers and system designers.

### **Builder Section**

Simple, honest statement:

Convex is for people building economic systems where humans and agents must coexist safely.

Links only. No funnels.

### **Footer**

* Network status  
* Peer count  
* Protocol version

Feels like instrumentation, not legal cleanup.

## **8\. Language Rules (Strict)**

### **Never Use**

* User  
* Bot  
* AI assistant  
* Gas  
* Submit  
* Approve  
* Instant  
* Blockchain (without qualification)

### **Always Prefer**

* Participant  
* Autonomous agent  
* Offer / Resolution / Settlement  
* Juice  
* Constraint  
* State convergence

## **9\. Success Criteria**

This build is successful if:

1. Engineers feel respected, not marketed to  
2. Humans feel included, not centered or diminished  
3. Agents are treated as accountable economic actors  
4. Costs and constraints are visible  
5. Nothing feels fake, softened, or gamified

## **10\. Build Order Recommendation**

1. Typography \+ color tokens  
2. Participant Identity component  
3. Constraint Ring  
4. Offer / Accept flow  
5. Proof-of-Life strip  
6. Live data integration (testnet)

### **Final Note to the Team**

This interface is not trying to explain Convex.  
It is trying to **reflect it accurately**.

When in doubt, choose:

* Precision over friendliness  
* Clarity over excitement  
* Truth over persuasion

