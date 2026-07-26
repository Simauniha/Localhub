# Software Requirements Specification (SRS)
## Local Services & Deals App

### 1. Introduction

**1.1 Purpose**
This document outlines the functional and technical requirements for a mobile/web application that helps users discover and access local services, deals, and bookings in one place.

**1.2 Scope**
The app connects users to local restaurants, coaching/tutoring centers, entertainment events, and transport/delivery options through a single interface, with deal redemption and booking referral features.

**1.3 Intended Audience**
Development team, collaborators, and contributors working on frontend, backend, or design components of the project.

---

### 2. Overall Description

**2.1 Product Perspective**
A cross-platform mobile app (iOS/Android) with a companion web dashboard for partner businesses to manage their listings.

**2.2 User Classes**
- **End Users** — browse deals, redeem offers, book services
- **Partner Businesses** — restaurants, coaching centers, event venues that list offers
- **Admin** — manages listings, moderates content, reviews partner applications

---

### 3. Functional Requirements

**3.1 User Authentication**
- Sign up / log in via email, phone, or social login
- Basic profile management

**3.2 Discovery & Listings**
- Browse categorized listings: Food & Dining, Coaching/Education, Entertainment, Transport
- Search and filter by category, location, price range
- View listing details (description, images, hours, ratings)

**3.3 Deals & Redemption**
- View active deals/discounts per listing
- Redeem a deal via in-app QR code shown to the merchant
- Track redemption history

**3.4 Booking/Referral**
- Deep-link to third-party services (transport, food delivery) for bookings
- Track referral clicks for reporting purposes

**3.5 Events & Ticketing**
- Browse upcoming events (entertainment, shows)
- Claim available free/discounted tickets (limited allocation per event)
- Simple confirmation + QR ticket for entry

**3.6 Partner Portal (Web)**
- Partner registration and listing management
- Upload/edit deals, view redemption analytics
- Basic messaging/notification to admin

**3.7 Notifications**
- Push notifications for new deals near the user
- Reminders for claimed tickets/bookings

**3.8 Admin Panel**
- Approve/reject new partner listings
- Moderate user-generated content (reviews, comments)
- View basic usage analytics

---

### 4. Non-Functional Requirements

- **Performance:** App should load listings within 2 seconds under normal network conditions
- **Scalability:** Backend should support horizontal scaling as user base grows
- **Security:** User data encrypted in transit (HTTPS) and at rest; secure authentication
- **Availability:** Target 99% uptime for core services
- **Usability:** Simple, intuitive UI suitable for first-time users unfamiliar with the local area

---

### 5. Technical Stack (Proposed)

| Layer | Technology |
|---|---|
| Frontend (mobile) | React Native |
| Frontend (web) | React |
| Backend | Java Spring Boot (REST APIs) |
| Database | PostgreSQL |
| Caching | Redis |
| Authentication | Firebase Auth / Auth0 |
| Hosting | AWS or GCP |
| Maps/Location | Google Maps API |
| Notifications | Firebase Cloud Messaging |

---

### 6. Assumptions & Constraints

- Initial launch will focus on a single city/region before expanding
- Third-party bookings (transport, delivery) route out to existing partner apps rather than being processed natively
- Payment processing, if added later, will use a licensed third-party gateway

---

### 7. Future Scope (not in MVP)

- In-app payments for bookings
- Loyalty/rewards program
- Multi-city expansion
- Advanced partner analytics dashboard

---

*This document covers general functional scope for development planning purposes.*
