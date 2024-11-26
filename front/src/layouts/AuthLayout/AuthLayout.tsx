import { PublicNavbar } from "@/components/navbar"
import useIsAuth from "@/hooks/use-auth"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

const AuthLayout = () => {
  const navigate = useNavigate();
  const isAuth = useIsAuth();

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <header className="flex h-16 items-center px-4">
        <PublicNavbar />
      </header>
      <main className="flex h-screen items-center justify-center">
        <div className="container mx-auto flex h-auto w-full max-w-lg flex-col items-center justify-center lg:max-w-none lg:px-0">
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default AuthLayout