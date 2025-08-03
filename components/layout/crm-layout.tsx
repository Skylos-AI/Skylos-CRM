"use client"

import { Sidebar } from "./sidebar"
import { CrmHeader } from "./crm-header"
import { PageTransition } from "@/components/shared/page-transition"
import { ChatWidget } from "@/components/ai-assistant/chat-widget"

interface CrmLayoutProps {
  children: React.ReactNode
}

export function CrmLayout({ children }: CrmLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <CrmHeader />
        <main className="flex-1 overflow-auto p-6 bg-light-bg-primary dark:bg-dark-bg-primary">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
      </div>
      <ChatWidget />
    </div>
  )
}