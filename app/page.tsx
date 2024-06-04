import { Card, Title, Text } from '@tremor/react';

export default async function IndexPage() {

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>REPORT GENERATION SYSTEM BY FATIMA MOHAMMED SANI</Title>
      <p>Student ID: ST10145809</p>

      <Card className="mt-8">
        <p>The system is an eBilling and Invoicing System that provides both detailed and summary-type reports for analyzing sales volume,
        sales trends, and available stock. It includes the following features:        
        </p>
        
      <ul className="mt-3">
          <li>• Billing summary report, it has the selection criteria for the date range.</li>
          <li>• Stock Details and stock summary reports, It shows every details of the stock and can be used to monitor the sales pattern.</li>
          <li>• All reports can be exported in different format includes Text File, CSV File, MS Excel, MS Word File.</li>
          <li>• All report can be printed from any type of printer.</li>
          <li>• Bill and invoice can be printed in preprinted stationary.</li>
        </ul>
      </Card>
      <Card className="mt-5">
        <p>The Report Generation System was created using the following stack:</p>
        
        <ul className="mt-2">
          <li>• Framework - Next.js 14</li>
          <li>• Language - TypeScriptLanguage - TypeScript, React - JavaScript</li>
          <li>• Styling - Tailwind CSS</li>
          <li>• Icons - Reacticons</li>
          <li>• Deployment - Vercel</li>
          <li>• Libraries - Tremor, Bootstrap, Material UI</li>
          <li>• Linting - ESLint</li>
          <li>• Formatting - Prettier</li>
          <li>• Analytics - Vercel Analytics</li>
        </ul>
      </Card>
    </main>
  );
}
