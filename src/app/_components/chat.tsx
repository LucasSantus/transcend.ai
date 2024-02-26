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
import {
  TranslateFormData,
  languages,
  translateFormSchema,
} from "@/validation/translate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowRightLeft, Languages } from "lucide-react";
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
        // toast.error(error.message);

        return "";
      }
    },
  });

  const form = useForm<TranslateFormData>({
    resolver: zodResolver(translateFormSchema),
    defaultValues: {
      to: "en-us",
      textToTranslate: "",
    },
  });

  const { handleSubmit, setValue, watch } = form;

  const [from, to] = watch(["from", "to"]);

  async function onHandleSubmit(values: TranslateFormData) {
    mutate(values);
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
                    }}
                    disabled={!to || !from}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="textToTranslate"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          className="h-80 w-full resize-none border-none bg-primary-foreground text-muted-foreground"
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
                      <FormItem className="flex items-end gap-2 truncate">
                        <Select
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
                    >
                      Traduzir
                    </Button>
                  </div>
                </div>

                <Textarea
                  className="h-80 w-full resize-none border-none bg-primary-foreground text-muted-foreground !ring-0"
                  value={data}
                  isLoading={isPending}
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
