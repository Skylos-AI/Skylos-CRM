"use client"

import { CallInterface } from "./call-interface"
import { useCallInterface } from "@/hooks/use-call-interface"

export function CallInterfaceProvider() {
  const { isOpen, closeCall, agentName, agentAvatar, agentType } = useCallInterface()

  return (
    <CallInterface
      isOpen={isOpen}
      onClose={closeCall}
      agentName={agentName}
      agentAvatar={agentAvatar}
      agentType={agentType}
    />
  )
}