# Electify India

**Electify India** is a government-neutral, educational civic-tech platform designed to help Indian citizens understand **One Nation One Election (ONOE)** and identify misinformation. Built with accessibility and neutrality at its core, the platform provides clear, factual information in simple language.

---

## 🌐 Live Demo

👉 [Electify India – Live Website](https://electify-india.vercel.app/)

---

## ✨ Features

• **ONOE Learning Modules**  
  Progressive, structured content explaining One Nation One Election in simple, accessible language.

• **Claim vs Fact Checker**  
  Identify and understand misinformation about ONOE with neutral, source-based fact-checking.

• **Blind Reading Mode** 🕶️  
  Unique feature that masks party and leader names to help you focus on policy content without bias.

• **Multi-language Support**  
  Available in **English, हिंदी, اردو** with seamless language switching.

• **Audio Explanations**  
  Listen to content with built-in audio support for enhanced accessibility.

• **Guest Mode**  
  Explore content without login. Sign up to save progress and bookmarks.

• **Progress Tracking**  
  Track your learning journey through ONOE modules and save favorite content.

• **Responsive UI**  
  Optimized design for desktop, tablet, and mobile screens.

• **Dark/Light Theme Toggle**  
  Accessible design with easy theme switching.

• **Source Transparency**  
  All information backed by official documents, constitutional texts, and credible sources.

---

## 🎯 Platform Values

• **Neutrality**: Non-partisan, government-neutral approach  
• **Accessibility**: Multi-language, audio support, readable design  
• **Transparency**: Clear source citations and fact-based content  
• **Education**: Focus on understanding, not advocacy  

---

## 🛠️ Tech Stack

• **Frontend:** Next.js 14 (React Framework)  
• **Language:** TypeScript  
• **Styling:** Tailwind CSS  
• **Authentication:** NextAuth.js (JWT-based)  
• **Animations:** Framer Motion  
• **Internationalization:** i18next  
• **Deployment:** Vercel  
• **State Management:** React Context API  

---

## ⚡ Getting Started  

### Prerequisites  
- Node.js (v22.x or later)  
- npm or yarn  

### Installation  

```bash
# Clone the repository
git clone https://github.com/your-username/electify-india.git
cd electify-india

# Install dependencies
npm install
# or
yarn install

# Run development server
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

---

## 📂 Project Structure

```bash
electify-india/
├── public/                     # Static assets (icons, images, logos, favicons)
│   ├── favicon.ico
│   ├── images/
│   └── icons/
│
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── ui/                 # Buttons, Toggles, Inputs, Modals
│   │   ├── layout/             # Navbar, Footer, Header
│   │   └── civic/              # ONOE-specific components
│   │
│   ├── app/                    # Next.js app router pages
│   │   ├── page.tsx            # Landing page
│   │   ├── learn/              # ONOE learning modules
│   │   ├── fact-check/         # Claim vs Fact section
│   │   ├── resources/          # Educational resources
│   │   ├── dashboard/          # User progress tracking
│   │   └── profile/            # User preferences
│   │
│   ├── styles/                 # Global styles and Tailwind config
│   │   └── globals.css
│   │
│   ├── context/                # Context providers (Auth, Theme, Language)
│   │   ├── AuthContext.tsx
│   │   ├── ThemeContext.tsx
│   │   └── LanguageContext.tsx
│   │
│   ├── lib/                    # Utilities and configurations
│   │   ├── blindReadingUtils.ts
│   │   └── i18n.ts
│   │
│   └── hooks/                  # Custom React hooks
│       └── useBlindReading.ts
│
├── .env.local                  # Environment variables
├── package.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

---

## 🕶️ Blind Reading Mode

A unique feature that helps reduce bias by masking party and leader names in content. When enabled, names are replaced with neutral placeholders (Party A, Party B, Leader A, etc.), allowing you to focus on the substance of claims and policies rather than your pre-existing opinions about specific parties or individuals.

**How to use:**
1. Navigate to any content page (especially Fact Check section)
2. Toggle "Blind Reading Mode" on
3. Read the content with masked names
4. Toggle off to reveal original text

---

## 🌍 Multilingual Support

The application supports English, Hindi, and Urdu languages. Users can switch between languages from the header navigation or profile settings.

---

## ♿ Accessibility Features

- High contrast visuals
- Large clickable areas
- Screen reader support
- Keyboard navigation
- WCAG 2.1 compliant
- Audio explanations for content
- Multi-language support

---

## 🔐 Guest Mode

Explore all learning content without creating an account. When you're ready to save your progress, bookmarks, or preferences, you'll be prompted to sign up or log in.

---

## 📱 Progressive Web App (PWA)

Electify India is built as a Progressive Web App with service workers to enable offline functionality. Users can access core features even without an internet connection.

---

## 🤝 Contributing

This is an educational civic-tech initiative. Contributions are welcome! Please ensure all content remains:
- Factual and source-based
- Neutral and non-partisan
- Accessible and clear
- Free from advocacy or bias

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- Election Commission of India for official data and resources
- Constitutional experts and civic educators who provided domain knowledge
- Open-source community for the excellent tools and libraries

---

## 📞 Contact

For questions, feedback, or content corrections, please open an issue on GitHub or contact the maintainers.

---

**Electify India** - Understanding democracy, one citizen at a time.
