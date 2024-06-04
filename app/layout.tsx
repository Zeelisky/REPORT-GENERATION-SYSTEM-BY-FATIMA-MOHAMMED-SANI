import './globals.css';
import Nav from './nav';
import Toast from './toast';
import { Suspense } from 'react';

export const metadata = {
  title: 'Report Generation System',
  description:
    'REPORT GENERATION SYSTEM BY FATIMA MOHAMMED SANI. Student ID: ST10145809. The system is an eBilling and Invoicing System that provides both detailed and summary-type reports for analyzing sales volume, sales trends, and available stock.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <head>
        <link rel='icon' href='/favicon.ico'/>
      </head>
      <body className="h-full">
        <Suspense>
          <Nav />
        </Suspense>
        {children}
        <Toast />
      </body>
    </html>
  );
}
