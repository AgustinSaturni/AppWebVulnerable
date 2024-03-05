import { ReactNode, useEffect } from "react";
import { getCookie } from "../../services";
import { User } from "@seg-apps-web/api-interfaces";
import { useNavigate } from "react-router-dom";

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  const user = getCookie<User>("user");
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) navigate('/')
  }, [user])

  if (!user) return null


  return (
    <div style={{ backgroundColor: "#f6f6f6", display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <nav className="navbar">
        <img
          src="../assets/Medicare-sin-fondo.png"
          alt="Logo"
          className="logo"
        />

        <a href="/">
          Log out
        </a>
      </nav>

      <div className="content">
        <div className="sidebar">
          <a href="/home">Inicio</a>
          <a href={`/myHistory/${user.id}`}>Mi historial</a>
        </div>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
