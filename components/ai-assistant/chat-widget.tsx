"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User,
  Minimize2,
  Maximize2,
  Volume2,
  VolumeX,
  Phone,
  PhoneCall
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
  type: 'text' | 'voice'
}

interface ChatWidgetProps {
  className?: string
}

export function ChatWidget({ className }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm your AI assistant. I can help you with CRM tasks, answer questions, and provide insights about your business data. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [isOnCall, setIsOnCall] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputValue),
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()
    
    if (input.includes('lead') || input.includes('pipeline')) {
      return "I can help you manage your leads! You currently have 4 leads in your pipeline. Would you like me to show you the leads that need follow-up, or help you create a new lead?"
    }
    
    if (input.includes('report') || input.includes('analytics')) {
      return "I can generate various reports for you. Your current conversion rate is 25% and you have $153,000 in your pipeline. Would you like a detailed sales report or performance analytics?"
    }
    
    if (input.includes('contact') || input.includes('company')) {
      return "I can help you manage contacts and companies. You have 2 companies and 2 contacts in your system. Would you like me to help you add a new contact or search for existing ones?"
    }
    
    if (input.includes('task') || input.includes('reminder')) {
      return "I can help you manage tasks and set reminders. Would you like me to create a follow-up task for any of your leads or set a reminder for an important meeting?"
    }
    
    return "I understand you're asking about: \"" + userInput + "\". I can help you with lead management, generating reports, managing contacts, scheduling tasks, and answering questions about your CRM data. What specific task would you like assistance with?"
  }

  const handleCallToggle = () => {
    setIsOnCall(!isOnCall)
    // Voice call logic would go here
    if (!isOnCall) {
      console.log("Starting voice call with AI assistant...")
      // Add a system message about the call
      const callMessage: Message = {
        id: Date.now().toString(),
        content: "Voice call started. You can now speak directly with your AI assistant!",
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      }
      setMessages(prev => [...prev, callMessage])
    } else {
      console.log("Ending voice call...")
      const endCallMessage: Message = {
        id: Date.now().toString(),
        content: "Voice call ended. Feel free to continue chatting or start another call anytime!",
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      }
      setMessages(prev => [...prev, endCallMessage])
    }
  }

  const handleSpeakToggle = () => {
    setIsSpeaking(!isSpeaking)
    // Text-to-speech logic would go here
    console.log(isSpeaking ? "Stopping speech" : "Starting speech")
  }

  if (!isOpen) {
    return (
      <div className={cn("fixed bottom-6 right-6 z-50", className)}>
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 relative"
        >
          <MessageCircle className="h-6 w-6" />
          <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full animate-pulse"></div>
        </Button>
      </div>
    )
  }

  return (
    <div className={cn("fixed bottom-6 right-6 z-50", className)}>
      <Card className={cn(
        "w-80 shadow-xl transition-all duration-200",
        isMinimized ? "h-16" : "h-96"
      )}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 py-3 border-b">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground">
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-sm">AI Assistant</CardTitle>
              <div className="flex items-center space-x-1">
                <div className={cn(
                  "h-2 w-2 rounded-full",
                  isOnCall ? "bg-blue-500 animate-pulse" : "bg-green-500"
                )}></div>
                <span className="text-xs text-muted-foreground">
                  {isOnCall ? "On Call" : "Online"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant={isOnCall ? "default" : "ghost"}
              size="sm"
              className={cn(
                "h-8 w-8 p-0",
                isOnCall && "bg-green-500 hover:bg-green-600 text-white"
              )}
              onClick={handleCallToggle}
            >
              {isOnCall ? (
                <PhoneCall className="h-4 w-4" />
              ) : (
                <Phone className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={handleSpeakToggle}
            >
              {isSpeaking ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? (
                <Maximize2 className="h-4 w-4" />
              ) : (
                <Minimize2 className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        {!isMinimized && (
          <>
            <CardContent className="p-0">
              <div className="h-64 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex items-start space-x-2",
                      message.sender === 'user' ? "justify-end" : "justify-start"
                    )}
                  >
                    {message.sender === 'ai' && (
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          <Bot className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        "max-w-[70%] px-3 py-2 text-sm",
                        message.sender === 'user'
                          ? "bg-green-500 text-white rounded-l-lg rounded-tr-lg rounded-br-sm"
                          : "bg-muted rounded-r-lg rounded-tl-lg rounded-bl-sm"
                      )}
                    >
                      <p>{message.content}</p>
                      {message.type === 'voice' && (
                        <Badge variant="secondary" className="mt-1 text-xs">
                          Voice Message
                        </Badge>
                      )}
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                    {message.sender === 'user' && (
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-secondary text-xs">
                          <User className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex items-start space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        <Bot className="h-3 w-3" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg px-3 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
            
            <div className="border-t p-3">
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={isOnCall ? "Currently on call..." : "Type a message..."}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    disabled={isOnCall}
                    className="rounded-full border-muted-foreground/20"
                  />
                </div>
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="h-9 w-9 p-0 rounded-full bg-green-500 hover:bg-green-600"
                  disabled={!inputValue.trim() || isOnCall}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}