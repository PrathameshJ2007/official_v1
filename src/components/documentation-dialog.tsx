
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DocumentationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DocSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-primary">{title}</h3>
        <div className="text-muted-foreground space-y-2">{children}</div>
    </div>
);


export function DocumentationDialog({ open, onOpenChange }: DocumentationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl">Project Documentation: Titan Neural Network</DialogTitle>
          <DialogDescription>
            A technical overview of the Document Intelligence Platform.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 pr-6 -mr-6">
            <div className="prose prose-sm max-w-none">
                <DocSection title="1. High-Level Architecture">
                    <p>Our application is built on three core pillars:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Frontend (Next.js & React):</strong> A dynamic, server-rendered user interface for a fast and responsive user experience. We used <strong>shadcn/ui</strong> for our component library to build a polished UI quickly.</li>
                        <li><strong>AI Backend (Genkit):</strong> A powerful, serverless AI backend using Google's Genkit framework. This handles all the heavy lifting of document processing and analysis.</li>
                        <li><strong>Hosting (Railway/Netlify):</strong> A scalable, serverless hosting platform that allows for continuous deployment directly from our code repository.</li>
                    </ul>
                </DocSection>

                <DocSection title="2. The Frontend: A Reactive User Journey (src/app/page.tsx)">
                    <p>The user experience is paramount. We've built a single-page application that guides the user through a seamless, step-by-step process without ever needing to refresh the page. This is managed by a state machine within our main React component, <code>DocumentUploader</code>.</p>
                    <p><strong>The User Flow:</strong></p>
                    <ol className="list-decimal pl-5 space-y-2">
                        <li><strong>Initial View:</strong> The user is first greeted with a landing page that clearly explains the app's value proposition.</li>
                        <li><strong>Uploader:</strong> Clicking "Upload" reveals our file handling component. This supports drag-and-drop, file browsing, and even includes a <strong>Camera Component</strong> that lets users take a photo of a document, crop it, and submit it.</li>
                        <li><strong>Processing:</strong> While the AI works, a <code>ProcessingStatus</code> component provides real-time visual feedback, showing the user that their document is being uploaded, processed, and analyzed.</li>
                        <li><strong>Results:</strong> Once the AI returns its analysis, the UI transitions to display the <code>ResultComponent</code>, presenting the extracted information in a clean, organized manner using Tabs for desktop and an Accordion for mobile.</li>
                    </ol>
                </DocSection>
                
                <DocSection title="3. The AI Backend: Structured Intelligence (src/ai/flows/document-processor.ts)">
                     <p>The core intelligence of our platform lies in our AI flow, built with <strong>Genkit</strong>. Reliability is our most critical concern, which we enforce using the <strong>Zod</strong> schema validation library.</p>
                     <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Structured I/O with Zod:</strong> We define a strict data contract. <code>ProcessDocumentInputSchema</code> ensures the AI receives a data URI, and <code>ProcessDocumentOutputSchema</code> commands the AI to return a precise JSON structure, including <code>documentType</code>, <code>summary</code>, and arrays for <code>keyFacts</code>, <code>risksAndFees</code>, and <code>toDoItems</code>, each with a citation. This structured output eliminates variability and makes the AI's response predictable.</li>
                        <li><strong>The Prompt (<code>processDocumentPrompt</code>):</strong> We instruct the AI to act as a "document intelligence expert" and to be concise. We pass the user's document to the multimodal AI using <code>{"{{media url=documentDataUri}}"}</code> and explicitly ask the model to fill out the fields defined in our Zod schema.</li>
                        <li><strong>The Flow (<code>processDocumentFlow</code>):</strong> This serverless function orchestrates the process. It takes the user's input, calls the AI prompt, and returns the structured output to the frontend, scaling automatically to handle any number of requests.</li>
                     </ul>
                </DocSection>

                <p className="text-center text-sm text-muted-foreground pt-4">By combining a reactive frontend with a structured, serverless AI backend, we've built a platform that is not only powerful and intelligent but also scalable, reliable, and a pleasure to use.</p>
            </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

    