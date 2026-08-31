"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getUsuarioLogado, limparSessao } from "../../lib/auth";

export default function Navbar() {
  const [usuario, setUsuario] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    setUsuario(getUsuarioLogado());
  }, [pathname]);

  function handleLogout() {
    limparSessao();
    setUsuario(null);
    window.location.href = "/login";
  }

  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">
        ReservaLab
      </a>
      <div className="navbar-links">
        <a href="/laboratorios">Laboratórios</a>
        {usuario?.role === "ADMIN" && <a href="/usuarios">Usuários</a>}
        <a href="/reservas">Reservas</a>

        {usuario ? (
          <>
            <span className="navbar-user">Olá, {usuario.nome}</span>
            <button className="navbar-logout" onClick={handleLogout}>
              Sair
            </button>
          </>
        ) : (
          <>
            <a href="/login">Entrar</a>
            <a href="/registro">Registrar</a>
          </>
        )}
      </div>
    </nav>
  );
}
