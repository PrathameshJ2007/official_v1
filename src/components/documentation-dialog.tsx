
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Smartphone, Upload, Code, Server, BrainCircuit, Sparkles, CheckCheck, FileJson, RefreshCw, LayoutTemplate, Eye, ArrowDown } from 'lucide-react';

interface DocumentationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DocSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3 text-primary">{title}</h3>
        <div className="text-muted-foreground space-y-2">{children}</div>
    </div>
);

const WorkflowStep = ({ icon, title, description, isLast = false }: { icon: React.ReactNode, title: string, description: string, isLast?: boolean }) => (
    <div className="flex items-start">
        <div className="flex flex-col items-center mr-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                {icon}
            </div>
            {!isLast && <div className="w-px h-16 bg-border mt-2"></div>}
        </div>
        <div className="pt-2">
            <h4 className="font-semibold text-foreground">{title}</h4>
            <p className="text-sm">{description}</p>
        </div>
    </div>
);


export function DocumentationDialog({ open, onOpenChange }: DocumentationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl">Project Documentation: Titan Neural Network</DialogTitle>
          <DialogDescription>
            A strategic and technical overview of the Document Intelligence Platform.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 pr-6 -mr-6">
            <div className="prose prose-sm max-w-none">
                <DocSection title="1. High-Level Architecture">
                    <p>Our application is built on a modern, serverless-first stack designed for scalability, performance, and low operational overhead.</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Frontend (Next.js & React):</strong> A dynamic, server-rendered user interface for a fast and responsive experience. We used <strong>shadcn/ui</strong> for our component library to build a polished, production-ready UI efficiently.</li>
                        <li><strong>AI Backend (Genkit):</strong> A powerful, serverless AI backend using Google's Genkit framework. It orchestrates calls to Google's Gemini large language models for all document processing.</li>
                        <li><strong>Hosting (Vercel/Netlify/Railway):</strong> A scalable, serverless hosting platform that allows for continuous deployment directly from our Git repository, minimizing infrastructure management.</li>
                    </ul>
                </DocSection>

                <DocSection title="2. Application Workflow">
                    <p className='mb-4'>Here’s a step-by-step visual representation of how a document is processed:</p>
                    <div className="space-y-0">
                        <WorkflowStep 
                            icon={<Upload className="w-6 h-6" />}
                            title="1. Document Ingestion"
                            description="User uploads a file (PDF/Image) or takes a photo on their device."
                        />
                         <WorkflowStep 
                            icon={<Code className="w-6 h-6" />}
                            title="2. Frontend Processing"
                            description="The Next.js frontend converts the file into a Base64 Data URI to prepare it for transmission."
                        />
                         <WorkflowStep 
                            icon={<Server className="w-6 h-6" />}
                            title="3. Serverless Function Call"
                            description="The frontend calls the `processDocument` server action, sending the Data URI to the AI backend."
                        />
                         <WorkflowStep 
                            icon={<BrainCircuit className="w-6 h-6" />}
                            title="4. Genkit AI Backend"
                            description="The Genkit flow receives the request and invokes the Google Gemini LLM, passing the document media and prompt."
                        />
                        <WorkflowStep 
                            icon={<CheckCheck className="w-6 h-6" />}
                            title="5. Structured Output Validation"
                            description="The LLM's output is strictly validated against a Zod schema (`ProcessDocumentOutputSchema`) to ensure a reliable JSON format."
                        />
                        <WorkflowStep 
                            icon={<FileJson className="w-6 h-6" />}
                            title="6. Serverless Response"
                            description="A structured JSON object containing the summary, key facts, risks, and to-do items is returned to the frontend."
                        />
                         <WorkflowStep 
                            icon={<RefreshCw className="w-6 h-6" />}
                            title="7. UI State Update"
                            description="The React component's state is updated with the analysis results, triggering a re-render."
                        />
                        <WorkflowStep 
                            icon={<LayoutTemplate className="w-6 h-6" />}
                            title="8. Dynamic Rendering"
                            description="The UI displays the analysis in an easy-to-navigate format (tabs on desktop, accordion on mobile)."
                            isLast={true}
                        />
                    </div>
                </DocSection>

                <DocSection title="3. Key Features">
                    <p>Titan is more than just an OCR tool; it's a comprehensive document intelligence platform.</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Multi-Modal Document Ingestion:</strong> Users can upload PDFs and various image formats. Crucially, our integrated camera feature allows users to instantly digitize physical documents, crop them for clarity, and submit them for analysis on the go.</li>
                        <li><strong>AI-Powered Analysis:</strong> We leverage a multimodal LLM to understand both text and layout. The AI generates a plain-English summary, extracts critical facts (like parties, dates, and amounts), identifies potential risks and fees, and creates a list of actionable to-do items with deadlines.</li>
                        <li><strong>Reliable, Structured Output:</strong> Every analysis returns a predictable JSON object with citations for each extracted fact. This reliability is enforced by a Zod schema, making the data easy to integrate and display consistently.</li>
                        <li><strong>Adaptive & Responsive UI:</strong> The interface provides a seamless experience across devices, using tabs on desktop and an accordion on mobile to present complex information clearly.</li>
                    </ul>
                </DocSection>

                <DocSection title="4. Competitive Differentiation">
                    <p>Our solution stands out from existing document management tools in several key ways:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>From Data Extraction to Actionable Intelligence:</strong> While most tools stop at OCR (extracting raw text), we provide a second layer of AI analysis that interprets the text, contextualizes it, and tells the user what it means for them and what they need to do next.</li>
                        <li><strong>Integrated, End-to-End Workflow:</strong> We offer a single, seamless experience from document capture to analysis and action items. There's no need to use a separate scanning app, then upload to a separate analysis tool. It all happens in one place.</li>
                        <li><strong>Cost-Effective & Serverless:</strong> By using a serverless architecture (Genkit, Vercel/Netlify), we avoid the high fixed costs of maintaining dedicated servers. Our operational costs scale directly with usage, making the solution highly economical.</li>
                    </ul>
                </DocSection>

                <DocSection title="5. Scalability & Implementation Cost">
                    <p>The architecture was deliberately chosen to maximize scalability while minimizing cost.</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Scalability:</strong> Every component of our stack is serverless and managed by best-in-class providers.
                            <ul className='list-[circle] pl-5'>
                                <li>The <strong>Next.js frontend</strong> scales automatically with traffic via the hosting platform.</li>
                                <li><strong>Genkit AI flows</strong> are serverless functions that can handle a massive number of concurrent requests without any manual intervention.</li>
                            </ul>
                            This means we can go from one user to one million users with zero infrastructure changes.
                        </li>
                        <li><strong>Implementation Cost:</strong> The initial development cost is significantly reduced by leveraging open-source tools like Next.js, React, and Genkit. The primary ongoing cost is API usage for the AI model, which is a variable cost directly tied to user activity. There are no fixed server costs, making it an incredibly lean and efficient business model.</li>
                    </ul>
                </DocSection>

                 <DocSection title="6. The AI Backend: Structured Intelligence (src/ai/flows/document-processor.ts)">
                     <p>The core intelligence of our platform lies in our AI flow, built with <strong>Genkit</strong>. Reliability is our most critical concern, which we enforce using the <strong>Zod</strong> schema validation library.</p>
                     <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Structured I/O with Zod:</strong> We define a strict data contract. <code>ProcessDocumentInputSchema</code> ensures the AI receives a data URI, and <code>ProcessDocumentOutputSchema</code> commands the AI to return a precise JSON structure, including <code>documentType</code>, <code>summary</code>, and arrays for <code>keyFacts</code>, <code>risksAndFees</code>, and <code>toDoItems</code>, each with a citation. This structured output eliminates variability and makes the AI's response predictable.</li>
                        <li><strong>The Prompt (<code>processDocumentPrompt</code>):</strong> We instruct the AI to act as a "document intelligence expert" and to be concise. We pass the user's document to the multimodal AI using <code>{"{{media url=documentDataUri}}"}</code> and explicitly ask the model to fill out the fields defined in our Zod schema.</li>
                        <li><strong>The Flow (<code>processDocumentFlow</code>):</strong> This serverless function orchestrates the process. It takes the user's input, calls the AI prompt, and returns the structured output to the frontend, scaling automatically to handle any number of requests.</li>
                     </ul>
                </DocSection>
            </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
