"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Phone, Bot, Headphones, Zap } from "lucide-react"
import { useCallInterface } from "@/hooks/use-call-interface"
import { cn } from "@/lib/utils"

interface FloatingCallButtonProps {
  className?: string
}

// Quick access agents
const quickAccessAgents = [
  {
    id: 'general-assistant',
    name: 'General Assistant',
    type: 'customer_service' as const,
    avatar: undefined,
    description: 'General purpose AI assistant for CRM help'
  },
  {
    id: 'sales-assistant',
    name: 'Sales Assistant',
    type: 'sdr' as const,
    avatar: undefined,
    description: 'Specialized in sales and lead management'
  },
  {
    id: 'support-assistant',
    name: 'Support Assistant',
    type: 'customer_service' as const,
    avatar: undefined,
    description: 'Customer support and issue resolution'
  }
]

export function FloatingCallButton({ className }: FloatingCallButtonProps) {
  const { openCall, isOpen } = useCallInterface()
  const [isHovered, setIsHovered] = useState(false)

  const handleQuickCall = (agent: typeof quickAccessAgents[0]) => {
    openCall({
      name: agent.name,
      avatar: agent.avatar,
      type: agent.type,
      id: agent.id
    })
  }

  const getAgentIcon = (type: string) => {
    switch (type) {
      case 'sdr': return <Zap className="h-4 w-4" />
      case 'customer_service': return <Headphones className="h-4 w-4" />
      default: return <Bot className="h-4 w-4" />
    }
  }

  if (isOpen) return null // Hide when call interface is open

  return (
    <div className={cn("fixed bottom-6 left-6 z-40", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="lg"
            className={cn(
              "h-14 w-14 rounded-full shadow-lg transition-all duration-300 ease-in-out",
              "bg-primary hover:bg-primary/90 hover:scale-110 hover:shadow-xl",
              "ring-4 ring-primary/20 hover:ring-primary/30",
              isHovered && "scale-110 shadow-xl"
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Phone className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent 
          side="right" 
          align="end" 
          className="w-80 p-2"
          sideOffset={10}
        >
          <DropdownMenuLabel className="flex items-center space-x-2 px-2 py-3">
            <Phone className="h-5 w-5 text-primary" />
            <span className="font-semibold">Call AI Assistant</span>
          </DropdownMenuLabel>
          
          <DropdownMenuSeparator />
          
          {quickAccessAgents.map((agent) => (
            <DropdownMenuItem
              key={agent.id}
              onClick={() => handleQuickCall(agent)}
              className="p-3 cursor-pointer hover:bg-muted/50 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3 w-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={agent.avatar} alt={agent.name} />
                  <AvatarFallback className="bg-primary/10">
                    {getAgentIcon(agent.type)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm truncate">
                      {agent.name}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {agent.type.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 truncate">
                    {agent.description}
                  </p>
                </div>
                
                <Phone className="h-4 w-4 text-muted-foreground" />
              </div>
            </DropdownMenuItem>
          ))}
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem className="p-2 text-center text-xs text-muted-foreground">
            Click any assistant to start a call
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}