"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
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

    setApiData(text);

    setLoading(false);
  };

  return (
    <div className="container">
      <div className="p-6">
        {loading && <>loading...</>}
        <form onSubmit={handleSubmit}>
          <div className="">
            <div className="flex gap-2 items-center">
              <Image
                src="/translate-logo.svg"
                alt=""
                width={60}
                height={60}
                className="pointer-events-none select-none"
              />
              <span className="text-2xl font-medium font-mono">
                Translator AI
              </span>
            </div>
            <div className="grid ">
              <div className="grid grid-cols-2 min-h-[60vh] gap-3">
                <div>
                  <div className="flex justify-between">
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a fruit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Fruits</SelectLabel>
                          <SelectItem value="apple">Apple</SelectItem>
                          <SelectItem value="banana">Banana</SelectItem>
                          <SelectItem value="blueberry">Blueberry</SelectItem>
                          <SelectItem value="grapes">Grapes</SelectItem>
                          <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <Button variant="secondary">Trocar</Button>
                  </div>
                  <Textarea
                    className="w-full h-80 text-zinc-800 bg-zinc-900 ring ring-zinc-800 resize-none border-none"
                    placeholder="Escreva o texto aqui para tradução"
                    onChange={(event) => {
                      setTranslate(event.target.value);
                    }}
                  />
                </div>

                <div>
                  <div className="flex justify-between">
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a fruit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Fruits</SelectLabel>
                          <SelectItem value="apple">Apple</SelectItem>
                          <SelectItem value="banana">Banana</SelectItem>
                          <SelectItem value="blueberry">Blueberry</SelectItem>
                          <SelectItem value="grapes">Grapes</SelectItem>
                          <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <Button variant="secondary">Traduzir</Button>
                  </div>
                  <Textarea
                    className="w-full h-80 text-zinc-800 bg-zinc-900 ring ring-zinc-800 resize-none border-none focus-visible:ring"
                    value={apiData}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
