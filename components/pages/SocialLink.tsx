import Link from 'next/link'
import { cn } from '@/lib/utils'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'

export const socialIcons = {
  github: FaGithub,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
  email: HiOutlineMail,
}
interface SocialLinkProps {
  href: string
  label: string
  icon: keyof typeof socialIcons
}

export function SocialLink({ href, label, icon }: SocialLinkProps) {
  const Icon = socialIcons[icon]
  const isExternal = href.startsWith('http') || href.startsWith('mailto:')

  const Comp = isExternal ? 'a' : Link

  return (
    <Comp
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      className={cn(
        "group relative flex items-center justify-center",
        "h-11 w-11 rounded-full border bg-background",
        "text-muted-foreground transition-all duration-300",
        "hover:-translate-y-1 hover:border-blue-600 hover:text-blue-600 hover:shadow-md"
      )}
      aria-label={label}
    >
      <Icon className="h-5 w-5" />

      {/* tooltip */}
      <span className="
        absolute -bottom-7 scale-0 opacity-0
        text-xs text-muted-foreground
        transition-all duration-200
        group-hover:scale-100 group-hover:opacity-100
      ">
        {label}
      </span>
    </Comp>
  )
}