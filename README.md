# 🤖 AI Ads Generator 🚀
<i>~ A Full-Stack Next.js Project using TypeScript</i>

This application is a full-stack platform that allows users to generate high-quality, AI-powered video advertisements. Users can provide a script oe text, choose an AI creator avatar, upload their own media assets, and generate a customized video ad ready for download and use.

The project leverages an external AI video generation API, handles user authentication, manages user-specific data, and provides a polished, interactive user interface.

## ⚙️ Features

- **AI Video Generation:** Create video ads by providing a script and media files.
- **User Authentication:** Secure sign-up and sign-in functionality using Clerk.
- **Multiple AI Creators:** Choose from a list of available AI creator avatars.
- **Flexible Script Input:** Write a script directly in a textarea or upload a `.txt` file.
- **Media Uploads:** Upload multiple images (`.jpeg`, `.png`) and videos (`.mov`, `.mp4`) via Uploadcare.
- **High-Resolution Output:** Generate videos in both 4K (2160x3840) and FHD (1080x1920) resolutions.
- **Real-time Generation Status:** A polling mechanism keeps the user updated on the video generation progress (Queued, In Progress, Complete).
- **Ad History:** Registered users can view a gallery of their previously generated ads.
- **Cloud Storage:** Final videos are uploaded to Cloudinary for permanent storage and easy access.
- **Direct Downloads:** Download the generated video files directly from the UI.

## 💻 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication:** [Clerk](https://clerk.com/)
- **File Uploads:** [Uploadcare](https://uploadcare.com/)
- **Video Hosting:** [Cloudinary](https://cloudinary.com/)
- **AI Video Service:** Caption.ai API (external)

## How It Works❓

1.  **Authentication:** The user signs up or signs in via Clerk. A corresponding user document is created in the MongoDB database to store application-specific data.
2.  **Ad Generation:**
    - On the `/generate-ad` page, the user fills out a form with a script, selects an AI creator, uploads media files, and chooses a resolution.
    - The form submission triggers a request to the `/api/generate-ad` backend endpoint.
3.  **External AI Service:**
    - The backend forwards the ad generation request to the external Caption.ai API.
    - This API returns an `operationId` to track the generation job.
4.  **Polling for Status:**
    - The frontend receives the `operationId` and begins polling the `/api/get-ad-status` endpoint every few seconds.
    - This endpoint, in turn, polls the Caption.ai API for the job's current status and progress.
    - The UI displays the live progress to the user.
5.  **Completion & Storage:**
    - Once the AI service completes the video, it provides a temporary URL.
    - The frontend sends this URL and the ad metadata to the `/api/submit-ad` endpoint.
    - This final endpoint uploads the video from the temporary URL to Cloudinary and creates a new `Ad` document in MongoDB with the permanent Cloudinary URL. The new ad is linked to the user's profile.
6.  **Viewing History:** The `/history` page fetches the user's data and populates the `ads` array, displaying all previously generated videos.

## 👦 Getting Started

To run this project locally, follow these steps:

### Prerequisites

- Node.js (v20 or later)
- npm or a compatible package manager
- MongoDB instance (local or remote)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/aman-tiwari001/ai-ads-generator.git
    ```

2.  Navigate to the project directory:
    ```bash
    cd ai-ads-generator
    ```

3.  Install the dependencies:
    ```bash
    npm install
    ```

### Environment Variables

Create a `.env.local` file in the root of the project and add the following environment variables. You will need to create accounts for Clerk, Uploadcare, Cloudinary, and the Caption.ai service to get the necessary keys.

```env
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Uploadcare for file uploads
NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY=your_uploadcare_public_key

# Cloudinary for video hosting
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Caption.ai for video generation
CAPTION_AI_API_URL=https://api.caption.ai
CAPTION_AI_API_KEY=your_caption_ai_api_key
```

### 🏃 Running the Application

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000`.

## 📊 API Endpoints

The core backend logic is handled through the following API routes:

-   `POST /api/auth`: Creates a new user in the local MongoDB database upon successful Clerk sign-up.
-   `POST /api/generate-ad`: Submits the video generation job to the external AI service.
-   `POST /api/get-ad-status`: Polls the external AI service for the status of a generation job using its `operationId`.
-   `GET /api/get-creators-list`: Fetches the list of available AI creators and their thumbnails from the external service.
-   `POST /api/get-user`: Retrieves a user's profile and their associated ad history from the database.
-   `POST /api/submit-ad`: Uploads the final generated video to Cloudinary and saves the ad metadata to the database.
