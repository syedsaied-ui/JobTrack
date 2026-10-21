# 💼 JobTrack Flow

A modern job board and application tracker built with **React.js**, **Vite**, and **Tailwind CSS**. Browse job opportunities, submit applications, and manage your application progress through a clean, responsive interface. Powered by a **Cloudflare Workers API** and **Cloudflare D1 database** for persistent data storage.

🌐 **[Live Demo](https://jobtrack-flow.vercel.app)**

## ✨ Features

- Browse job listings and view detailed job information
- Search jobs and filter by category
- Submit job applications through a dedicated form
- View and manage submitted applications
- Update application statuses: Applied, Interview, Offer, Rejected, and Reviewed
- Delete applications with confirmation
- Store job listings and applications using Cloudflare D1
- Guest-based application tracking without requiring registration
- Loading states and error handling
- Responsive design for different screen sizes
- Client-side routing with support for direct URL access and page refreshes

## 🛠️ Technologies Used

**Frontend:** React, JavaScript, Vite, Tailwind CSS, React Router, Axios, Lucide React

**Backend & Database:** Cloudflare Workers, Cloudflare D1

**Tools & Deployment:** Git, GitHub, Vercel

## 📂 Project Structure

```text
JobTrack/
├── public/
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── services/
│   ├── index.css
│   ├── Layout.jsx
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── seed-jobs.sql
├── vercel.json
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js and npm
- A deployed Cloudflare Worker connected to a Cloudflare D1 database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/syedsaied-ui/JobTrack.git
   ```

2. Navigate to the project directory:

   ```bash
   cd JobTrack
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env.local` file in the project root and configure your backend URL:

   ```env
   VITE_API_URL=https://your-worker-url.workers.dev
   ```

   Replace the example URL with your deployed Cloudflare Worker URL.

5. Start the development server:

   ```bash
   npm run dev
   ```

Open the local URL displayed in your terminal to use the application.

### Backend Configuration

JobTrack Flow requires a backend API deployed using Cloudflare Workers and a Cloudflare D1 database.

- **Using the live backend:** You can configure the frontend to use an existing Worker URL. Requests will use that backend and its database.
- **Running your own instance:** Create your own Cloudflare D1 database, configure the `DB` binding in your Worker, deploy the backend code, and seed the jobs table using `seed-jobs.sql`. Then set `VITE_API_URL` to your own Worker URL.

The repository's frontend does not require a Cloudflare account API key. Never expose private account credentials or secret tokens in frontend code or public files.

## 📸 Preview

<img width="1920" height="882" alt="job" src="https://github.com/user-attachments/assets/7836850b-c0be-407b-857a-fb75dbbd22a5" />
<img width="1920" height="873" alt="job2" src="https://github.com/user-attachments/assets/705f3bc8-70ae-4ebd-b16e-e8b14397aeb5" />
<img width="1897" height="865" alt="job3" src="https://github.com/user-attachments/assets/939f7e97-fcdc-42bc-a436-c2b1961f610c" />
<img width="1920" height="875" alt="job4" src="https://github.com/user-attachments/assets/0c4122d3-b0f2-4fd9-8793-d02b97ee2ebb" />
<img width="1916" height="877" alt="Screenshot 2026-10-22 044435" src="https://github.com/user-attachments/assets/25ba14ea-dfdb-4ab2-9c59-58b5940c410b" />

## 👨‍💻 Author

**Syed Muhammad Saied**

- GitHub: [syedsaied-ui](https://github.com/syedsaied-ui)
- LinkedIn: [Syed Muhammad Saied](https://linkedin.com/in/syed-muhammad-saied-8145a0423)

---

⭐ If you find this project interesting, consider giving the repository a star!
