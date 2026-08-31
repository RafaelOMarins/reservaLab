"use client";

import { useEffect, useState } from "react";
import { laboratorioApi } from "../../lib/api";
import { getUsuarioLogado } from "../../lib/auth";

export default function LaboratoriosPage() {
  const [laboratorios, setLaboratorios] = useState([]);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [souAdmin, setSouAdmin] = useState(false);

  const [nome, setNome] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [localizacao, setLocalizacao] = useState("");

  async function carregar() {
    setCarregando(true);
    try {
      const dados = await laboratorioApi.listar();
      setLaboratorios(dados || []);
      setErro("");
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    const logado = getUsuarioLogado();
    setSouAdmin(logado?.role === "ADMIN");
    carregar();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    try {
      await laboratorioApi.criar({
        nome,
        capacidade: Number(capacidade),
        localizacao,
      });
      setNome("");
      setCapacidade("");
      setLocalizacao("");
      carregar();
    } catch (e) {
      setErro(e.message);
    }
  }

  async function handleDeletar(id) {
    if (!confirm("Deletar este laboratório?")) return;
    try {
      await laboratorioApi.deletar(id);
      carregar();
    } catch (e) {
      setErro(e.message);
    }
  }

  return (
    <div>
      <h1>Laboratórios</h1>
      <p className="subtitle">Cadastre e gerencie os laboratórios disponíveis.</p>

      {erro && <div className="error-box">{erro}</div>}

      {souAdmin && (
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
            <label>Capacidade</label>
            <input
              type="number"
              value={capacidade}
              onChange={(e) => setCapacidade(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <label>Localização</label>
            <input
              value={localizacao}
              onChange={(e) => setLocalizacao(e.target.value)}
            />
          </div>
          <button className="btn" type="submit">
            Criar laboratório
          </button>
        </form>
      )}

      {carregando ? (
        <p>Carregando...</p>
      ) : laboratorios.length === 0 ? (
        <p className="empty">Nenhum laboratório cadastrado ainda.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Capacidade</th>
              <th>Localização</th>
              {souAdmin && <th></th>}
            </tr>
          </thead>
          <tbody>
            {laboratorios.map((lab) => (
              <tr key={lab.id}>
                <td>{lab.id}</td>
                <td>{lab.nome}</td>
                <td>{lab.capacidade}</td>
                <td>{lab.localizacao}</td>
                {souAdmin && (
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeletar(lab.id)}
                    >
                      Excluir
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!souAdmin && (
        <p className="subtitle" style={{ marginTop: 16 }}>
          Apenas administradores podem criar ou excluir laboratórios.
        </p>
      )}
    </div>
  );
}
