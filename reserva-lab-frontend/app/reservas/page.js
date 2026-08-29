"use client";

import { useEffect, useState } from "react";
import { reservaApi, laboratorioApi } from "../../lib/api";
import { getUsuarioLogado } from "../../lib/auth";

export default function ReservasPage() {
  const [reservas, setReservas] = useState([]);
  const [laboratorios, setLaboratorios] = useState([]);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [logado, setLogado] = useState(null);

  const [laboratorioId, setLaboratorioId] = useState("");
  const [assunto, setAssunto] = useState("");
  const [data, setData] = useState("");
  const [horarioInicio, setHorarioInicio] = useState("");
  const [horarioFim, setHorarioFim] = useState("");

  async function carregar() {
    setCarregando(true);
    try {
      const [rs, labs] = await Promise.all([
        reservaApi.listar(),
        laboratorioApi.listar(),
      ]);
      setReservas(rs || []);
      setLaboratorios(labs || []);
      setErro("");
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    setLogado(getUsuarioLogado());
    carregar();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    if (!logado) {
      setErro("Você precisa estar logado para criar uma reserva.");
      return;
    }

    try {
      await reservaApi.criar({
        laboratorio: { id: Number(laboratorioId) },
        assunto,
        data,
        horarioInicio: `${horarioInicio}:00`,
        horarioFim: `${horarioFim}:00`,
      });
      setAssunto("");
      setData("");
      setHorarioInicio("");
      setHorarioFim("");
      carregar();
    } catch (e) {
      setErro(e.message);
    }
  }

  async function handleDeletar(id) {
    if (!confirm("Cancelar esta reserva?")) return;
    try {
      await reservaApi.deletar(id);
      carregar();
    } catch (e) {
      setErro(e.message);
    }
  }

  const souAdmin = logado?.role === "ADMIN";

  return (
    <div>
      <h1>Reservas</h1>
      <p className="subtitle">Agende o uso dos laboratórios por horário.</p>

      {erro && <div className="error-box">{erro}</div>}

      {!logado ? (
        <div className="form-box">
          Você precisa <a href="/login">entrar</a> para criar uma reserva.
        </div>
      ) : (
        <form className="form-box" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Professor (você)</label>
            <input value={logado.nome} disabled />
          </div>
          <div className="form-row">
            <label>Laboratório</label>
            <select
              value={laboratorioId}
              onChange={(e) => setLaboratorioId(e.target.value)}
              required
            >
              <option value="">Selecione...</option>
              {laboratorios.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <label>Assunto</label>
            <input
              value={assunto}
              onChange={(e) => setAssunto(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <label>Data</label>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <label>Horário início</label>
            <input
              type="time"
              value={horarioInicio}
              onChange={(e) => setHorarioInicio(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <label>Horário fim</label>
            <input
              type="time"
              value={horarioFim}
              onChange={(e) => setHorarioFim(e.target.value)}
              required
            />
          </div>
          <button className="btn" type="submit">
            Criar reserva
          </button>
        </form>
      )}

      {carregando ? (
        <p>Carregando...</p>
      ) : reservas.length === 0 ? (
        <p className="empty">Nenhuma reserva cadastrada ainda.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Professor</th>
              <th>Laboratório</th>
              <th>Assunto</th>
              <th>Data</th>
              <th>Horário</th>
              {souAdmin && <th></th>}
            </tr>
          </thead>
          <tbody>
            {reservas.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.professor?.nome ?? "-"}</td>
                <td>{r.laboratorio?.nome ?? "-"}</td>
                <td>{r.assunto}</td>
                <td>{r.data}</td>
                <td>
                  {r.horarioInicio} - {r.horarioFim}
                </td>
                {souAdmin && (
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeletar(r.id)}
                    >
                      Cancelar
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!souAdmin && logado && (
        <p className="subtitle" style={{ marginTop: 16 }}>
          Apenas administradores podem cancelar reservas.
        </p>
      )}
    </div>
  );
}
