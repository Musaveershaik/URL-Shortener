# 🚀 URL Shortener

A modern, feature-rich URL shortener built with Node.js, Express, and MongoDB. Create short, memorable links with real-time visit tracking and analytics.

## URL Shortener Demo
![image](https://github.com/user-attachments/assets/0ef1ae57-961b-4278-b1a4-68087d89c3fd)


## ✨ Features

- **🔗 URL Shortening**: Convert long URLs into short, shareable links
- **📊 Visit Tracking**: Real-time tracking of link visits
- **📱 Responsive UI**: Beautiful, mobile-friendly interface
- **⚡ Real-time Updates**: Live visit count updates
- **📋 Copy to Clipboard**: One-click copying of shortened URLs
- **📈 Statistics Table**: View all shortened URLs and their analytics
- **🔄 Auto Refresh**: Automatic updates of visit counts
- **💾 Persistent Storage**: MongoDB backend for reliable data storage

## 🛠️ Tech Stack

- **Frontend**: 
  - EJS (Embedded JavaScript templates)
  - Bootstrap 5
  - Vanilla JavaScript

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose

- **Tools & Libraries**:
  - crypto (for generating short IDs)
  - dotenv (environment variables)

## 🚀 Getting Started

### Prerequisites

1. **Node.js & npm**
   ```bash
   # Check if installed
   node --version
   npm --version

   # If not installed, download from
   # https://nodejs.org/en/download/
   ```

2. **MongoDB**
   ```bash
   # Check if installed
   mongod --version

   # If not installed, download from
   # https://www.mongodb.com/try/download/community
   ```

3. **Git**
   ```bash
   # Check if installed
   git --version

   # If not installed, download from
   # https://git-scm.com/downloads
   ```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Musaveershaik/URL-Shortener.git
   cd URL-Shortener
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   # Create .env file in root directory
   touch .env

   # Add these variables to .env
   PORT=3000
   MONGODB_URI=mongodb://127.0.0.1:27017/urlShortener
   ```

4. **Start MongoDB**
   ```bash
   # Start MongoDB service
   mongod

   # On Windows, you might need to start it as a service
   net start MongoDB
   ```

5. **Run the application**
   ```bash
   # Development mode with nodemon
   npm run dev

   # OR Production mode
   npm start
   ```

6. **Access the application**
   - Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Usage

1. **Shorten a URL**
   - Enter a long URL in the input field
   - Click "Shorten URL"
   - Copy the generated short URL

2. **View Statistics**
   - Scroll down to see the URL statistics table
   - View visit counts and creation dates
   - Copy or visit shortened URLs directly

3. **Track Visits**
   - Visit counts update automatically
   - Real-time tracking of link usage
   - Statistics table refreshes every 30 seconds

### Troubleshooting

1. **MongoDB Connection Issues**
   ```bash
   # Check if MongoDB is running
   ps aux | grep mongod

   # Restart MongoDB if needed
   sudo service mongod restart
   ```

2. **Port Already in Use**
   ```bash
   # Kill process using port 3000
   lsof -i :3000
   kill -9 <PID>
   ```

3. **Node Module Issues**
   ```bash
   # Clear npm cache and reinstall
   npm cache clean --force
   rm -rf node_modules
   npm install
   ```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

Shaik Musaveer - [GitHub Profile](https://github.com/Musaveershaik)

Project Link: [https://github.com/Musaveershaik/URL-Shortener](https://github.com/Musaveershaik/URL-Shortener)

---

⭐️ If you found this project helpful, please give it a star!
