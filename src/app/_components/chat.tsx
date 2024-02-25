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
import { ArrowRightLeft, Languages } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  async function onHandleSubmit(values: TranslateFormData) {
    mutate(values);
  }

  useEffect(() => {
    if (errors) {
      const array = Object.entries(errors).map(([chave, valor]) => ({
        chave,
        valor,
      }));

      array.map((item) => toast.error(item.valor.message));
    }
  }, [errors]);

  return (
    <div className="container">
      <div className="space-y-5 p-6">
        <div className="flex items-center gap-1">
          <Image src="/images/logo.svg" alt="" width={56} height={56} />
          <span className="font-mono text-xl font-medium">Transcend AI</span>
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
                      <FormItem className="flex items-end gap-2">
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
                          className="h-80 w-full resize-none border-none bg-primary-foreground text-muted-foreground ring ring-zinc-800"
                          placeholder="Escreva o texto aqui para tradução"
                          {...field}
                        />
                      </FormControl>
                      {/* <FormMessage /> */}
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
                        {/* <FormMessage /> */}
                      </FormItem>
                    )}
                  />

                  <Button
                    variant="secondary"
                    icon={<Languages className="size-4" />}
                  >
                    Traduzir
                  </Button>
                </div>

                <Textarea
                  className="h-80 w-full resize-none border-none bg-primary-foreground text-muted-foreground"
                  value={data}
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
