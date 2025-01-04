import Image from "next/image";
import GoogleSignIn from "./components/GoogleSignIn";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          // className="dark:invert"
          id="loginImg"
          src="/loginCabeza.png"
          alt="Next.js logo"
          width={100}
          height={100}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Testing de login con google{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li>Uso de componentes de React</li>
          <li>Uso de Google Sign In</li>
          <li>Sirviendo con Vercel y Next.js</li>
          <br />
          <GoogleSignIn />
        </ol>
      </main>
    </div>
  );
}
