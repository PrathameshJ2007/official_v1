# Titan Neural Network - Financial Document Analysis Platform

This is a Next.js application that uses AI to analyze financial documents like invoices, receipts, and expense reports, and extracts key information to streamline accounting and payment workflows.

## Project Deep Dive & Pitch Overview

This document provides a strategic and technical overview of the Titan Neural Network platform, framed for a presentation focused on financial technology (FinTech).

### 1. High-Level Architecture

Our application is built on a modern, serverless-first stack designed for scalability, performance, and low operational overhead.

-   **Frontend (Next.js & React):** A dynamic, server-rendered user interface for a fast and responsive experience. We used **shadcn/ui** for our component library to build a polished, production-ready UI efficiently.
-   **AI Backend (Genkit):** A powerful, serverless AI backend using Google's Genkit framework. It orchestrates calls to Google's Gemini large language models for all financial document processing.
-   **Hosting (Vercel/Netlify/Railway):** A scalable, serverless hosting platform that allows for continuous deployment directly from our Git repository, minimizing infrastructure management.

### 2. Application Workflow (Finance Example)

Here’s a step-by-step visual representation of how a financial document (e.g., an invoice) is processed:

```
[Finance User's Device: Browser]
       |
       1. User uploads a vendor invoice (PDF/Image) or snaps a photo of a receipt.
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
       5. It invokes the Google Gemini LLM, instructing it to act as a financial analyst.
       |  - The document: `{{media url=documentDataUri}}`
       |  - The prompt asks it to return structured financial data.
       |
       6. The LLM's raw output is validated against our `ProcessDocumentOutputSchema` (Zod).
       |  This ensures the output always contains fields like `invoiceNumber`, `totalAmount`, etc.
       |
       V
[Serverless Function Response]
       |
       7. A structured JSON object is returned to the frontend.
       |
       |  {
       |    "documentType": "Invoice",
       |    "summary": "Invoice #123 from ACME Inc. for services.",
       |    "keyFacts": [
       |      { "fact": "Total Amount: $1,500.00", "citation": "Line 25" },
       |      { "fact": "Vendor: ACME Inc.", "citation": "Page 1, Header" }
       |    ],
       |    "toDoItems": [
       |      { "item": "Pay by 2024-10-25", "citation": "Line 28" }
       |    ],
       |    ...
       |  }
       |
       V
[Next.js Frontend: /src/app/page.tsx]
       |
       8. The React component's `result` state is updated with the JSON data.
       |
       9. The UI re-renders to display the extracted data for review and approval.
       |
       V
[Finance User's Device: Browser]
       |
       10. User sees the complete invoice analysis, ready for action.
       |
```

### 3. Key Features

Titan is more than just an OCR tool; it's a comprehensive financial document intelligence platform.

-   **Multi-Modal Document Ingestion:** Process invoices, receipts, and expense reports from anywhere. Accept PDFs, images, or use the built-in camera for on-the-go receipt capture.
-   **AI-Powered Data Extraction:** Go beyond OCR. Our AI understands financial documents, accurately extracting critical data like vendor names, invoice numbers, line items (quantity, description, price), tax amounts, and due dates.
-   **Reliable, Structured Output:** Every analysis returns a predictable JSON object enforced by a Zod schema. This guarantees the data is clean, consistent, and ready for direct integration into accounting systems like QuickBooks or SAP.
-   **Automated To-Do & Risk Flagging:** The AI automatically identifies payment deadlines and creates actionable to-do items. It can also be prompted to flag unusual items or potential discrepancies for human review.

### 4. Competitive Differentiation

Our solution stands out from existing financial and document management tools:

-   **From Data Entry to Data Intelligence:** While most tools focus on digitizing text (OCR), we provide a second layer of AI analysis that interprets the document, extracts structured financial data, and tells you what to do with it. This drastically reduces manual data entry and the risk of human error.
-   **Integrated, End-to-End Workflow:** We offer a single, seamless experience from document capture to data extraction and review. There's no need for separate scanning apps and manual entry into an accounting system. Titan handles the "first mile" of data processing.
-   **Cost-Effective & Serverless:** By using a serverless architecture, we avoid the high fixed costs of dedicated servers. Our operational costs scale directly with the volume of documents processed, making it an incredibly lean and efficient model for businesses of any size.

### 5. Scalability & Implementation Cost

The architecture was deliberately chosen to maximize scalability while minimizing cost.

-   **Scalability:** Every component of our stack is serverless. The **Next.js frontend** scales automatically with traffic, and **Genkit AI flows** can handle a massive number of concurrent document analyses without any infrastructure changes. This means the system can support a small business processing 100 invoices a month or an enterprise processing 100,000.
-   **Implementation Cost:** The primary cost is not servers or software licenses, but variable API usage for the AI model. Costs are directly proportional to the number of documents analyzed. By leveraging open-source tools (Next.js, Genkit), the upfront development and maintenance costs are significantly lower than traditional enterprise software. This makes powerful AI accessible without a large initial investment.

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

    