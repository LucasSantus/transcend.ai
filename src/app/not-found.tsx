import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center gap-3 bg-background p-10 text-foreground sm:justify-center">
      <Image
        src="/images/404.svg"
        alt=""
        width={0}
        height={0}
        className="h-auto max-h-[70%] w-auto max-w-[95%] select-none sm:max-h-[50%] sm:max-w-[80%]"
        sizes="100vw"
      />

      <p>Ooops, a url solicitada não foi encontrada no sistema.</p>
      <Link
        href="/"
        className="text-sm text-blue-600 hover:text-blue-500 hover:underline"
      >
        Retornar para a página principal
      </Link>
    </div>
  );
}
