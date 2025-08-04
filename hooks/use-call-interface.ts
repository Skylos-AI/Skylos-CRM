"use client"

import { create } from 'zustand'

interface CallInterfaceState {
  isOpen: boolean
  agentName: string
  agentAvatar?: string
  agentType: 'sdr' | 'customer_service' | 'custom'
  agentId?: string
  
  // Actions
  openCall: (agent: {
    name: string
    avatar?: string
    type: 'sdr' | 'customer_service' | 'custom'
    id?: string
  }) => void
  closeCall: () => void
  setAgent: (agent: {
    name: string
    avatar?: string
    type: 'sdr' | 'customer_service' | 'custom'
    id?: string
  }) => void
}

export const useCallInterface = create<CallInterfaceState>((set) => ({
  isOpen: false,
  agentName: 'AI Assistant',
  agentType: 'customer_service',
  
  openCall: (agent) => set({
    isOpen: true,
    agentName: agent.name,
    agentAvatar: agent.avatar,
    agentType: agent.type,
    agentId: agent.id
  }),
  
  closeCall: () => set({
    isOpen: false
  }),
  
  setAgent: (agent) => set({
    agentName: agent.name,
    agentAvatar: agent.avatar,
    agentType: agent.type,
    agentId: agent.id
  })
}))