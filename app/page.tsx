import { redirect } from "next/navigation";

export default function HomePage() {
  // Redirect ke blog sebagai halaman utama
  redirect("/blog");
}
