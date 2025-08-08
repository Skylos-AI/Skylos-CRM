"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserMenu } from "@/components/user-menu"
import { useAuth } from "@/hooks/use-auth"

export function SiteHeader() {
  const { isAuthenticated } = useAuth()
  const pathname = usePathname()
  
  // Define CRM routes where the header should be hidden
  const crmRoutes = [
    '/dashboard',
    '/leads',
    '/contacts',
    '/companies',
    '/campaigns',
    '/channels',
    '/agents',
    '/media',
    '/settings',
    '/profile'
  ]
  
  // Check if current path is a CRM route
  const isCrmRoute = crmRoutes.some(route => pathname?.startsWith(route))
  
  // Hide header if user is authenticated and on a CRM route
  if (isAuthenticated && isCrmRoute) {
    return null
  }

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Icons.twitter className="h-5 w-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <ThemeToggle />
            <UserMenu />
          </nav>
        </div>
      </div>
    </header>
  )
}
