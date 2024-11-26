import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { clearToken } from "@/helpers/storage"
import useIsAuth from "@/hooks/use-auth"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

const MainLayout = () => {
  const isAuth = useIsAuth();
  const navigate = useNavigate();
  
  const handleLogut = () => {
    clearToken()
    navigate("/auth/login")
  }

  useEffect(() => {
    if (!isAuth) {
      navigate("/auth/login");
    }
  }, [navigate]);

  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <header className="flex h-16 items-center px-4">
          <Navbar className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Button onClick={handleLogut} >
                Logout
            </Button>
          </div>
        </header>
      </div>
      <Outlet />
    </div>
  )
}

export default MainLayout