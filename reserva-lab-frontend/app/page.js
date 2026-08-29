import { redirect } from "next/navigation";

export default function Home() {
  const usuarioLogado = false;

  if (!usuarioLogado) {
    redirect("/login");
  }

  return <div>Dashboard</div>;
}