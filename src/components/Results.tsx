import { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Download, 
  Send, 
  FileText,
  Scale,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Clock,
  Mail,
  Printer,
  Globe,
  Volume2
} from 'lucide-react';
import type { AnalysisResult } from '../App';

interface ResultsProps {
  result: AnalysisResult;
  onStartOver: () => void;
}

export function Results({ result, onStartOver }: ResultsProps) {
  const [showAuditTrail, setShowAuditTrail] = useState(false);
  const [showFullLetter, setShowFullLetter] = useState(false);
  const [sendStatus, setSendStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [sendMethod, setSendMethod] = useState<'email' | 'fax'>('email');

  const handleDownloadPDF = () => {
    // In a real implementation, this would use a PDF generation library
    const blob = new Blob([result.appealLetter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'appeal-letter.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSendAppeal = async () => {
    setSendStatus('sending');
    
    // Simulate sending delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSendStatus('sent');
  };

  const verdictColor = result.verdict === 'invalid' ? 'green' : 'red';
  const verdictIcon = result.verdict === 'invalid' ? CheckCircle2 : XCircle;
  const VerdictIcon = verdictIcon;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Verdict Card */}
      <div className={`bg-slate-800/50 border-2 rounded-2xl p-8 ${
        result.verdict === 'invalid' 
          ? 'border-green-500/50 bg-gradient-to-br from-green-500/5 to-transparent' 
          : 'border-red-500/50 bg-gradient-to-br from-red-500/5 to-transparent'
      }`}>
        <div className="flex items-start gap-6">
          <div className={`p-4 rounded-2xl ${
            result.verdict === 'invalid' ? 'bg-green-500/20' : 'bg-red-500/20'
          }`}>
            <VerdictIcon className={`w-12 h-12 ${
              result.verdict === 'invalid' ? 'text-green-400' : 'text-red-400'
            }`} />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-2">
              {result.verdict === 'invalid' 
                ? 'Denial is INVALID - You Have Strong Grounds to Appeal' 
                : 'Denial Appears Valid'}
            </h2>
            <p className="text-lg text-slate-300">
              {result.verdict === 'invalid'
                ? 'Our analysis found significant contradictions between the denial and your policy terms.'
                : 'The denial appears consistent with policy terms. Consider reviewing your coverage options.'}
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Confidence Score */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <h3 className="font-semibold text-white">Appeal Success Rate</h3>
          </div>
          <div className="text-4xl font-bold text-blue-400 mb-2">
            {(result.confidence * 100).toFixed(0)}%
          </div>
          <p className="text-sm text-slate-400">
            Based on policy contradictions and case strength
          </p>
        </div>

        {/* Risk Level */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <Scale className="w-5 h-5 text-purple-400" />
            <h3 className="font-semibold text-white">Risk Level</h3>
          </div>
          <div className={`text-4xl font-bold mb-2 ${
            result.riskLevel === 'Low' ? 'text-green-400' :
            result.riskLevel === 'Medium' ? 'text-yellow-400' :
            'text-red-400'
          }`}>
            {result.riskLevel}
          </div>
          <p className="text-sm text-slate-400">
            Likelihood of adverse consequences from appeal
          </p>
        </div>

        {/* Violations Found */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            <h3 className="font-semibold text-white">Policy Violations</h3>
          </div>
          <div className="text-4xl font-bold text-orange-400 mb-2">
            {result.violatedClauses.length}
          </div>
          <p className="text-sm text-slate-400">
            Contradictions found in denial reasoning
          </p>
        </div>
      </div>

      {/* Violated Clauses */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-400" />
          Policy Contradictions Identified
        </h3>
        <div className="space-y-4">
          {result.violatedClauses.map((clause, idx) => (
            <div key={idx} className="p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="px-2 py-1 bg-orange-500/20 border border-orange-500/30 rounded text-sm font-mono text-orange-400">
                  §{clause.section}
                </div>
                <div className="flex-1">
                  <p className="text-slate-300 mb-2 italic">"{clause.text}"</p>
                  {clause.page && (
                    <p className="text-xs text-slate-500">Policy page {clause.page}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legal Reasoning */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Scale className="w-5 h-5 text-purple-400" />
          Legal Analysis
        </h3>
        <p className="text-slate-300 leading-relaxed whitespace-pre-line">
          {result.reasoning}
        </p>
      </div>

      {/* Appeal Letter */}
      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-2 border-blue-500/30 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Globe className="w-6 h-6 text-green-400" />
            The Global Defender — Embassy Pattern
          </h2>
        </div>

        <p className="text-slate-300 mb-6">
          We've generated your appeal in <strong>formal English</strong> (for the insurance company) 
          and explained everything in <strong>{result.userLanguage}</strong> (for you).
        </p>

        {/* Split Screen */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Left: English Appeal */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg overflow-hidden">
            <div className="bg-blue-500/20 border-b border-blue-500/30 px-4 py-2">
              <h4 className="font-semibold text-white flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Official Appeal (English)
              </h4>
              <p className="text-xs text-slate-400">Sent to insurance company</p>
            </div>
            <div className={`p-4 font-mono text-xs text-slate-300 overflow-auto ${
              showFullLetter ? 'max-h-[500px]' : 'max-h-[300px]'
            }`}>
              <pre className="whitespace-pre-wrap">{result.appealLetter}</pre>
            </div>
          </div>

          {/* Right: Native Language Explanation */}
          <div className="bg-slate-900/50 border border-green-700 rounded-lg overflow-hidden">
            <div className="bg-green-500/20 border-b border-green-500/30 px-4 py-2 flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-white flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Explanation ({result.userLanguage})
                </h4>
                <p className="text-xs text-slate-400">What this means for you</p>
              </div>
              <button
                onClick={() => {
                  const utterance = new SpeechSynthesisUtterance(result.userExplanationNative);
                  utterance.lang = result.userLanguage === 'Spanish' ? 'es-ES' : 'en-US';
                  speechSynthesis.speak(utterance);
                }}
                className="flex items-center gap-1 px-2 py-1 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 rounded text-xs text-green-300 transition-colors"
              >
                <Volume2 className="w-3 h-3" />
                Read Aloud
              </button>
            </div>
            <div className="p-4 text-sm text-slate-200 overflow-auto max-h-[300px] leading-relaxed">
              <pre className="whitespace-pre-wrap font-sans">{result.userExplanationNative}</pre>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowFullLetter(!showFullLetter)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 rounded-lg transition-colors text-sm mb-4"
        >
          {showFullLetter ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Show Full Documents
            </>
          )}
        </button>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-6">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors font-semibold"
          >
            <Download className="w-4 h-4" />
            Download as PDF
          </button>

          {sendStatus === 'idle' && (
            <div className="flex gap-2">
              <button
                onClick={() => setSendMethod('email')}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                  sendMethod === 'email'
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                }`}
              >
                <Mail className="w-4 h-4" />
                Email
              </button>
              <button
                onClick={() => setSendMethod('fax')}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                  sendMethod === 'fax'
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                }`}
              >
                <Printer className="w-4 h-4" />
                Fax
              </button>
              <button
                onClick={handleSendAppeal}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg transition-all font-semibold shadow-lg shadow-green-500/20"
              >
                <Send className="w-4 h-4" />
                Send Appeal via {sendMethod === 'email' ? 'Email' : 'Fax'}
              </button>
            </div>
          )}

          {sendStatus === 'sending' && (
            <div className="flex items-center gap-3 px-6 py-3 bg-blue-500/20 border border-blue-500/30 rounded-lg">
              <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-blue-300 font-semibold">Sending via {sendMethod}...</span>
            </div>
          )}

          {sendStatus === 'sent' && (
            <div className="flex items-center gap-3 px-6 py-3 bg-green-500/20 border border-green-500/30 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span className="text-green-300 font-semibold">
                Appeal sent successfully via {sendMethod}! Confirmation saved.
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Escalation Plan */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-yellow-400" />
          Automated Escalation Plan
        </h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
              <div>
                <p className="text-white font-semibold mb-1">
                  {result.escalationPlan.level}
                </p>
                <p className="text-slate-400 text-sm">
                  <strong>Trigger:</strong> {result.escalationPlan.triggerCondition}
                </p>
                <p className="text-slate-400 text-sm mt-1">
                  <strong>Next Action:</strong> {result.escalationPlan.nextAction}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Trail */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <button
          onClick={() => setShowAuditTrail(!showAuditTrail)}
          className="w-full flex items-center justify-between text-left"
        >
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-slate-400" />
            Audit Trail ({result.auditTrail.length} steps)
          </h3>
          {showAuditTrail ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {showAuditTrail && (
          <div className="mt-4 space-y-3">
            {result.auditTrail.map((entry, idx) => (
              <div key={idx} className="p-3 bg-slate-900/50 border border-slate-700 rounded-lg">
                <div className="flex items-start justify-between mb-1">
                  <span className="font-semibold text-blue-400">{entry.agent}</span>
                  <span className="text-xs text-slate-500">
                    {new Date(entry.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm text-slate-400">{entry.action}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Start Over Button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={onStartOver}
          className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors font-semibold"
        >
          Analyze Another Case
        </button>
      </div>
    </div>
  );
}