"use client";

export function NoScript(): JSX.Element {
  return (
    <noscript>
      <style type="text/css">
        {`
        * {
          overflow: hidden;
          margin: 0;
          padding: 0;
        }
        #root {
          display: none;
        }
      `}
      </style>
      <div className="flex h-screen w-full items-center justify-center bg-slate-900 text-2xl text-white">
        Ative o JavaScript para o sistema funcionar corretamente.
      </div>
    </noscript>
  );
}
