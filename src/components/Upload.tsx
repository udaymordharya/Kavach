import { useState, useRef } from 'react';
import { Upload as UploadIcon, FileText, File, Mic, X, CheckCircle2, AlertCircle, Globe } from 'lucide-react';

interface UploadProps {
  onComplete: (files: { 
    denial?: File; 
    policy?: File; 
    voice?: Blob;
    userLanguage?: string;
    voiceText?: string;
  }) => void;
}

export function Upload({ onComplete }: UploadProps) {
  const [denialFile, setDenialFile] = useState<File | null>(null);
  const [policyFile, setPolicyFile] = useState<File | null>(null);
  const [voiceBlob, setVoiceBlob] = useState<Blob | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [userLanguage, setUserLanguage] = useState('English');
  const [voiceText, setVoiceText] = useState('');
  
  const denialInputRef = useRef<HTMLInputElement>(null);
  const policyInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const languages = [
    { code: 'English', name: 'English', flag: '🇺🇸' },
    { code: 'Spanish', name: 'Español', flag: '🇪🇸' },
    { code: 'Hindi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'Mandarin', name: '中文', flag: '🇨🇳' },
    { code: 'French', name: 'Français', flag: '🇫🇷' },
    { code: 'Arabic', name: 'العربية', flag: '🇸🇦' },
    { code: 'Portuguese', name: 'Português', flag: '🇧🇷' },
    { code: 'Russian', name: 'Русский', flag: '🇷🇺' },
    { code: 'Japanese', name: '日本語', flag: '🇯🇵' },
    { code: 'Korean', name: '한국어', flag: '🇰🇷' },
  ];

  const handleDenialUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDenialFile(e.target.files[0]);
    }
  };

  const handlePolicyUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPolicyFile(e.target.files[0]);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setVoiceBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert('Could not access microphone. Voice input will be skipped.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    }
  };

  const handleSubmit = () => {
    if (!denialFile || !policyFile) {
      alert('Please upload both denial letter and policy document');
      return;
    }

    onComplete({
      denial: denialFile,
      policy: policyFile,
      voice: voiceBlob || undefined,
      userLanguage,
      voiceText,
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          Fight Back Against Unfair Denials
        </h2>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
          Upload your denial letter and policy document. Our AI agents will analyze them,
          find contradictions, and generate a professional appeal letter.
        </p>
      </div>

      {/* Upload Cards */}
      <div className="grid gap-6 mb-6">
        {/* Denial Letter Upload */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white mb-2">
                Denial Letter
                <span className="text-red-400 ml-1">*</span>
              </h3>
              <p className="text-slate-400 mb-4">
                Upload the letter denying your claim (PDF, PNG, JPG)
              </p>
              
              <input
                type="file"
                ref={denialInputRef}
                onChange={handleDenialUpload}
                accept=".pdf,.png,.jpg,.jpeg"
                className="hidden"
              />
              
              {!denialFile ? (
                <button
                  onClick={() => denialInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  <UploadIcon className="w-4 h-4" />
                  Choose File
                </button>
              ) : (
                <div className="flex items-center gap-3 px-4 py-3 bg-slate-700/50 rounded-lg">
                  <FileText className="w-5 h-5 text-green-400" />
                  <span className="flex-1 text-white truncate">{denialFile.name}</span>
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <button
                    onClick={() => setDenialFile(null)}
                    className="p-1 hover:bg-slate-600 rounded transition-colors"
                  >
                    <X className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Policy Document Upload */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <File className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white mb-2">
                Policy Document
                <span className="text-red-400 ml-1">*</span>
              </h3>
              <p className="text-slate-400 mb-4">
                Upload your full insurance/warranty policy (PDF)
              </p>
              
              <input
                type="file"
                ref={policyInputRef}
                onChange={handlePolicyUpload}
                accept=".pdf"
                className="hidden"
              />
              
              {!policyFile ? (
                <button
                  onClick={() => policyInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  <UploadIcon className="w-4 h-4" />
                  Choose File
                </button>
              ) : (
                <div className="flex items-center gap-3 px-4 py-3 bg-slate-700/50 rounded-lg">
                  <FileText className="w-5 h-5 text-green-400" />
                  <span className="flex-1 text-white truncate">{policyFile.name}</span>
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <button
                    onClick={() => setPolicyFile(null)}
                    className="p-1 hover:bg-slate-600 rounded transition-colors"
                  >
                    <X className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Voice Input (Optional) */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <Mic className="w-6 h-6 text-purple-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white mb-2">
                Your Story
                <span className="text-slate-500 ml-2 text-sm">(Optional)</span>
              </h3>
              <p className="text-slate-400 mb-4">
                Explain in your own words why the denial is unfair (type or record)
              </p>
              
              {!voiceBlob && (
                <textarea
                  value={voiceText}
                  onChange={(e) => setVoiceText(e.target.value)}
                  placeholder={`Type your explanation here in ${userLanguage}...`}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 mb-3 min-h-[100px] resize-y"
                />
              )}
              
              {!voiceBlob && !voiceText && (
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isRecording
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-slate-700 hover:bg-slate-600 text-white'
                  }`}
                >
                  <Mic className="w-4 h-4" />
                  {isRecording ? `Recording... ${formatTime(recordingTime)}` : 'Or Record Voice Instead'}
                </button>
              )}
              
              {voiceBlob && (
                <div className="flex items-center gap-3 px-4 py-3 bg-slate-700/50 rounded-lg">
                  <Mic className="w-5 h-5 text-green-400" />
                  <span className="flex-1 text-white">Voice recording ({formatTime(recordingTime)})</span>
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <button
                    onClick={() => setVoiceBlob(null)}
                    className="p-1 hover:bg-slate-600 rounded transition-colors"
                  >
                    <X className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Language Selection */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <Globe className="w-6 h-6 text-green-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white mb-2">
                Your Language
              </h3>
              <p className="text-slate-400 mb-4">
                Select your native language - we'll explain everything in your language
              </p>
              
              <select
                value={userLanguage}
                onChange={(e) => setUserLanguage(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-lg text-white transition-colors cursor-pointer"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={!denialFile || !policyFile}
          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all text-lg shadow-lg shadow-blue-500/20"
        >
          Analyze & Fight Denial
        </button>
      </div>
    </div>
  );
}