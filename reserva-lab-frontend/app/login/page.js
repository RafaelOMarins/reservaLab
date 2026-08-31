"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "../../lib/api";
import { salvarSessao } from "../../lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    try {
      const usuario = await authApi.login(email, senha);
      salvarSessao(usuario);
      router.push("/laboratorios");
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="auth-page">
      <h1>Entrar</h1>
      <p className="subtitle">Acesse sua conta do ReservaLab.</p>

      {erro && <div className="error-box">{erro}</div>}

      <form className="form-box" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <label>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button className="btn" type="submit" disabled={carregando}>
          {carregando ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <p className="auth-switch">
        Não tem conta? <a href="/registro">Registre-se</a>
      </p>
    </div>
  );
}
