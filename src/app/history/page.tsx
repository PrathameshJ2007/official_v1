
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, ArrowLeft, Trash2, Download } from 'lucide-react';

const mockHistory = [
  { id: 'job_1689348821', type: 'Contract', date: '2023-07-14', summary: 'Employment agreement with Acme Corp.', status: 'Completed' },
  { id: 'job_1689262421', type: 'Invoice', date: '2023-07-13', summary: 'Invoice #INV-001 from Supplier Inc.', status: 'Completed' },
  { id: 'job_1689176021', type: 'Lease Agreement', date: '2023-07-12', summary: 'Apartment lease for 123 Main St.', status: 'Completed' },
  { id: 'job_1689089621', type: 'Terms of Service', date: '2023-07-11', summary: 'Updated ToS for SocialApp.', status: 'Completed' },
];

export default function HistoryPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="flex h-16 shrink-0 items-center justify-between border-b bg-background px-4 md:px-6">
        <h1 className="text-lg font-bold">Document History</h1>
        <Button asChild variant="outline">
            <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Upload
            </Link>
        </Button>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8 md:px-6 lg:py-12">
        <div className="mx-auto max-w-4xl">
            {mockHistory.length > 0 ? (
                <div className="space-y-4">
                    {mockHistory.map((item) => (
                        <Card key={item.id}>
                            <CardHeader className='pb-4'>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="flex items-center gap-2">
                                            <FileText className="h-5 w-5 text-primary" />
                                            {item.type}
                                        </CardTitle>
                                        <p className="text-sm text-muted-foreground mt-1">Processed on {item.date}</p>
                                    </div>
                                     <Badge variant={item.status === 'Completed' ? 'default' : 'secondary'} className="bg-green-500/20 text-green-700">
                                        {item.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">{item.summary}</p>
                                <div className="flex items-center justify-between">
                                    <p className="text-xs text-muted-foreground font-mono">{item.id}</p>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon">
                                            <Download className="h-4 w-4" />
                                            <span className="sr-only">Download Analysis</span>
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                            <Trash2 className="h-4 w-4" />
                                             <span className="sr-only">Delete Item</span>
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 border-2 border-dashed rounded-lg">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">No Documents Processed</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Your document analysis history will appear here.
                    </p>
                    <Button asChild className="mt-6">
                        <Link href="/">Upload a Document</Link>
                    </Button>
                </div>
            )}
        </div>
      </main>
    </div>
  );
}
