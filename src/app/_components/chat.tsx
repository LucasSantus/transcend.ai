"use client";

import { translateServer } from "@/actions/translate";
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
import { useMutation } from "@tanstack/react-query";
import { ArrowRightLeft } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";

interface ChatProps {}

export function Chat({}: ChatProps): JSX.Element {
  const {
    mutate,
    data = "",
    isPending,
  } = useMutation({
    mutationFn: async (values: TranslateFormData) => {
      try {
        const response = await translateServer(values);

        return response;
      } catch (error) {
        return null;
      }
    },
  });

  const form = useForm<TranslateFormData>({
    resolver: zodResolver(translateFormSchema),
    defaultValues: {
      from: "pt-br",
      to: "en-us",
      textToTranslate: "",
    },
  });

  const { handleSubmit } = form;

  async function onHandleSubmit(values: TranslateFormData) {
    mutate(values);
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

                <FormField
                  control={form.control}
                  name="textToTranslate"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          className="h-80 w-full resize-none border-none bg-zinc-900 text-zinc-400 ring ring-zinc-800"
                          placeholder="Escreva o texto aqui para tradução"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
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
                  value={String(data)}
                  isLoading={isPending}
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
