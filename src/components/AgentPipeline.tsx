import { useEffect, useState } from 'react';
import { Check, Loader2, AlertTriangle } from 'lucide-react';
import { runAgentPipeline } from '../agents/pipeline';
import type { AnalysisResult } from '../App';

interface AgentPipelineProps {
  files: {
    denial?: File;
    policy?: File;
    voice?: Blob;
    userLanguage?: string;
    voiceText?: string;
  };
  onComplete: (result: AnalysisResult) => void;
}

interface AgentStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'running' | 'complete' | 'error';
  output?: string;
}

export function AgentPipeline({ files, onComplete }: AgentPipelineProps) {
  const [steps, setSteps] = useState<AgentStep[]>([
    {
      id: 'auditor',
      name: 'Policy Auditor',
      description: 'Extracting relevant policy clauses and conditions',
      status: 'pending',
    },
    {
      id: 'grounding',
      name: 'Clause Grounding',
      description: 'Mapping clauses to source document locations',
      status: 'pending',
    },
    {
      id: 'analyst',
      name: 'Legal Analyst',
      description: 'Comparing denial against policy clauses',
      status: 'pending',
    },
    {
      id: 'confidence',
      name: 'Confidence & Risk',
      description: 'Quantifying appeal success probability',
      status: 'pending',
    },
    {
      id: 'writer',
      name: 'Appeal Writer',
      description: 'Generating professional appeal letter',
      status: 'pending',
    },
    {
      id: 'escalation',
      name: 'Escalation Planner',
      description: 'Planning follow-up actions',
      status: 'pending',
    },
  ]);

  useEffect(() => {
    const execute = async () => {
      try {
        const result = await runAgentPipeline(files, (stepId, status, output) => {
          setSteps(prev =>
            prev.map(step =>
              step.id === stepId ? { ...step, status, output } : step
            )
          );
        });
        
        // Small delay to show final state
        setTimeout(() => {
          onComplete(result);
        }, 1000);
      } catch (error) {
        console.error('Pipeline error:', error);
        setSteps(prev =>
          prev.map(step =>
            step.status === 'running' ? { ...step, status: 'error' } : step
          )
        );
      }
    };

    execute();
  }, [files, onComplete]);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Processing Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 border border-blue-500/30 rounded-full mb-4">
          <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">
          Multi-Agent Analysis in Progress
        </h2>
        <p className="text-slate-400">
          Our AI agents are working together to analyze your case
        </p>
      </div>

      {/* Agent Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`bg-slate-800/50 border rounded-xl p-6 transition-all ${
              step.status === 'running'
                ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                : step.status === 'complete'
                ? 'border-green-500/30'
                : step.status === 'error'
                ? 'border-red-500/30'
                : 'border-slate-700'
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Step Number / Status Icon */}
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                  step.status === 'complete'
                    ? 'bg-green-500/20 border border-green-500/50'
                    : step.status === 'running'
                    ? 'bg-blue-500/20 border border-blue-500/50'
                    : step.status === 'error'
                    ? 'bg-red-500/20 border border-red-500/50'
                    : 'bg-slate-700 border border-slate-600'
                }`}
              >
                {step.status === 'complete' ? (
                  <Check className="w-5 h-5 text-green-400" />
                ) : step.status === 'running' ? (
                  <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                ) : step.status === 'error' ? (
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                ) : (
                  <span className="text-slate-400">{index + 1}</span>
                )}
              </div>

              {/* Step Content */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1">
                  {step.name}
                </h3>
                <p className="text-slate-400 text-sm mb-3">{step.description}</p>

                {/* Output Preview */}
                {step.output && step.status === 'complete' && (
                  <div className="mt-3 p-3 bg-slate-900/50 border border-slate-700 rounded-lg">
                    <p className="text-sm text-slate-300 font-mono">{step.output}</p>
                  </div>
                )}

                {/* Progress Bar for Running State */}
                {step.status === 'running' && (
                  <div className="mt-3 h-1 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse" style={{ width: '60%' }} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Processing Info */}
      <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <p className="text-sm text-blue-300 text-center">
          <strong>Multi-Agent Architecture:</strong> Each agent specializes in a specific task,
          working together to provide thorough analysis and generate your appeal.
        </p>
      </div>
    </div>
  );
}