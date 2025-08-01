"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  UserCheck, 
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  Bell,
  HelpCircle,
  LogOut,
  User,
  ChevronsUpDown,
  MoreHorizontal
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const mainNavigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    name: "Leads",
    href: "/leads",
    icon: Users,
    badge: "4",
  },
  {
    name: "Companies",
    href: "/companies",
    icon: Building2,
    badge: null,
  },
  {
    name: "Contacts",
    href: "/contacts",
    icon: UserCheck,
    badge: null,
  },
  {
    name: "Channels",
    href: "/channels",
    icon: MessageSquare,
    badge: "2",
  },
]

const quickActions = [
  {
    name: "Add Lead",
    icon: Plus,
    action: () => console.log("Add lead"),
  },
  {
    name: "Search",
    icon: Search,
    action: () => console.log("Search"),
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(true)

  return (
    <div className={cn(
      "flex h-full flex-col bg-background border-r transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        {!isCollapsed && (
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <LayoutDashboard className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">CRM System</span>
              <span className="text-xs text-muted-foreground">Sales Hub</span>
            </div>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>



      {/* Quick Actions */}
      {!isCollapsed && (
        <div className="px-4 py-2">
          <Collapsible open={isQuickActionsOpen} onOpenChange={setIsQuickActionsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between h-8 px-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Quick Actions
                </span>
                <ChevronRight className={cn(
                  "h-3 w-3 transition-transform",
                  isQuickActionsOpen && "rotate-90"
                )} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 mt-2">
              {quickActions.map((action) => (
                <Button
                  key={action.name}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start h-8"
                  onClick={action.action}
                >
                  <action.icon className="mr-2 h-3 w-3" />
                  <span className="text-xs">{action.name}</span>
                </Button>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-2">
        <div className="space-y-1">
          {!isCollapsed && (
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2 py-2">
              Navigation
            </p>
          )}
          {mainNavigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start h-9",
                    isActive && "bg-secondary font-medium",
                    isCollapsed && "px-2"
                  )}
                >
                  <item.icon className={cn(
                    "h-4 w-4",
                    isCollapsed ? "" : "mr-3"
                  )} />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 text-left">{item.name}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto h-5 px-1.5 text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </Button>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Notifications */}
      {!isCollapsed && (
        <div className="px-4 py-2 border-t">
          <Button variant="ghost" className="w-full justify-start h-9">
            <Bell className="mr-3 h-4 w-4" />
            <span className="flex-1 text-left">Notifications</span>
            <Badge variant="destructive" className="ml-auto h-5 px-1.5 text-xs">
              3
            </Badge>
          </Button>
        </div>
      )}

      {/* Collapsed state icons */}
      {isCollapsed && (
        <div className="px-2 py-2 space-y-2">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* User Profile */}
      {!isCollapsed && (
        <div className="p-4 border-t">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start h-auto p-2">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/user.jpg" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">Sales Manager</p>
                  </div>
                  <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                Help & Support
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {/* Footer */}
      <div className="border-t p-4">
        {!isCollapsed ? (
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              v1.0.0
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <Button variant="ghost" size="icon" className="h-8 w-8 mx-auto">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}