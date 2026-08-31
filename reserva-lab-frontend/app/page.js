export default function Home() {
  return (
    <div>
      <h1>ReservaLab</h1>
      <p className="subtitle">
        Sistema de reserva de laboratórios de informática para fins didáticos.
      </p>

      <div className="card-grid">
        <a href="/laboratorios" className="card-link">
          Laboratórios
        </a>
        <a href="/usuarios" className="card-link">
          Usuários
        </a>
        <a href="/reservas" className="card-link">
          Reservas
        </a>
      </div>
    </div>
  );
}
