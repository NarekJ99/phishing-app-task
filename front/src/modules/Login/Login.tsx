import LoginForm from '@/components/login-form'

const Login = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="container mx-auto flex h-auto w-full max-w-lg flex-col items-center justify-center lg:max-w-none lg:px-0">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
               Login to account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
