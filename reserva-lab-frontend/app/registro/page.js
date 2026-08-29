"use client";

import { useState } from "react";
import { authApi } from "../../lib/api";
import { salvarSessao } from "../../lib/auth";

export default function RegistroPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [role, setRole] = useState("PROFESSOR");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    try {
      await authApi.registrar({ nome, email, senha, role });
      const usuario = await authApi.login(email, senha);
      salvarSessao(usuario);
      window.location.href = "/";
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="auth-page">
      <h1>Criar conta</h1>
      <p className="subtitle">Registre-se para reservar laboratórios.</p>

      {erro && <div className="error-box">{erro}</div>}

      <form className="form-box" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Nome</label>
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
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
        <div className="form-row">
          <label>Papel</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="PROFESSOR">Professor</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <button className="btn" type="submit" disabled={carregando}>
          {carregando ? "Criando conta..." : "Criar conta"}
        </button>
      </form>

      <p className="auth-switch">
        Já tem conta? <a href="/login">Entrar</a>
      </p>
    </div>
  );
}
