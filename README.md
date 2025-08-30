# 🎯 Samyak - Interactive Learning Platform

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.17.2-47A248?logo=mongodb)](https://mongodb.com/)
[![Express](https://img.shields.io/badge/Express-5.1.0-000000?logo=express)](https://expressjs.com/)
[![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF?logo=vite)](https://vitejs.dev/)

> **Samyak** = Right/Correct in Sanskrit - An interactive, gamified learning platform inspired by Duolingo and Candy Crush

## 🌟 Features

- **🎮 Gamified Learning**: Level-based progression system with engaging animations
- **🏆 Achievement System**: Badge system with bronze, silver, gold, and diamond levels
- **📚 7 Learning Modules**: Comprehensive study materials with interactive quizzes
- **🎓 Certification**: Final exam with certificate upon completion
- **👤 User Profiles**: Progress tracking, badges, and personal achievements
- **🚀 Modern Tech Stack**: React 19, Node.js, MongoDB, and beautiful animations

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- MongoDB installed and running
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd samyak
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Environment Setup**
   ```bash
   # In server directory, create .env file
   cp .env.example .env
   # Edit .env with your MongoDB connection string and JWT secret
   ```

5. **Start Development Servers**
   ```bash
   # Terminal 1 - Start Backend
   cd server
   npm run dev
   
   # Terminal 2 - Start Frontend
   cd frontend
   npm run dev
   ```

6. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## 🏗️ Project Structure

```
samyak/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── auth/           # Authentication context
│   │   └── api.js          # API integration
│   ├── public/             # Static assets
│   └── package.json
├── server/                  # Node.js backend
│   ├── src/
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API endpoints
│   │   ├── middleware/     # Authentication middleware
│   │   └── config/         # Database configuration
│   └── package.json
└── README.md
```

## 🎯 User Workflow

1. **🔐 Authentication**: User logs in with smooth animation transition
2. **🏠 Homepage**: Duolingo-style level progression with profile and study material access
3. **👤 Profile**: View badges, certificates, and personal achievements
4. **📖 Study Material**: 7 comprehensive modules with interactive content
5. **🎓 Final Exam**: 7-question certification test covering all modules
6. **🏆 Achievement**: Earn points, badges, and certificates based on performance

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - Modern React with latest features
- **Vite 7.1.2** - Fast build tool and dev server
- **React Router DOM 7.8.1** - Client-side routing
- **Framer Motion 12.23.12** - Smooth animations and transitions
- **Axios 1.11.0** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express 5.1.0** - Web application framework
- **MongoDB 8.17.2** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing

## 📱 Available Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend
```bash
npm run dev      # Start with nodemon (development)
npm start        # Start production server
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the server directory:

```env
MONGODB_URI=mongodb://localhost:27017/samyak
JWT_SECRET=your_jwt_secret_here
PORT=5000
NODE_ENV=development
```

### Database Setup
The application uses MongoDB. Make sure to:
1. Install MongoDB locally or use MongoDB Atlas
2. Update the connection string in your `.env` file
3. Run the seed script if needed: `node src/seed.js`

## 🎨 UI/UX Features

- **Bird Animation**: Engaging flying bird animations throughout the platform
- **Particle Effects**: Interactive background particles for enhanced visual appeal
- **Level Progression**: Visual level nodes with smooth transitions
- **Responsive Design**: Mobile-first approach with modern UI components
- **Smooth Transitions**: Framer Motion powered animations

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy the dist folder
```

### Backend (Railway/Heroku)
```bash
cd server
npm start
# Set environment variables in your hosting platform
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Inspired by Duolingo's gamified learning approach
- Candy Crush style level progression
- Modern web development best practices
- Beautiful animations and user experience

---

**Made with ❤️ for interactive learning**

*Samyak - Where learning meets fun and achievement!*
