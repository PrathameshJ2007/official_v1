
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
            A strategic and technical overview of the Financial Document Analysis Platform.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 pr-6 -mr-6">
            <div className="prose prose-sm max-w-none">
                <DocSection title="1. High-Level Architecture">
                    <p>Our application is built on a modern, serverless-first stack designed for scalability, performance, and low operational overhead.</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Frontend (Next.js & React):</strong> A dynamic, server-rendered user interface for a fast and responsive experience. We used <strong>shadcn/ui</strong> for our component library to build a polished, production-ready UI efficiently.</li>
                        <li><strong>AI Backend (Genkit):</strong> A powerful, serverless AI backend using Google's Genkit framework. It orchestrates calls to Google's Gemini large language models for all financial document processing.</li>
                        <li><strong>Hosting (Vercel/Netlify/Railway):</strong> A scalable, serverless hosting platform that allows for continuous deployment directly from our Git repository, minimizing infrastructure management.</li>
                    </ul>
                </DocSection>

                <DocSection title="2. Application Workflow (Finance Example)">
                    <p className='mb-4'>Here’s a step-by-step visual representation of how a financial document (e.g., an invoice) is processed:</p>
                    <div className="space-y-0">
                        <WorkflowStep 
                            icon={<Upload className="w-6 h-6" />}
                            title="1. Document Ingestion"
                            description="A user in the finance department uploads a vendor invoice PDF or snaps a photo of a receipt."
                        />
                         <WorkflowStep 
                            icon={<Code className="w-6 h-6" />}
                            title="2. Frontend Processing"
                            description="The Next.js frontend converts the file into a Base64 Data URI to prepare it for transmission."
                        />
                         <WorkflowStep 
                            icon={<Server className="w-6 h-6" />}
                            title="3. Serverless Function Call"
                            description="The frontend calls the `processDocument` server action, sending the invoice Data URI to the AI backend."
                        />
                         <WorkflowStep 
                            icon={<BrainCircuit className="w-6 h-6" />}
                            title="4. Genkit AI Backend"
                            description="The Genkit flow invokes the Gemini LLM, instructing it to act as a financial analyst and extract structured data."
                        />
                        <WorkflowStep 
                            icon={<CheckCheck className="w-6 h-6" />}
                            title="5. Structured Output Validation"
                            description="The LLM's output is validated against a Zod schema to ensure it contains required fields like `invoiceNumber`, `totalAmount`, `dueDate`, and `lineItems`."
                        />
                        <WorkflowStep 
                            icon={<FileJson className="w-6 h-6" />}
                            title="6. Serverless Response"
                            description="A structured JSON object with the extracted financial data is returned to the frontend."
                        />
                         <WorkflowStep 
                            icon={<RefreshCw className="w-6 h-6" />}
                            title="7. UI State Update"
                            description="The React component's state is updated, populating the UI with the verified invoice data."
                        />
                        <WorkflowStep 
                            icon={<LayoutTemplate className="w-6 h-6" />}
                            title="8. Data Display & Action"
                            description="The user sees the extracted data, can flag discrepancies, or approve the invoice for payment."
                            isLast={true}
                        />
                    </div>
                </DocSection>

                <DocSection title="3. Key Features">
                    <p>Titan is more than just an OCR tool; it's a comprehensive financial document intelligence platform.</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Multi-Modal Document Ingestion:</strong> Process invoices, receipts, and expense reports from anywhere. Accept PDFs, images, or use the built-in camera for on-the-go receipt capture.</li>
                        <li><strong>AI-Powered Data Extraction:</strong> Go beyond OCR. Our AI understands financial documents, accurately extracting critical data like vendor names, invoice numbers, line items (quantity, description, price), tax amounts, and due dates.</li>
                        <li><strong>Reliable, Structured Output:</strong> Every analysis returns a predictable JSON object enforced by a Zod schema. This guarantees the data is clean, consistent, and ready for direct integration into accounting systems.</li>
                        <li><strong>Automated To-Do & Risk Flagging:</strong> The AI automatically identifies payment deadlines and creates actionable to-do items. It can also be prompted to flag unusual items or potential discrepancies for human review.</li>
                    </ul>
                </DocSection>

                <DocSection title="4. Competitive Differentiation">
                    <p>Our solution stands out from existing financial and document management tools:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>From Data Entry to Data Intelligence:</strong> While most tools focus on digitizing text (OCR), we provide a second layer of AI analysis that interprets the document, extracts structured financial data, and tells you what to do with it. This drastically reduces manual data entry and human error.</li>
                        <li><strong>Integrated, End-to-End Workflow:</strong> We offer a single, seamless experience from document capture to data extraction and review. There's no need for separate scanning apps and manual entry into an accounting system. Titan handles the "first mile" of data processing.</li>
                        <li><strong>Cost-Effective & Serverless:</strong> By using a serverless architecture, we avoid the high fixed costs of dedicated servers. Our operational costs scale directly with the volume of documents processed, making it an incredibly lean and efficient model for businesses of any size.</li>
                    </ul>
                </DocSection>

                <DocSection title="5. Scalability & Implementation Cost">
                    <p>The architecture was deliberately chosen to maximize scalability while minimizing cost.</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Scalability:</strong> Every component of our stack is serverless. The **Next.js frontend** scales automatically with traffic, and **Genkit AI flows** can handle a massive number of concurrent document analyses without any infrastructure changes. This means the system can support a small business processing 100 invoices a month or an enterprise processing 100,000.</li>
                        <li><strong>Implementation Cost:</strong> The primary cost is not servers or software licenses, but variable API usage for the AI model. Costs are directly proportional to the number of documents analyzed. By leveraging open-source tools (Next.js, Genkit), the upfront development and maintenance costs are significantly lower than traditional enterprise software. This makes powerful AI accessible without a large initial investment.</li>
                    </ul>
                </DocSection>

                 <DocSection title="6. The AI Backend: Structured Intelligence (src/ai/flows/document-processor.ts)">
                     <p>The core intelligence of our platform lies in our AI flow, built with <strong>Genkit</strong>. Reliability is our most critical concern, which we enforce using the <strong>Zod</strong> schema validation library.</p>
                     <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Structured I/O with Zod:</strong> We define a strict data contract for financial data. `ProcessDocumentOutputSchema` commands the AI to return a precise JSON structure, including fields like `documentType`, `summary`, and arrays for `keyFacts` (e.g., invoice number, total), `risksAndFees` (e.g., late payment penalties), and `toDoItems` (e.g., "Pay by [Due Date]"). This structured output eliminates variability and makes the AI's response predictable and integration-ready.</li>
                        <li><strong>The Prompt (<code>processDocumentPrompt</code>):</strong> We instruct the AI to act as a "document intelligence expert" with a focus on financial analysis. We pass the user's document to the multimodal AI using <code>{"{{media url=documentDataUri}}"}</code> and explicitly ask the model to fill out the fields defined in our Zod schema.</li>
                        <li><strong>The Flow (<code>processDocumentFlow</code>):</strong> This serverless function orchestrates the process. It takes the user's input, calls the AI prompt, and returns the structured output to the frontend, scaling automatically to handle any number of requests.</li>
                     </ul>
                </DocSection>
            </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

    