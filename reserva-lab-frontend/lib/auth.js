const TOKEN_KEY = "reservalab_token";
const USER_KEY = "reservalab_user";

export function salvarSessao(usuario) {
  localStorage.setItem(TOKEN_KEY, usuario.token);
  localStorage.setItem(USER_KEY, JSON.stringify(usuario));
}

export function getUsuarioLogado() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function limparSessao() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
