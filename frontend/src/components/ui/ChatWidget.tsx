"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, RotateCcw } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Mode = "ENQUIRY" | "BOOKING" | "TESTIMONY";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMode, setActiveMode] = useState<Mode | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, activeMode]);

  const handleSend = async (userMsgText: string, modeOverride?: Mode) => {
    if (!userMsgText.trim() || isLoading) return;

    const currentMode = modeOverride || activeMode;
    if (!currentMode) return;

    const newMessages: Message[] = [...messages, { role: "user", content: userMsgText }];
    setMessages(newMessages);
    setIsLoading(true);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, mode: currentMode }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch response");
      }

      // Add a placeholder message for the assistant stream
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (reader && !done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const msgs = [...prev];
            const lastMsg = msgs[msgs.length - 1];
            msgs[msgs.length - 1] = { ...lastMsg, content: lastMsg.content + chunk };
            return msgs;
          });
        }
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I'm sorry, I encountered an error. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const startMode = (mode: Mode) => {
    setActiveMode(mode);
    let initialMessage = "";
    if (mode === "ENQUIRY") initialMessage = "I have a general enquiry.";
    if (mode === "BOOKING") initialMessage = "I want to book a consultation.";
    if (mode === "TESTIMONY") initialMessage = "I want to share my testimony.";
    
    // Auto-send the first message to trigger the Backend response
    handleSend(initialMessage, mode);
  };

  const handleReset = () => {
    setActiveMode(null);
    setMessages([]);
    setInput("");
    setIsLoading(false);
  };

  const renderMessageContent = (msg: Message, isLatest: boolean) => {
    if (msg.role === "user") return msg.content;

    let content = msg.content;
    let whatsappLink = null;

    // Detect whatsapp block
    const whatsappMatch = content.match(/\[WHATSAPP_MESSAGE\]([\s\S]*?)\[\/WHATSAPP_MESSAGE\]/);
    if (whatsappMatch) {
      const messageContent = whatsappMatch[1].trim();
      content = content.replace(whatsappMatch[0], "").trim();
      
      const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918452860941";
      whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageContent)}`;
    }

    const isTestimonyConfirm = activeMode === "TESTIMONY" && isLatest && 
      (content.includes("Does this feel right") || content.includes("would you like to change anything"));

    return (
      <div className="flex flex-col gap-2">
        {content && (
          <div className="prose prose-sm prose-rose max-w-none 
            prose-p:leading-snug prose-p:my-1.5
            prose-a:inline-flex prose-a:items-center prose-a:justify-center prose-a:w-full prose-a:bg-brand-gold/20 prose-a:text-brand-espresso prose-a:font-medium prose-a:no-underline prose-a:py-2 prose-a:px-3 prose-a:rounded-lg prose-a:mt-2"
          >
            <ReactMarkdown
              components={{
                a: ({ node, ...props }) => (
                  <a target="_blank" rel="noopener noreferrer" {...props} />
                )
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}

        {whatsappLink && (
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 w-full bg-brand-rose text-white font-bold text-sm py-3 px-4 rounded-xl shadow-md hover:bg-brand-rose/90 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all group"
          >
            <svg 
              className="w-5 h-5 group-hover:scale-110 transition-transform" 
              fill="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            Send WhatsApp Message
          </a>
        )}

        {isTestimonyConfirm && !whatsappLink && !isLoading && (
          <div className="flex gap-2 mt-2">
            <button 
              onClick={() => handleSend("Looks good")}
              className="flex-1 bg-brand-rose text-white text-xs font-medium py-2 rounded-lg hover:bg-brand-rose/90 transition-colors"
            >
              Looks Good
            </button>
            <button 
              onClick={() => {
                setInput("Please make changes: ");
                // Focus is handled naturally by typing
              }}
              className="flex-1 bg-white text-brand-espresso border border-brand-rose/20 text-xs font-medium py-2 rounded-lg hover:bg-brand-cream transition-colors"
            >
              Edit
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-3xl shadow-xl border border-brand-rose/20 w-80 sm:w-96 h-[550px] max-h-[85vh] flex flex-col mb-4 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-rose to-[#c08b8b] text-white p-4 flex justify-between items-center shadow-sm shrink-0">
              <div>
                <h3 className="font-serif font-bold text-lg leading-tight">Dr. Farheen's Assistant</h3>
                <p className="text-xs text-white/80">Online</p>
              </div>
              <div className="flex gap-1">
                {activeMode && (
                  <button
                    onClick={handleReset}
                    className="hover:bg-white/20 p-1.5 rounded-full transition-colors flex items-center justify-center text-white/90 hover:text-white"
                    title="Reset Conversation"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/20 p-1.5 rounded-full transition-colors flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col bg-[#faf8f5] relative">
              {!activeMode ? (
                <div className="m-auto flex flex-col items-center justify-center gap-4 w-full">
                  <div className="text-center mb-2">
                    <p className="text-brand-espresso font-medium">How can I help you today?</p>
                    <p className="text-sm text-brand-muted mt-1">Select an option below to start.</p>
                  </div>
                  <button 
                    onClick={() => startMode("ENQUIRY")}
                    className="w-full bg-white border border-brand-rose/20 hover:border-brand-rose/60 text-brand-espresso py-3 px-4 rounded-xl shadow-sm transition-all hover:shadow text-sm font-medium flex items-center justify-between group"
                  >
                    General Enquiry <span className="text-brand-rose group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                  <button 
                    onClick={() => startMode("BOOKING")}
                    className="w-full bg-white border border-brand-rose/20 hover:border-brand-rose/60 text-brand-espresso py-3 px-4 rounded-xl shadow-sm transition-all hover:shadow text-sm font-medium flex items-center justify-between group"
                  >
                    Book Consultation <span className="text-brand-rose group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                  <button 
                    onClick={() => startMode("TESTIMONY")}
                    className="w-full bg-white border border-brand-rose/20 hover:border-brand-rose/60 text-brand-espresso py-3 px-4 rounded-xl shadow-sm transition-all hover:shadow text-sm font-medium flex items-center justify-between group"
                  >
                    File a Testimony <span className="text-brand-rose group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4 pb-2">
                  {messages.map((msg, idx) => {
                    const isLatest = idx === messages.length - 1;
                    return (
                      <div
                        key={idx}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl p-3 text-sm shadow-sm ${
                            msg.role === "user"
                              ? "bg-brand-rose text-white rounded-br-none"
                              : "bg-white text-brand-espresso border border-brand-rose/10 rounded-bl-none overflow-hidden"
                          }`}
                        >
                          {renderMessageContent(msg, isLatest)}
                        </div>
                      </div>
                    );
                  })}
                  
                  {isLoading && messages[messages.length - 1]?.role === "user" && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-brand-rose/10 text-brand-espresso rounded-2xl rounded-bl-none p-3 shadow-sm flex gap-1 items-center">
                        <span className="w-1.5 h-1.5 bg-brand-rose/60 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-1.5 h-1.5 bg-brand-rose/60 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-1.5 h-1.5 bg-brand-rose/60 rounded-full animate-bounce"></span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input Area (Only show if activeMode) */}
            {activeMode && (
              <div className="p-3 bg-white border-t border-brand-rose/10 shrink-0">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend(input);
                  }} 
                  className="flex gap-2 items-center"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    disabled={isLoading}
                    className="flex-1 bg-brand-cream/50 text-brand-espresso border border-brand-rose/20 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-brand-rose/60 focus:ring-1 focus:ring-brand-rose/60 transition-all placeholder:text-brand-muted"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="bg-brand-rose hover:bg-brand-rose/90 text-white p-2.5 rounded-full flex-shrink-0 transition-all disabled:opacity-50 disabled:hover:bg-brand-rose shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-brand-rose text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg border border-white/20 z-50 hover:shadow-xl transition-shadow"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>
    </div>
  );
}
