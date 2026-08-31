const API_BASE = "http://localhost:8080";

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("reservalab_token");
}

async function request(path, options = {}, autenticado = false) {
  const headers = { "Content-Type": "application/json" };

  if (autenticado) {
    const token = getToken();
    if (token) headers["Authorization"] = token;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    headers,
    ...options,
  });

  if (!res.ok) {
    let message = `Erro ${res.status}`;
    try {
      const data = await res.json();
      if (data?.message) message = data.message;
    } catch (e) {
      // ignora, mantém mensagem padrão
    }
    throw new Error(message);
  }

  if (res.status === 204) return null;

  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  }
  return null;
}

export const laboratorioApi = {
  listar: () => request("/laboratorios"),
  buscar: (id) => request(`/laboratorios/${id}`),
  criar: (data) =>
    request(
      "/laboratorios",
      { method: "POST", body: JSON.stringify(data) },
      true
    ),
  atualizar: (id, data) =>
    request(`/laboratorios/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deletar: (id) =>
    request(`/laboratorios/${id}`, { method: "DELETE" }, true),
};

export const usuarioApi = {
  listar: () => request("/usuario", {}, true),
  buscar: (id) => request(`/usuario/${id}`),
  criar: (data) =>
    request("/usuario", { method: "POST", body: JSON.stringify(data) }),
  atualizar: (id, data) =>
    request(`/usuario/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deletar: (id) => request(`/usuario/${id}`, { method: "DELETE" }, true),
};

export const authApi = {
  login: (email, senha) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, senha }),
    }),
  registrar: (data) =>
    request("/auth/registro", { method: "POST", body: JSON.stringify(data) }),
  me: () => request("/auth/me", {}, true),
};

export const reservaApi = {
  listar: () => request("/reserva"),
  buscar: (id) => request(`/reserva/${id}`),
  criar: (data) =>
    request("/reserva", { method: "POST", body: JSON.stringify(data) }, true),
  deletar: (id) => request(`/reserva/${id}`, { method: "DELETE" }, true),
};
