# 🚀 NextGen-Hire

> A modern, AI-ready recruitment and live interview platform bridging the gap between companies and senior developers to streamline technical hiring, live video interviews, transparent assessments, and evaluations.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-API-lightgrey?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen?logo=mongodb)
![WebRTC](https://img.shields.io/badge/WebRTC-Video%20Calling-orange)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 📖 Overview

**NextGen-Hire** is a full-stack platform designed to revolutionize the fresher and software developer recruitment process.

Instead of companies spending hundreds of engineering hours conducting redundant technical screenings, NextGen-Hire connects companies with seasoned **Senior Developers**. These experienced interviewers evaluate candidates through live interviews, domain assessments, and structured 10-point scoring.

The platform provides:
- **Direct Candidate Sourcing & Registration**: Companies upload requirements or import bulk candidate data via Excel sheets.
- **Vetted Senior Developer Network**: Senior developers register their domains (Web, Software, DevOps, Blockchain) and availability.
- **Built-in Live Video Interview Rooms**: Integrated 1-on-1 WebRTC video calling powered by ZegoUIKit with shareable meeting links.
- **Structured Evaluations & CSV Export**: Detailed rating breakdown (Technical review, Domain knowledge, Expert assessment) and one-click data export.

---

## ✨ Key Features

### 👨‍💼 Company Portal
- Company Profile & Credentials Setup
- Create Custom Job Requirements & Skill Specifications
- Upload Candidate Profiles & Bulk Excel (`.xlsx`) Import
- Browse Domain Interviewers & Candidate Evaluation Reports
- Download Candidate Evaluations in CSV format

### 👨‍💻 Senior Developer Portal
- Register Profile with Domain Expertise & Years of Experience
- Browse Active Candidate Pools by Domain (Web, Software, DevOps, Blockchain)
- Host Live 1-on-1 Video Interview Rooms
- Submit Structured Ratings (10-star system) and In-depth Recommendations
- Review Historical Domain Evaluations

### 🎥 Live Video Interview System
- Built-in WebRTC video conferencing with camera/mic controls
- Unique room generation (`/room/:id`)
- Shareable meeting links with instant copy-to-clipboard functionality
- Streamlined "End Meeting & Review" transition workflow

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, React Router v6, FontAwesome Icons, XLSX (Excel Parser) |
| **Video Calling** | WebRTC / ZegoUIKit Prebuilt |
| **Backend** | Node.js, Express.js, CORS |
| **Database** | MongoDB, Mongoose ODM |
| **Environment** | Node.js Native Env / Dotenv |

---

## 📁 Project Structure

```
next-gen-hire/
├── client/                     # Frontend React Application
│   ├── public/                 # Static assets & public images
│   ├── src/
│   │   ├── components/         # Portal pages & domain filters
│   │   │   ├── Domain/         # Active candidate domain filters
│   │   │   ├── PastDomain/     # Completed evaluation archives
│   │   │   └── videocallcomponents/ # Live video room & meeting host
│   │   ├── config.js           # Centralized dynamic API configuration
│   │   ├── App.js              # Application routing
│   │   └── index.js
│   ├── package.json
│   └── .env.example
├── db/                         # MongoDB Mongoose Models & Database Config
│   ├── AddCompanyCandidate.js
│   ├── CandidateReview.js
│   ├── CandidteInfodb.js
│   ├── CompanyInfo.js
│   ├── Config.js               # Database connection handler
│   ├── JobSpecification.js
│   └── User.js
├── images/                     # Project banners & screenshots
├── index.js                    # Backend REST API Server
├── package.json                # Root backend dependencies & scripts
├── .env.example                # Backend environment template
└── README.md
```

---

## ⚙️ Local Development Setup

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Git](https://git-scm.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) locally OR a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster URL.

### 2. Clone the Repository
```bash
git clone https://github.com/moizzhamad/next-gen-hire.git
cd next-gen-hire
```

### 3. Backend Setup
1. Open the project root in your terminal:
   ```bash
   npm install
   ```
2. Configure `.env` file:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` if you are using a cloud MongoDB URL:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/NextGen-Hire
   ```
3. Start the backend server:
   ```bash
   npm start
   ```
   *The backend will run on `http://localhost:5000`.*

### 4. Frontend Setup
1. In a new terminal window, navigate to the `client` directory:
   ```bash
   cd client
   npm install
   ```
2. Configure frontend environment (optional for local dev):
   ```bash
   cp .env.example .env
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
   *The frontend will launch in your browser at `http://localhost:3000`.*

---

## 🚀 Deployment Guide

### Step 1: Database (MongoDB Atlas)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Deploy a free **M0 Sandbox** cluster.
3. In **Database Access**, create a database user and password.
4. In **Network Access**, add IP address `0.0.0.0/0` (allow access from anywhere).
5. Click **Connect** > **Drivers** to copy your connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/NextGenHire?retryWrites=true&w=majority
   ```

### Step 2: Backend Deployment (Render)
1. Push your code to your GitHub repository (`github.com/moizzhamad/next-gen-hire`).
2. Log into [Render.com](https://render.com) and click **New +** > **Web Service**.
3. Connect your `next-gen-hire` GitHub repository.
4. Set the following settings:
   - **Root Directory**: leave blank (root)
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. In **Environment Variables**, add:
   - `PORT`: `5000`
   - `MONGO_URI`: *Your MongoDB Atlas connection string*
6. Click **Create Web Service**. Note your live backend URL (e.g. `https://next-gen-hire-api.onrender.com`).

### Step 3: Frontend Deployment (Vercel)
1. Log into [Vercel](https://vercel.com) and click **Add New...** > **Project**.
2. Import your `next-gen-hire` GitHub repository.
3. In the configuration settings:
   - **Root Directory**: Select `client`
   - **Framework Preset**: Create React App
4. Under **Environment Variables**, add:
   - `REACT_APP_API_URL`: *Your Render backend URL* (e.g. `https://next-gen-hire-api.onrender.com`)
5. Click **Deploy**. Vercel will build and give you a live production URL!

---

## 👨‍💻 Credits & Attribution

- **Original Author**: [Mohammad Shiyabuddeen](https://github.com/mohdshiyab/next-gen-hire)
- **Maintainer / Fork**: [Moiz Hamad](https://github.com/moizzhamad) (moizzhamadh@gmail.com)

---

## 📄 License

This project retains its original ISC license terms. See LICENSE for details.
