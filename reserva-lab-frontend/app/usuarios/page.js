"use client";

import { useEffect, useState } from "react";
import { usuarioApi } from "../../lib/api";
import { getUsuarioLogado } from "../../lib/auth";

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [logado, setLogado] = useState(null);
  const [verificando, setVerificando] = useState(true);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [role, setRole] = useState("PROFESSOR");

  async function carregar() {
    setCarregando(true);
    try {
      const dados = await usuarioApi.listar();
      setUsuarios(dados || []);
      setErro("");
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    const usuarioLogado = getUsuarioLogado();
    setLogado(usuarioLogado);
    setVerificando(false);
    if (usuarioLogado?.role === "ADMIN") {
      carregar();
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    try {
      await usuarioApi.criar({ nome, email, senha, role });
      setNome("");
      setEmail("");
      setSenha("");
      setRole("PROFESSOR");
      carregar();
    } catch (e) {
      setErro(e.message);
    }
  }

  async function handleDeletar(id) {
    if (!confirm("Deletar este usuário?")) return;
    try {
      await usuarioApi.deletar(id);
      carregar();
    } catch (e) {
      setErro(e.message);
    }
  }

  if (verificando) {
    return <p>Carregando...</p>;
  }

  const souAdmin = logado?.role === "ADMIN";

  if (!souAdmin) {
    return (
      <div>
        <h1>Usuários</h1>
        <div className="error-box">
          {logado
            ? "Apenas administradores podem visualizar esta página."
            : "Você precisa entrar como administrador para acessar esta página."}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Usuários</h1>
      <p className="subtitle">Cadastre professores e administradores.</p>

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
        <button className="btn" type="submit">
          Criar usuário
        </button>
      </form>

      {carregando ? (
        <p>Carregando...</p>
      ) : usuarios.length === 0 ? (
        <p className="empty">Nenhum usuário cadastrado ainda.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Papel</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nome}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeletar(u.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
