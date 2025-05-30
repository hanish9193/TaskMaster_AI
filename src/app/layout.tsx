
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import AppHeader from '@/components/app-header'; // Import the new header

export const metadata: Metadata = {
  title: 'TaskMaster AI - Your AI Task Companion',
  description: 'Manage your tasks with TaskMaster, your AI companion for getting things done (with a bit of personality).',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased bg-background text-foreground`}>
        <AppHeader /> {/* Add the header here */}
        <main> {/* Wrap children in main for semantic HTML and potential future global main styling */}
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
