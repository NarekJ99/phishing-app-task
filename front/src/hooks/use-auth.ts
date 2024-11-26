import { getToken } from "@/helpers/storage";
import { useEffect, useState } from "react";

const useIsAuth = (): boolean => {
  const [isAuth, setIsAuth] = useState<boolean>(!!getToken() || false);

  useEffect(() => {
    const storedToken = !!getToken();
    setIsAuth(storedToken)
  }, []);
  return isAuth;
};

export default useIsAuth;
