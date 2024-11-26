import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Icons } from './icons'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
import { login } from '@/services/authService'
import { setToken } from '@/helpers/storage'

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> { }

const LoginForm = ({ className, ...props }: LoginFormProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()
  const { toast } = useToast()

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    try {
      if (!email || !password) return
      setIsLoading(true)
      const response = await login({ email, password })
      if (response && response.token) {
        setToken(response.token)
        navigate("/")
      } else {
        navigate('/auth/register')
      }
      setIsLoading(false)
    } catch (error) {
      console.log("Login Error:", error)
    }
  }

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={handleEmail}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Enter your password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              onChange={handlePassword}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or Sign Up
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}
        onClick={() => {
          navigate('/auth/register')
        }}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.auth className="mr-2 h-4 w-4" />
        )}{" "}
        Sign Up
      </Button>
    </div>
  )
}

export default LoginForm