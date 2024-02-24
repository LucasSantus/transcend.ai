"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FormEvent, useState } from "react";

interface ChatProps {}

export function Chat({}: ChatProps): JSX.Element {
  const [translate, setTranslate] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState<string>("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const response = await fetch("http://localhost:3000/api/translate", {
      method: "POST",
      body: JSON.stringify({ translate }),
    });

    const text = await response.text();

    console.log(text);

    setApiData(text);

    setLoading(false);
  };

  return (
    <div className="container">
      <div className="p-6">
        {loading && <>loading...</>}
        <form onSubmit={handleSubmit}>
          <div className="flex h-full justify-center items-center gap-3 min-h-[60vh]">
            <Textarea
              className="w-full h-80 text-zinc-800"
              placeholder="Escreva o texto aqui para tradução"
              onChange={(event) => {
                setTranslate(event.target.value);
              }}
            />

            <Textarea className="w-full h-80 text-zinc-800" value={apiData} />
          </div>
          <Button variant="secondary">Traduzir</Button>
        </form>
      </div>
    </div>
  );
}
