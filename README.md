# 🎬 AI Ads Generator

An AI-powered video advertisement generation platform that creates professional video ads using artificial intelligence. Users can input scripts, upload media, and generate high-quality video advertisements with AI-generated voice-overs using virtual creators.

## 📋 Project Overview

AI Ads Generator is a Next.js-based web application that leverages AI technology to automate video ad creation. The platform integrates with Caption.ai's API to generate video ads with AI avatars/creators, supporting both 4K and Full HD resolutions. Users can upload custom media files, write ad scripts, and generate professional video advertisements instantly.

## ✨ Key Features

- **🤖 AI-Powered Video Generation**: Generate video ads with AI avatars delivering your script
- **📝 Custom Script Input**: Write or upload ad scripts (up to 800 characters)
- **🎭 Multiple AI Creators**: Choose from various AI avatars to present your ads
- **📤 Media Upload**: Upload custom images and videos (JPEG, PNG, MOV, MP4) to enhance ads
- **🎨 Resolution Options**: Generate ads in 4K or Full HD quality
- **📊 Ad History**: Track and view all previously generated advertisements
- **🔐 User Authentication**: Secure authentication powered by Clerk
- **💾 Persistent Storage**: MongoDB database for user data and ad history
- **☁️ Cloud Storage**: Cloudinary integration for video storage and delivery
- **📥 Instant Downloads**: Download generated video ads immediately
- **⚡ Real-time Status Updates**: Track ad generation progress with polling mechanism

## 🏗️ Architecture

### System Design

The application follows a modern serverless architecture built on Next.js 15 with the App Router:

```
┌─────────────────────────────────────────────────────────────┐
│                      Client (Next.js)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Landing    │  │  Generate Ad │  │   History    │     │
│  │     Page     │  │     Page     │  │    Page      │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└────────────────────────────┬────────────────────────────────┘
                             │
                             │ API Routes
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                    Next.js API Layer                        │
│  ┌────────────┐ ┌────────────┐ ┌─────────────┐            │
│  │  generate- │ │ get-ad-    │ │ submit-ad   │            │
│  │  ad        │ │ status     │ │             │            │
│  └────────────┘ └────────────┘ └─────────────┘            │
└───────┬──────────────────┬──────────────┬──────────────────┘
        │                  │              │
        ▼                  │              ▼
┌──────────────┐          │       ┌──────────────┐
│  Caption.ai  │          │       │  Cloudinary  │
│     API      │          │       │   Storage    │
└──────────────┘          │       └──────────────┘
                          ▼
                   ┌──────────────┐
                   │   MongoDB    │
                   │   Database   │
                   └──────────────┘
```

### Data Flow

1. **User Authentication**: Clerk handles user authentication and session management
2. **Ad Generation Request**: User submits script, media, and creator selection
3. **API Processing**: Next.js API routes forward requests to Caption.ai
4. **Video Generation**: Caption.ai processes the request and generates the video
5. **Status Polling**: Client polls for generation status until completion
6. **Storage**: Generated video is uploaded to Cloudinary
7. **Database Update**: Ad metadata is saved to MongoDB with user reference
8. **Delivery**: User can view and download the generated ad

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router, React 19)
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Radix UI primitives (Select, Label, Slot)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **File Upload**: Uploadcare React Uploader
- **Authentication UI**: Clerk React components
- **Notifications**: React Hot Toast

### Backend
- **Runtime**: Node.js (Next.js API Routes)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Clerk
- **File Storage**: Cloudinary
- **External API**: Caption.ai for video generation

### Development Tools
- **Language**: TypeScript
- **Linting**: ESLint (Next.js config)
- **Package Manager**: npm

## 📁 Project Structure

```
src/
├── app/
│   ├── api/                    # API routes
│   │   ├── auth/              # User authentication endpoint
│   │   ├── generate-ad/       # Ad generation endpoint
│   │   ├── get-ad-status/     # Poll ad generation status
│   │   ├── get-creators-list/ # Fetch available AI creators
│   │   ├── get-user/          # User details retrieval
│   │   └── submit-ad/         # Save generated ad to DB
│   ├── generate-ad/           # Ad generation page
│   ├── history/               # User's ad history page
│   ├── sign-in/               # Sign in page
│   ├── sign-up/               # Sign up page
│   ├── layout.tsx             # Root layout with Clerk provider
│   ├── page.tsx               # Landing page
│   └── globals.css            # Global styles
├── components/
│   ├── navbar.tsx             # Navigation component
│   ├── upload.tsx             # File upload component
│   └── ui/                    # Reusable UI components
├── config/
│   └── db.ts                  # MongoDB connection configuration
├── models/
│   ├── ad.ts                  # Ad schema/model
│   └── user.ts                # User schema/model
├── types/
│   └── index.ts               # TypeScript type definitions
├── utility/
│   └── downloader.ts          # File download utility
└── middleware.ts              # Clerk authentication middleware
```

## 🔑 API Routes

### POST `/api/auth`
Create new user account in database after Clerk authentication.

**Request Body:**
```json
{
  "data": {
    "first_name": "string",
    "last_name": "string",
    "email_addresses": [{"email_address": "string"}],
    "image_url": "string"
  }
}
```

### POST `/api/generate-ad`
Submit ad generation request to Caption.ai.

**Request Body:**
```json
{
  "adScript": "string",
  "creator": "string",
  "resolution": "4k" | "fhd",
  "mediaFiles": ["url1", "url2"]
}
```

### POST `/api/get-ad-status`
Poll the status of ad generation.

**Request Body:**
```json
{
  "operationId": "string"
}
```

### GET `/api/get-creators-list`
Fetch list of available AI creators from Caption.ai.

### POST `/api/get-user`
Retrieve user details with populated ads.

**Request Body:**
```json
{
  "email": "string"
}
```

### POST `/api/submit-ad`
Save generated ad to database and upload to Cloudinary.

**Request Body:**
```json
{
  "script": "string",
  "creatorName": "string",
  "resolution": "4k" | "fhd",
  "mediaUrl": ["url1", "url2"],
  "generatedAdUrl": "string",
  "email": "string"
}
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or Atlas)
- Clerk account for authentication
- Caption.ai API key
- Cloudinary account
- Uploadcare account

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/ai-ads-generator

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Caption.ai
CAPTION_AI_API_URL=https://api.caption.ai
CAPTION_AI_API_KEY=your_caption_ai_api_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Uploadcare
NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY=your_uploadcare_public_key
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/aman-tiwari001/AI-Ads-Generator.git
cd AI-Ads-Generator
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Set up environment variables (see above)

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 📊 Database Models

### User Model
```typescript
{
  firstName: string,
  lastName: string,
  email: string (unique),
  photoUrl: string,
  ads: ObjectId[] (ref: 'Ad'),
  timestamps: true
}
```

### Ad Model
```typescript
{
  creatorName: string,
  script: string,
  mediaUrl: string[],
  resolution: 'fhd' | '4k',
  generatedAdUrl: string,
  timestamps: true
}
```

## 🔐 Authentication & Middleware

The application uses Clerk for authentication with custom middleware protection:

- **Protected Routes**: `/generate-ad`, `/history`, `/api/*`
- **Excluded Routes**: `/api/auth` (for user registration)
- **Unauthenticated Access**: Redirects to sign-in with return URL

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Framer Motion for page transitions and interactions
- **Dark Theme**: Custom dark mode with gradient accents
- **Interactive Elements**: Hover effects and animated components
- **Real-time Feedback**: Toast notifications for user actions
- **Loading States**: Progress indicators during ad generation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Aman Tiwari**
- GitHub: [@aman-tiwari001](https://github.com/aman-tiwari001)

## 🙏 Acknowledgments

- [Caption.ai](https://caption.ai) for AI video generation API
- [Clerk](https://clerk.com) for authentication services
- [Cloudinary](https://cloudinary.com) for media storage
- [Uploadcare](https://uploadcare.com) for file uploads
