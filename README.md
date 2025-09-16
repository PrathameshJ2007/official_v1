# Titan Neural Network - Document Intelligence Platform

This is a Next.js application that uses AI to analyze documents and extract key information.

## Project Deep Dive & Pitch Overview

This document provides a strategic and technical overview of the Titan Neural Network platform, suitable for a pitch, hackathon, or technical presentation.

### 1. High-Level Architecture

Our application is built on a modern, serverless-first stack designed for scalability, performance, and low operational overhead.

-   **Frontend (Next.js & React):** A dynamic, server-rendered user interface for a fast and responsive experience. We used **shadcn/ui** for our component library to build a polished, production-ready UI efficiently.
-   **AI Backend (Genkit):** A powerful, serverless AI backend using Google's Genkit framework. It orchestrates calls to Google's Gemini large language models for all document processing.
-   **Hosting (Vercel/Netlify/Railway):** A scalable, serverless hosting platform that allows for continuous deployment directly from our Git repository, minimizing infrastructure management.

### 2. Application Workflow (Visualized)

Here’s a step-by-step visual representation of how a document is processed:

```
[User's Device: Browser]
       |
       1. User uploads a file (PDF/Image) or takes a photo.
       |
       V
[Next.js Frontend: /src/app/page.tsx]
       |
       2. File is converted into a Base64 Data URI.
       |  (e.g., 'data:image/jpeg;base64,iVBORw0KGgo...')
       |
       V
[Serverless Function Call]
       |
       3. Frontend calls `processDocument({ documentDataUri: "..." })`
       |  This is a network request to our AI backend.
       |
       V
[Genkit AI Backend: /src/ai/flows/document-processor.ts]
       |
       4. The Genkit flow receives the request.
       |
       5. It invokes the Google Gemini LLM with two key things:
       |  - The document: `{{media url=documentDataUri}}`
       |  - The prompt asking it to act as an expert and return structured data.
       |
       6. The LLM's raw output is validated against our `ProcessDocumentOutputSchema` (Zod).
       |  This ensures the output is always in the correct JSON format.
       |
       V
[Serverless Function Response]
       |
       7. A structured JSON object is returned to the frontend.
       |
       |  {
       |    "summary": "This is a contract between...",
       |    "keyFacts": [{ "fact": "...", "citation": "..." }],
       |    "risksAndFees": [{ "description": "...", "citation": "..." }],
       |    ...
       |  }
       |
       V
[Next.js Frontend: /src/app/page.tsx]
       |
       8. The React component's `result` state is updated with the JSON data.
       |
       9. The UI re-renders to display the analysis in tabs/accordion.
       |
       V
[User's Device: Browser]
       |
       10. User sees the complete document analysis.
       |
```

### 3. Key Features

Titan is more than just an OCR tool; it's a comprehensive document intelligence platform.

-   **Multi-Modal Document Ingestion:** Users can upload PDFs and various image formats. Crucially, our integrated camera feature allows users to instantly digitize physical documents, crop them for clarity, and submit them for analysis on the go.
-   **AI-Powered Analysis:** We leverage a multimodal LLM to understand both text and layout. The AI generates a plain-English summary, extracts critical facts (like parties, dates, and amounts), identifies potential risks and fees, and creates a list of actionable to-do items with deadlines.
-   **Reliable, Structured Output:** Every analysis returns a predictable JSON object with citations for each extracted fact. This reliability is enforced by a Zod schema, making the data easy to integrate and display consistently.
-   **Adaptive & Responsive UI:** The interface provides a seamless experience across devices, using tabs on desktop and an accordion on mobile to present complex information clearly.

### 4. Competitive Differentiation

Our solution stands out from existing document management tools in several key ways:

-   **From Data Extraction to Actionable Intelligence:** While most tools stop at OCR (extracting raw text), we provide a second layer of AI analysis that interprets the text, contextualizes it, and tells the user what it means for them and what they need to do next.
-   **Integrated, End-to-End Workflow:** We offer a single, seamless experience from document capture to analysis and action items. There's no need to use a separate scanning app, then upload to a separate analysis tool. It all happens in one place.
-   **Cost-Effective & Serverless:** By using a serverless architecture (Genkit, Vercel/Netlify/Railway), we avoid the high fixed costs of maintaining dedicated servers. Our operational costs scale directly with usage, making the solution highly economical.

### 5. Scalability & Implementation Cost

The architecture was deliberately chosen to maximize scalability while minimizing cost.

-   **Scalability:** Every component of our stack is serverless and managed by best-in-class providers. The **Next.js frontend** scales automatically with traffic via the hosting platform, and **Genkit AI flows** are serverless functions that can handle a massive number of concurrent requests. This means we can go from one user to one million users with zero infrastructure changes.
-   **Implementation Cost:** The initial development cost is significantly reduced by leveraging open-source tools like Next.js, React, and Genkit. The primary ongoing cost is API usage for the AI model, which is a variable cost directly tied to user activity. There are no fixed server costs, making it an incredibly lean and efficient business model.

### 6. Detailed File Structure

```
.
├── src
│   ├── app
│   │   ├── history/page.tsx   # React component for the document history page.
│   │   ├── layout.tsx         # Root layout for the entire application.
│   │   ├── page.tsx           # Main entry point and UI for document upload/analysis.
│   │   └── globals.css        # Global styles and Tailwind CSS theme variables.
│   │
│   ├── ai
│   │   ├── flows/document-processor.ts  # The core AI logic. Defines the Genkit flow, prompt, and Zod schemas for structured output.
│   │   └── genkit.ts                      # Configuration file for initializing Genkit and the Google AI plugin.
│   │
│   ├── components
│   │   ├── ui/                  # Reusable UI components from shadcn/ui (Button, Card, etc.).
│   │   ├── documentation-dialog.tsx # React component for the in-app documentation modal.
│   │   └── theme-toggle.tsx       # Component for switching between light and dark modes.
│   │
│   ├── hooks
│   │   ├── use-toast.ts         # Custom hook for managing toast notifications.
│   │   └── use-mobile.tsx       # Custom hook to detect if the user is on a mobile device.
│   │
│   └── lib
│       ├── utils.ts             # Utility functions, including `cn` for merging Tailwind classes.
│       ├── crop-image.ts        # Client-side logic for cropping images from the camera component.
│       └── firebase.ts          # Firebase configuration and initialization (if used).
│
├── public/                    # Static assets (images, fonts, etc.).
├── package.json               # Project dependencies and scripts.
├── next.config.ts             # Configuration for the Next.js framework.
├── tailwind.config.ts         # Configuration for the Tailwind CSS utility-first framework.
└── README.md                  # This file.
```

---

## Running Locally in Visual Studio Code

Follow these steps to get the project running on your local machine.

### 1. Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)

### 2. Clone the Repository

First, clone the project repository to your local machine.

```bash
git clone <your-repository-url>
cd <your-project-directory>
```

### 3. Install Dependencies

Open the project in Visual Studio Code and install the necessary npm packages.

```bash
npm install
```

### 4. Set Up Environment Variables

The application requires an API key for the Google AI (Gemini) service to function.

1.  Create a new file named `.env` in the root of your project.
2.  Add your Gemini API key to this file:

    ```env
    GEMINI_API_KEY=your_gemini_api_key_here
    ```

    You can get a Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### 5. Run the Development Servers

This project requires two separate processes to be running simultaneously:
- The Next.js frontend application.
- The Genkit AI backend.

The recommended way to manage this in VS Code is by using the built-in terminal and splitting it.

1.  **Open the Terminal:** Open a new terminal in VS Code (`View` > `Terminal` or `Ctrl+\` `).

2.  **Start the AI Backend (Genkit):** In the terminal, run the following command to start the Genkit server. It will watch for changes in your AI flows.

    ```bash
    npm run genkit:watch
    ```

3.  **Split the Terminal:** Click the "Split Terminal" icon (it looks like a split rectangle) in the terminal's title bar. This will open a second terminal pane next to the first one.

4.  **Start the Frontend (Next.js):** In the new terminal pane, run the following command to start the Next.js development server.

    ```bash
    npm run dev
    ```

### 6. Access the Application

Once both servers are running, you can access the application in your web browser at:

[http://localhost:9002](http://localhost:9002)

You are now all set up for local development! Changes you make to the frontend code will be hot-reloaded by the Next.js server, and changes to your AI flows will be automatically picked up by the Genkit server.
