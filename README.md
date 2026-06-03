<div align="center">
  <img src="https://img.icons8.com/fluency/96/phone.png" alt="PhoneMarket Logo" width="80"/>
  <h1>📱 PhoneMarket</h1>
  <p><strong>A modern e-commerce SPA for smartphones built with React + TypeScript</strong></p>

  <p>
    <a href="https://ArmFreelancer.github.io/PhoneMarket/">
      <img src="https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=github&logoColor=white" alt="Live Demo"/>
    </a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React 19"/>
    <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white" alt="TypeScript"/>
    <img src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white" alt="Vite 6"/>
    <img src="https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap&logoColor=white" alt="Bootstrap 5"/>
    <img src="https://img.shields.io/badge/license-MIT-green" alt="MIT License"/>
  </p>
</div>

## ✨ Features

- **Full-featured catalog** — 22 smartphones from 9 brands with brand filtering
- **Cart management** — add, remove, quantity controls, persistent cart (`localStorage`)
- **User authentication** — register, sign in, sign out with session persistence
- **Order system** — checkout flow with order history per user
- **Currency toggle** — switch between USD and RUB
- **Internationalization** — full Russian and English UI with instant switching
- **Dark theme** — clean dark + blue design with smooth animations
- **Responsive** — works on mobile, tablet, and desktop
- **Toast notifications** — real-time feedback for all actions

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+

### Installation

```bash
# Clone the repository
git clone https://github.com/ArmFreelancer/PhoneMarket.git
cd PhoneMarket

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
```

Output is in the `dist/` directory. Serve it with any static file server:

```bash
npx serve dist
```

## 🏗️ Project Structure

```
phonemarket/
├── public/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── PhoneCard.tsx
│   │   └── ToastContainer.tsx
│   ├── context/
│   │   └── AppContext.tsx  # Global state (React Context)
│   ├── pages/             # Route pages
│   │   ├── Home.tsx
│   │   ├── Catalog.tsx
│   │   ├── CartPage.tsx
│   │   ├── Login.tsx
│   │   └── Account.tsx
│   ├── utils/
│   │   ├── auth.ts        # Auth logic (localStorage)
│   │   ├── cart.ts        # Cart logic (localStorage)
│   │   └── storage.ts     # Generic localStorage wrapper
│   ├── App.tsx            # Root component with router
│   ├── data.ts            # Phones data, i18n dict, currency utils
│   ├── index.css          # Global styles
│   ├── main.tsx           # Entry point
│   └── types.ts           # TypeScript interfaces
├── index.html
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠️ Tech Stack

| Tech | Purpose |
|------|---------|
| [React 19](https://react.dev/) | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe development |
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| [React Router](https://reactrouter.com/) | Client-side routing |
| [Bootstrap 5](https://getbootstrap.com/) | CSS framework & components |
| [Bootstrap Icons](https://icons.getbootstrap.com/) | Icon library |

## 📱 Phone Data

22 smartphones sourced from [GSMArena](https://www.gsmarena.com/):

| Brand | Models |
|-------|--------|
| Apple | iPhone 16 Pro Max, 16 Pro, 16, 16 Plus, 15 Pro Max, 15 Pro |
| Samsung | Galaxy S25 Ultra, S25+, S25, S24, Z Fold6, A55, A35 |
| Xiaomi | 14 Pro, 14, Redmi Note 13 Pro |
| Google | Pixel 9 Pro |
| OnePlus | 13 |
| Nothing | Phone (3) |
| Oppo | Find X8 |
| Honor | 200 |
| Realme | GT 7 |

## 🔑 Key Features

### Cart & Checkout
- Persistent cart stored in `localStorage`
- Quantity increment/decrement per item
- Real-time total calculation
- Checkout creates an order linked to your account

### Authentication
- Simple registration (name, email, password)
- Session stored in `localStorage`
- Order history tied to user account

### Internationalization
- Instant language switch (EN / RU)
- Currency toggle (USD / RUB)
- All UI labels, buttons, and messages translated

## 📄 License

This project is licensed under the MIT License.
