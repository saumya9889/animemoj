import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "AnimeFlix - Stream Your Favorite Anime",
  description:
    "Watch the latest anime episodes with high quality streaming. Discover new anime series and movies.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        <Navbar />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
