import { cn } from "@/lib/utils"

export const Navbar = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <a
        href="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Home
      </a>
      <a
        href="/send"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Send Email
      </a>
    </nav>
  )
}

export const PublicNavbar = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <a
        href="/auth/login"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Login
      </a>
      <a
        href="/auth/register"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Register
      </a>
    </nav>
  )
}

