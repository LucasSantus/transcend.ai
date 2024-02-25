"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TranslateFormData, translateFormSchema } from "@/validation/translate";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightLeft } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface ChatProps {}

export function Chat({}: ChatProps): JSX.Element {
  const [translate, setTranslate] = useState<string>("");
  const [apiData, setApiData] = useState<string>("");

  const form = useForm<TranslateFormData>({
    resolver: zodResolver(translateFormSchema),
    defaultValues: {
      from: "pt-br",
      to: "en-us",
    },
  });

  const { handleSubmit } = form;

  async function onHandleSubmit({}: TranslateFormData) {
    const response = await fetch("http://localhost:3000/api/translate", {
      method: "POST",
      body: JSON.stringify({ translate }),
    });

    const text = await response.text();

    setApiData(text);
  }

  return (
    <div className="container">
      <div className="space-y-5 p-6">
        <div className="pointer-events-none flex select-none items-center gap-1">
          <Image src="/translate-logo.svg" alt="" width={60} height={60} />
          <span className="font-mono text-2xl font-medium">Translator AI</span>
        </div>
        <div className="grid">
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onHandleSubmit)}
              className="grid min-h-[60vh] grid-cols-2 gap-3"
            >
              <div className="space-y-3">
                <div className="flex justify-between">
                  <FormField
                    control={form.control}
                    name="from"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a linguagem" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="pt-br">Português</SelectItem>
                            <SelectItem value="en-us">Inglês</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    variant="secondary"
                    icon={<ArrowRightLeft />}
                    type="button"
                    size="icon"
                  />
                </div>

                <Textarea
                  className="h-80 w-full resize-none border-none bg-zinc-900 text-zinc-400 ring ring-zinc-800"
                  placeholder="Escreva o texto aqui para tradução"
                  onChange={(event) => {
                    setTranslate(event.target.value);
                  }}
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <FormField
                    control={form.control}
                    name="to"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a linguagem" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="pt-br">Português</SelectItem>
                            <SelectItem value="en-us">Inglês</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button variant="secondary">Traduzir</Button>
                </div>

                <Textarea
                  className="h-80 w-full resize-none border-none bg-zinc-900 text-zinc-400"
                  value={apiData}
                  readOnly
                />
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
