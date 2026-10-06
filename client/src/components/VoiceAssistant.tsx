import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SpeechService } from '../services/speech';
import { aiAPI } from '../services/api';
import { Mic, MicOff, VolumeX, Sparkles, X, Bot } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const VoiceAssistant: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    setMessages([
      {
        sender: 'ai',
        text: t('assistant.greeting'),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [i18n.language, t]);

  useEffect(() => {
    return () => {
      SpeechService.stopListening();
      SpeechService.stopSpeaking();
    };
  }, []);

  const handleToggleListening = () => {
    if (isListening) {
      SpeechService.stopListening();
      setIsListening(false);
      if (transcript.trim()) {
        processVoiceCommand(transcript);
      }
    } else {
      setTranscript('');
      setIsListening(true);
      SpeechService.startListening(
        i18n.language,
        (text, isFinal) => {
          setTranscript(text);
          if (isFinal && text.trim()) {
            SpeechService.stopListening();
            setIsListening(false);
            processVoiceCommand(text);
          }
        },
        (_err) => {
          setIsListening(false);
        }
      );
    }
  };

  const processVoiceCommand = async (userText: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { sender: 'user', text: userText, timestamp: timeStr }]);
    setTranscript('');

    const lower = userText.toLowerCase();

    // Voice navigation check
    if (lower.includes('scanner') || lower.includes('scan crop') || lower.includes('leaf') || lower.includes('స్కాన్') || lower.includes('स्कैन')) {
      const response = t('assistant.voiceNavScanner');
      addAiResponse(response);
      setTimeout(() => { setIsOpen(false); navigate('/scanner'); }, 1500);
      return;
    }
    if (lower.includes('dashboard') || lower.includes('home') || lower.includes('డాష్‌బోర్డ్') || lower.includes('डैशबोर्ड')) {
      const response = t('assistant.voiceNavDashboard');
      addAiResponse(response);
      setTimeout(() => { setIsOpen(false); navigate('/dashboard'); }, 1500);
      return;
    }
    if (lower.includes('weather') || lower.includes('rain') || lower.includes('వాతావరణం') || lower.includes('मौसम')) {
      const response = t('assistant.voiceNavWeather');
      addAiResponse(response);
      setTimeout(() => { setIsOpen(false); navigate('/weather'); }, 1500);
      return;
    }
    if (lower.includes('market') || lower.includes('price') || lower.includes('మార్కెట్') || lower.includes('मंडी')) {
      const response = t('assistant.voiceNavMarket');
      addAiResponse(response);
      setTimeout(() => { setIsOpen(false); navigate('/market'); }, 1500);
      return;
    }
    if (lower.includes('read page') || lower.includes('read this') || lower.includes('పేజీ చదవండి') || lower.includes('पेज पढ़ें')) {
      setIsOpen(false);
      SpeechService.readCurrentPage(i18n.language);
      return;
    }

    // Call AI Chat API for agricultural answer
    setIsThinking(true);
    try {
      const res = await aiAPI.chat(userText, [], i18n.language);
      const reply = res.data?.response || res.data?.reply || t('assistant.greeting');
      setIsThinking(false);
      addAiResponse(reply);
    } catch (err) {
      setIsThinking(false);
      const fallbackReply = t('assistant.fallbackReply');
      addAiResponse(fallbackReply);
    }
  };

  const addAiResponse = (replyText: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { sender: 'ai', text: replyText, timestamp: timeStr }]);

    // Speak output in user's selected language
    setIsSpeaking(true);
    SpeechService.speak(replyText, i18n.language, () => {
      setIsSpeaking(false);
    });
  };

  return (
    <>
      {/* Floating Microphone Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-500 text-white shadow-2xl shadow-emerald-600/50 hover:scale-110 active:scale-95 transition-all duration-300"
          title={t('assistant.voiceHeader')}
        >
          <div className="absolute inset-0 rounded-full bg-emerald-400 opacity-40 animate-ping"></div>
          <Mic className="w-8 h-8 relative z-10" />
          <span className="absolute -top-2 -right-2 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500"></span>
          </span>
        </button>
      </div>

      {/* Voice Assistant Modal Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full sm:max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-emerald-100 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="p-4 bg-gradient-to-r from-emerald-700 to-green-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight">{t('assistant.voiceHeader')}</h3>
                  <p className="text-xs text-emerald-100 font-medium">{t('assistant.voiceSubheader')}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  SpeechService.stopListening();
                  SpeechService.stopSpeaking();
                  setIsOpen(false);
                }}
                className="p-2 rounded-full hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conversation Log */}
            <div className="p-4 overflow-y-auto space-y-4 flex-1 min-h-[250px] bg-slate-50 dark:bg-slate-950">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-emerald-600 text-white rounded-br-none'
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-bl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className={`block text-[10px] mt-1.5 font-medium ${msg.sender === 'user' ? 'text-emerald-200 text-right' : 'text-slate-400'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isThinking && (
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 animate-pulse">
                  <Bot className="w-4 h-4" />
                  <span>{t('assistant.thinking')}</span>
                </div>
              )}
            </div>

            {/* Live Transcript Bar */}
            {isListening && (
              <div className="px-4 py-2 bg-amber-50 dark:bg-amber-950/40 border-t border-amber-200 text-amber-900 dark:text-amber-300 text-xs font-semibold flex items-center justify-between">
                <span className="animate-pulse">{t('assistant.listening')} {transcript || t('assistant.speakNow')}</span>
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
              </div>
            )}

            {/* Mic Controls Footer */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
              <button
                onClick={handleToggleListening}
                className={`flex-1 py-3 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                  isListening
                    ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/30 animate-pulse'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30'
                }`}
              >
                {isListening ? (
                  <>
                    <MicOff className="w-5 h-5" />
                    <span>{t('assistant.stopListening')}</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5" />
                    <span>{t('assistant.tapToSpeak')}</span>
                  </>
                )}
              </button>

              {isSpeaking && (
                <button
                  onClick={() => {
                    SpeechService.stopSpeaking();
                    setIsSpeaking(false);
                  }}
                  className="p-3 rounded-2xl bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 hover:bg-amber-200 transition-colors"
                  title={t('assistant.muteSpeech')}
                >
                  <VolumeX className="w-5 h-5" />
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
};
