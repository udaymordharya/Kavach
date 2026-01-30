import { useState } from 'react';
import { Upload } from './components/Upload';
import { AgentPipeline } from './components/AgentPipeline';
import { Results } from './components/Results';
import { Shield, Zap } from 'lucide-react';

export type AppStage = 'upload' | 'processing' | 'results';

export interface AnalysisResult {
  verdict: 'valid' | 'invalid';
  confidence: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  denialReason: string;
  violatedClauses: Array<{
    section: string;
    text: string;
    page?: number;
  }>;
  reasoning: string;
  appealLetter: string;
  userLanguage: string;
  userExplanationNative: string;
  detectedIssue: string;
  auditTrail: Array<{
    agent: string;
    timestamp: string;
    action: string;
    output: any;
  }>;
  escalationPlan: {
    level: string;
    triggerCondition: string;
    nextAction: string;
  };
}

export default function App() {
  const [stage, setStage] = useState<AppStage>('upload');
  const [files, setFiles] = useState<{
    denial?: File;
    policy?: File;
    voice?: Blob;
    userLanguage?: string;
    voiceText?: string;
  }>({});
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleUploadComplete = (uploadedFiles: { 
    denial?: File; 
    policy?: File; 
    voice?: Blob;
    userLanguage?: string;
    voiceText?: string;
  }) => {
    setFiles(uploadedFiles);
    setStage('processing');
  };

  const handleProcessingComplete = (analysisResult: AnalysisResult) => {
    setResult(analysisResult);
    setStage('results');
  };

  const handleStartOver = () => {
    setStage('upload');
    setFiles({});
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">GOLIATH</h1>
                <p className="text-sm text-slate-400">Automatic Bureaucracy Fighter</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">AI-Powered Legal Analysis</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {stage === 'upload' && <Upload onComplete={handleUploadComplete} />}
        {stage === 'processing' && (
          <AgentPipeline files={files} onComplete={handleProcessingComplete} />
        )}
        {stage === 'results' && result && (
          <Results result={result} onStartOver={handleStartOver} />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-700 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-slate-500">
            GOLIATH uses AI to fight unfair bureaucratic denials. Always review generated content before submission.
          </p>
        </div>
      </footer>
    </div>
  );
}