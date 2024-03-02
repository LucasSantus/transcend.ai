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
import { languages } from "@/contants/languages";
import { TranslateFormData, translateFormSchema } from "@/validation/translate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCompletion } from "ai/react";
import { ArrowRightLeft, Languages } from "lucide-react";
import Image from "next/image";
import { FormEvent } from "react";
import { useForm } from "react-hook-form";

export function TranslateForm(): JSX.Element {
  const form = useForm<TranslateFormData>({
    resolver: zodResolver(translateFormSchema),
    defaultValues: {
      from: "pt-br",
      to: "en-us",
      prompt: "",
    },
  });

  const { handleSubmit, setValue, watch } = form;

  const [from, to, prompt] = watch(["from", "to", "prompt"]);

  const {
    completion,
    setCompletion,
    handleInputChange,
    handleSubmit: handleCompletionSubmit,
    isLoading,
  } = useCompletion({
    api: "/api/translate",
    body: {
      from,
      to,
    },
  });

  async function onHandleSubmit() {
    const formEvent = new Event("submit", { bubbles: true, cancelable: true });

    handleCompletionSubmit(formEvent as unknown as FormEvent<HTMLFormElement>);
  }

  return (
    <div className="container">
      <div className="space-y-4 p-6 md:space-y-6">
        <div className="flex items-center gap-1">
          <Image src="/images/logo.svg" alt="" width={56} height={56} />
          <span className="font-mono text-xl font-medium">Transcend AI</span>
        </div>
        <div className="grid">
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onHandleSubmit)}
              className="grid min-h-[60vh] grid-cols-1 gap-3 md:grid-cols-2"
            >
              <div className="space-y-3">
                <div className="flex justify-between gap-2">
                  <FormField
                    control={form.control}
                    name="from"
                    render={({ field }) => (
                      <FormItem className="flex flex-col truncate md:flex-row md:items-end md:gap-2">
                        <Select
                          disabled={isLoading}
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a linguagem" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {languages.map(({ key, label }) => (
                              <SelectItem
                                key={key}
                                value={key}
                                disabled={to === key}
                              >
                                {label}
                              </SelectItem>
                            ))}
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
                    onClick={() => {
                      setValue("from", to, { shouldValidate: true });
                      setValue("to", from, { shouldValidate: true });

                      if (prompt) {
                        setValue("prompt", completion, {
                          shouldValidate: true,
                        });

                        setCompletion(prompt);
                      }
                    }}
                    disabled={!to || !from || !prompt}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="h-80 w-full resize-none border-none bg-primary-foreground text-muted-foreground"
                          placeholder="Escreva o texto aqui para tradução"
                          shouldDisplayNumberOfCharacters
                          limitCharacters={2000}
                          onChange={(event) => {
                            handleInputChange(event);
                            field.onChange(event);
                          }}
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
                      <FormItem className="flex items-end gap-2 truncate">
                        <Select
                          disabled={isLoading}
                          onValueChange={(value) => {
                            field.onChange(value);

                            if (to && prompt) {
                              onHandleSubmit();
                            }
                          }}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a linguagem" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {languages.map(({ key, label }) => (
                              <SelectItem
                                key={key}
                                value={key}
                                disabled={from === key}
                              >
                                {label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="hidden md:block">
                    <Button
                      variant="secondary"
                      icon={<Languages className="size-4" />}
                      isLoading={isLoading}
                    >
                      Traduzir
                    </Button>
                  </div>
                </div>

                <Textarea
                  name="result"
                  id="result"
                  className="h-80 w-full resize-none border-none bg-primary-foreground text-muted-foreground !ring-0"
                  value={completion}
                  isLoading={isLoading}
                  readOnly
                />

                <div className="grid md:hidden">
                  <Button
                    variant="secondary"
                    icon={<Languages className="size-3" />}
                  >
                    Traduzir
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
