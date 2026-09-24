# Ember House Restaurant

A modern, responsive restaurant web application built as a Software Engineer Intern final project.

The application focuses on the complete customer experience: browsing the menu, viewing food details, booking tables, placing online orders, managing reservations and orders through a profile, and handling real-world booking edge cases.

## Live Demo

**Live Application:**  
https://ember-house-restaurant.onrender.com/

---

## Overview

Ember House is a frontend-focused restaurant application built with Next.js.

The project was intentionally designed without a custom backend, following the assignment requirement to use mock/local data rather than spending the project time on backend infrastructure.

The application includes:

- Restaurant menu and food catalogue
- Food categories and detailed item views
- Table reservation flow
- Online ordering flow
- Shopping cart
- User profile
- Reservation history
- Order history
- Responsive mobile experience
- Empty and error states
- Booking validation and edge cases
- Waitlist functionality as the additional feature

Application state such as the cart, reservations, orders, waitlist entries, and demo user session is persisted locally using `localStorage`.

---

## Features

### Menu & Catalogue

- Browse restaurant dishes
- Browse dishes by category
- Search for food
- View food details
- Display prices and images
- Responsive food cards and layouts
- Empty state when a search produces no results

### Table Booking

Customers can:

1. Select a date
2. Select a time
3. Select a party size
4. Check table availability
5. Confirm a reservation
6. View their reservation afterward

The booking flow also handles important edge cases:

- Past dates
- Past times
- Fully booked time slots
- Party sizes beyond the online booking limit
- No available tables

### Waitlist

The additional feature of the application is a **waitlist**.

When a requested slot has no available tables, or a party is too large for the available tables, customers can join the waitlist instead of reaching a dead end.

Waitlist information is stored locally for the demo.

The waitlist was chosen because table availability is one of the explicit awkward cases highlighted in the assignment. It provides the customer with an actionable next step when normal booking is unavailable.

### Online Ordering

Customers can:

- Browse the menu
- View item details
- Add items to the cart
- Change quantities
- Remove items
- Review the order
- Place an order
- View the order afterward from their profile

The ordering experience is frontend-only, as required by the assignment.

### User Profile

The profile provides a central place to view:

- User information
- Current and previous reservations
- Order history
- Order details
- Waitlist information where applicable

Authentication is kept lightweight because the assignment does not require a backend authentication system.

### Responsive Design

The application is designed for:

- Desktop
- Tablet
- Mobile

The mobile experience is treated as a first-class layout rather than simply shrinking the desktop interface.

---

## Additional Feature

### Waitlist

The one additional feature added beyond the assignment requirements is a **restaurant waitlist**.

If a customer cannot book a table because:

- The selected time is fully booked, or
- Their party is larger than the available online table capacity,

they can join the waitlist using the same booking context.

The waitlist was chosen because it directly addresses one of the assignment's highlighted awkward cases:

> What happens when there are no tables left for that time?

Instead of simply displaying an error, the application gives the customer a meaningful next action.

The feature remains within the frontend/demo scope and does not attempt to implement real restaurant-side notifications or table allocation.

More details about this decision are available in [`DECISIONS.md`](./DECISIONS.md).

---

## Tech Stack

### Core

- **Next.js 14**
- **React 18**
- **TypeScript**

### Styling

- **Tailwind CSS 4**
- Responsive CSS utilities
- Custom design tokens and animations

### UI & Animation

- **Framer Motion**
- **Lucide React**

### Authentication

- **Firebase Authentication**

Firebase is used for the demo identity/authentication layer. The restaurant application itself does not require a custom backend.

### State Management

- React Context API
- Custom `useLocalStorage` hook
- Browser `localStorage`

### Data

Mock/local data is used for:

- Menu items
- Categories
- Tables
- Reservations
- Orders
- Waitlist entries


---

## Project Structure

The project is organized so that another developer can understand where new functionality belongs.

```text
.
├── app/
│   ├── ...                 # Application routes/screens
│   └── ...
│
├── components/
│   ├── menu/               # Menu-related components
│   ├── booking/            # Booking-related components
│   ├── orders/             # Ordering-related components
│   ├── profile/            # Profile-related components
│   ├── waitlist/           # Waitlist-related components
│   └── ui/                 # Shared UI primitives
│
├── context/
│   ├── ...                 # Cross-route application state
│   └── ...
│
├── lib/
│   ├── data/               # Mock data and availability logic
│   ├── types.ts            # Shared TypeScript types
│   └── utils.ts            # Shared utility functions
│
├── public/
│   └── ...                 # Static assets
│
├── app/globals.css         # Global styles and Tailwind theme
├── postcss.config.mjs      # Tailwind/PostCSS configuration
├── package.json
├── README.md
└── DECISIONS.md
