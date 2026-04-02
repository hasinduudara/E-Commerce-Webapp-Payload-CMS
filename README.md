# 🛒 E-Store

> A modern, high-performance full-stack e-commerce application built with **Next.js**, **Payload CMS**, and **PostgreSQL** — designed for a seamless shopping experience with a powerful headless CMS for content management.

🔴 **Live Demo:** [https://senturaestore.duckdns.org/](https://senturaestore.duckdns.org/)

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🖥️ **Modern Storefront** | Fully responsive, blazing-fast frontend built with Next.js App Router and Tailwind CSS |
| 🧩 **Headless CMS** | Integrated Payload CMS (v3) for seamless product, category, and order management |
| 🔐 **User Authentication** | Secure user registration, login, and password reset functionality (integrated with Nodemailer) |
| 🛒 **Dynamic Cart & Checkout** | Context-based cart management for a smooth user experience |
| 🖼️ **Image Management** | Integrated image uploading and handling via ImgBB and Payload media collections |
| 🔒 **Secure & Scalable** | Deployed on an Azure Virtual Machine with Nginx reverse proxy and SSL encryption |

---

## 🛠️ Tech Stack

### Frontend
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)

- **Next.js** — React Framework (App Router)
- **Tailwind CSS** — Utility-first styling
- **TypeScript** — Type-safe development

### Backend & Database
![Payload CMS](https://img.shields.io/badge/Payload_CMS-000000?style=flat&logo=payloadcms&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)

- **Payload CMS** — Headless CMS (v3)
- **PostgreSQL** — Database hosted on Azure
- **Nodemailer** — Email service for password resets

### DevOps & Deployment
![Azure](https://img.shields.io/badge/Microsoft_Azure-0078D4?style=flat&logo=microsoftazure&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=flat&logo=nginx&logoColor=white)
![PM2](https://img.shields.io/badge/PM2-2B037A?style=flat&logo=pm2&logoColor=white)

- **Microsoft Azure** — Virtual Machine (Ubuntu)
- **PM2** — Process manager for daemonizing the app
- **Nginx** — Reverse proxy
- **Let's Encrypt / Certbot** — HTTPS/SSL certificate
- **DuckDNS** — Domain

---

## 🚀 Deployment Architecture

```
Internet
   │
   ▼
[DuckDNS Domain]
   │
   ▼
[Azure Ubuntu VM]
   │
   ├── Nginx (Port 80 / 443)  ◄── Let's Encrypt SSL
   │       │
   │       ▼ Reverse Proxy
   │   Node.js App (Port 3000)
   │       │
   │       ├── Next.js Frontend
   │       └── Payload CMS Admin
   │
   └── PM2 (Process Manager)

[Azure PostgreSQL] ◄── Database connection
```

---

## 📂 Project Structure

```
├── src/
│   ├── app/
│   │   ├── (frontend)/       # Next.js UI routes (cart, checkout, products, etc.)
│   │   └── (payload)/        # Payload CMS Admin Panel routes
│   ├── collections/          # Payload DB Collections (Users, Products, Orders, etc.)
│   ├── components/           # Reusable React components (Header, Footer, Catalog)
│   ├── context/              # React Context (Auth, Cart)
│   └── payload.config.ts     # Payload CMS core configuration
├── public/                   # Static assets
└── next.config.ts            # Next.js configuration & image domains
```

---

## 💻 Local Development

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/hasinduudara/E-Commerce-Webapp-Payload-CMS.git
cd E-Commerce-Webapp-Payload-CMS
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgresql://<user>:<password>@<host>:5432/<dbname>
PAYLOAD_SECRET=your_secret_key
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### 4. Run the Development Server

```bash
npm run dev
```

### 5. Access the Application

| URL | Description |
|---|---|
| `http://localhost:3000` | Frontend storefront |
| `http://localhost:3000/admin` | Payload CMS Admin Panel |

---

## 👨‍💻 Author

**M. Hasindu Udara**

🧑‍💻 Trainee Associate Software Engineer at Sentura Technologies!

[![Email](https://img.shields.io/badge/Email-hasiduudara%40gmail.com-D14836?style=flat&logo=gmail&logoColor=white)](mailto:hasiduudara@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-hasindu--udara-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/hasindu-udara)
[![GitHub](https://img.shields.io/badge/GitHub-hasinduudara-181717?style=flat&logo=github&logoColor=white)](https://github.com/hasinduudara)
[![Portfolio](https://img.shields.io/badge/Portfolio-hasinduudara.me-4A90D9?style=flat&logo=google-chrome&logoColor=white)](https://www.hasinduudara.me)

---

> ⭐ If you find this project useful, please consider giving it a star on [GitHub](https://github.com/hasinduudara/E-Commerce-Webapp-Payload-CMS)!
