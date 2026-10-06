import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { aiAPI } from '../services/api';
import { SpeechService } from '../services/speech';
import { Bot, Send, Mic, MicOff, Volume2, VolumeX, Sparkles, User } from 'lucide-react';

interface ChatItem {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AiAssistant: React.FC = () => {
  const { t, i18n } = useTranslation();
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  useEffect(() => {
    setMessages([
      {
        id: '1',
        sender: 'ai',
        text: t('assistant.greeting'),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [i18n.language, t]);

  const quickPrompts = (t('assistant.quickPrompts', { returnObjects: true }) as string[]) || [
    'Best fertilizer schedule for Paddy',
    'How to prevent tomato late blight?',
    'What is PM-KISAN eligibility?',
    'Organic pesticide for whiteflies'
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (messageToSend?: string) => {
    const text = messageToSend || inputMessage;
    if (!text.trim()) return;

    const userMsgId = Date.now().toString();
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMsg: ChatItem = { id: userMsgId, sender: 'user', text, timestamp: timeStr };
    setMessages(prev => [...prev, newMsg]);
    if (!messageToSend) setInputMessage('');

    setLoading(true);

    try {
      const history = messages.map(m => ({ role: m.sender === 'user' ? 'user' : 'model', parts: m.text }));
      const res = await aiAPI.chat(text, history, i18n.language);
      const aiReply = res.data?.response || res.data?.reply || t('assistant.greeting');

      const aiMsgId = (Date.now() + 1).toString();
      setMessages(prev => [
        ...prev,
        { id: aiMsgId, sender: 'ai', text: aiReply, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
    } catch (err) {
      console.warn('AI Chat Error:', err);
      const fallbackReply = t('assistant.fallbackReply');
      setMessages(prev => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: 'ai', text: fallbackReply, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      SpeechService.stopListening();
      setIsListening(false);
    } else {
      setIsListening(true);
      SpeechService.startListening(
        i18n.language,
        (text, isFinal) => {
          setInputMessage(text);
          if (isFinal && text.trim()) {
            SpeechService.stopListening();
            setIsListening(false);
            handleSend(text);
          }
        },
        (_err) => setIsListening(false)
      );
    }
  };

  const handleSpeakMessage = (msg: ChatItem) => {
    if (speakingId === msg.id) {
      SpeechService.stopSpeaking();
      setSpeakingId(null);
    } else {
      setSpeakingId(msg.id);
      SpeechService.speak(msg.text, i18n.language, () => setSpeakingId(null));
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/60 border border-blue-300 dark:border-blue-800 text-blue-800 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
          <Bot className="w-4 h-4" />
          <span>{t('hero.badge')}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100">
          {t('assistant.title')}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {t('assistant.subtitle')}
        </p>
      </div>

      {/* Quick Prompts Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {Array.isArray(quickPrompts) && quickPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSend(prompt)}
            className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:border-emerald-500 hover:text-emerald-600 transition-all whitespace-nowrap shadow-sm shrink-0"
          >
            💡 {prompt}
          </button>
        ))}
      </div>

      {/* Chat Window */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col h-[550px]">
        
        {/* Chat Messages Log */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 bg-slate-50/50 dark:bg-slate-950/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-3 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center text-white shrink-0 font-bold shadow-md ${
                  msg.sender === 'user' ? 'bg-emerald-600' : 'bg-gradient-to-tr from-blue-600 to-indigo-500'
                }`}>
                  {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>

                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm relative ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-tr-none'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  
                  <div className="flex items-center justify-between gap-4 mt-2 pt-2 border-t border-black/5 dark:border-white/5 text-[10px]">
                    <span className={msg.sender === 'user' ? 'text-emerald-200' : 'text-slate-400'}>
                      {msg.timestamp}
                    </span>

                    {msg.sender === 'ai' && (
                      <button
                        onClick={() => handleSpeakMessage(msg)}
                        className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1"
                      >
                        {speakingId === msg.id ? <VolumeX className="w-3.5 h-3.5 text-rose-500" /> : <Volume2 className="w-3.5 h-3.5" />}
                        <span>{speakingId === msg.id ? t('accessibility.stopReading') : t('accessibility.readPage')}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 animate-pulse p-2">
              <Sparkles className="w-4 h-4" />
              <span>{t('assistant.thinking')}</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <button
            onClick={handleMicClick}
            className={`p-3 rounded-2xl transition-all shadow-sm ${
              isListening
                ? 'bg-rose-600 text-white animate-pulse'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-100'
            }`}
            title={isListening ? t('assistant.stopListening') : t('assistant.tapToSpeak')}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t('assistant.inputPlaceholder')}
            className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:border-emerald-500"
          />

          <button
            onClick={() => handleSend()}
            disabled={!inputMessage.trim() || loading}
            className="p-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-600/30 transition-all disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

      </div>

    </div>
  );
};
