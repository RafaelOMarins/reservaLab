import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "ReservaLab",
  description: "Sistema de reserva de laboratórios de informática",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Navbar />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
