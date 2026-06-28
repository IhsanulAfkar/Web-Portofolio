'use client'

import Link from 'next/link'
import { Menu } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import LanguageSwitcher from './custom/language-switcher'

const menus = [
  {
    title: 'About Me',
    href: '#about',
  },
  {
    title: 'Works',
    href: '#works',
  },
  {
    title: 'Projects',
    href: '#projects',
  },
  {
    title: 'Playground',
    href: '#playground',
  },
]

export function Navbar1() {
  return (
    <header className="
sticky top-0
z-50
border-b
bg-white/70
backdrop-blur-xl
supports-[backdrop-filter]:bg-white/60
">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Logo */}

        <Link
          href="/"
          className="text-lg font-bold tracking-tight transition-opacity hover:opacity-70"
        >
          Ihsanul Afkar's Portofolio
        </Link>

        {/* Desktop */}

        <nav className="hidden items-center gap-8 lg:flex">
          {menus.map((menu) => (
            <Link
              key={menu.title}
              href={menu.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {menu.title}
            </Link>
          ))}
        </nav>

        {/* Right */}

        <div className="flex items-center gap-2">
          <LanguageSwitcher />

          {/* Mobile */}

          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>Ihsanul Afkar</SheetTitle>
              </SheetHeader>

              <nav className="mt-8 flex flex-col gap-2">
                {menus.map((menu) => (
                  <Link
                    key={menu.title}
                    href={menu.href}
                    className="rounded-lg px-4 py-3 text-base font-medium transition-colors hover:bg-muted"
                  >
                    {menu.title}
                  </Link>
                ))}
              </nav>

              <div className="mt-8 border-t pt-6">
                <LanguageSwitcher />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}