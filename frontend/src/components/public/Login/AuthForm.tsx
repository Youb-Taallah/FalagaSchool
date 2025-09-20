"use client";

import type { z } from "zod";
import type { UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/public/Login/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "../../ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "./card";

import { Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import images from "../../../utils/images";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface AuthFormProps<T extends z.ZodType<any, any>> {
  formSchema: T;
  onSubmit: (
    values: z.infer<T>,
    form: UseFormReturn<z.infer<T>>
  ) => Promise<void>;
  title: string;
  description?: string;
  buttonText: string;
  fields: Array<{
    name: keyof z.infer<T>;
    label: string;
    type: string;
    placeholder?: string;
  }>;
  footerContent?: React.ReactNode;
  isLoading?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AuthForm<T extends z.ZodType<any, any>>({
  formSchema,
  onSubmit,
  title,
  description,
  buttonText,
  fields,
  footerContent,
  isLoading = false,
}: AuthFormProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<T>>({
    resolver: zodResolver(formSchema),
    defaultValues: fields.reduce<z.infer<T>>(
      (acc, field) => ({ ...acc, [field.name]: "" }),
      {} as z.infer<T> // Explicitly cast to the inferred type
    ),
  });

  const handleFormSubmit = async (values: z.infer<T>) => {
    await onSubmit(values, form);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center flex flex-col items-center">
          <Link to={"/"} >
            <img className="h-20 w-26" src={images.public.fgLogo} alt="Falaga School" />
          </Link>
          {/* <h1 className="text-3xl font-bold text-primary-700">Falaga School</h1> */}
        </div>

        <Card className="overflow-hidden border-none shadow-soft">
          <div className="h-2 bg-gradient-to-r from-blue-800 to-blue-400"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-center text-2xl font-bold text-gray-800">
              {title}
            </CardTitle>
            {description && (
              <CardDescription className="text-center text-gray-600">
                {description}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="pt-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleFormSubmit)}
                className="space-y-5"
              >
                {fields.map((field) => (
                  <FormField
                    key={String(field.name)}
                    control={form.control}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    name={field.name as any} // Need type assertion here
                    render={({ field: formField }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">
                          {field.label}
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            {field.type === "email" && (
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            )}
                            {field.type === "password" && (
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            )}
                            <Input
                              type={
                                field.type === "password"
                                  ? showPassword
                                    ? "text"
                                    : "password"
                                  : field.type
                              }
                              placeholder={
                                field.placeholder ||
                                `Enter your ${field.label.toLowerCase()}`
                              }
                              {...formField}
                              className={`bg-white focus:border-primary-500 focus:ring-primary-500 rounded-lg pl-10 shadow-sm border-gray-200 transition-all duration-200 hover:border-gray-300 ${
                                field.type === "password" ? "pr-10" : ""
                              }`}
                            />
                            {field.type === "password" && (
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                ))}

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary-600 to-blue-700 hover:from-primary-700 hover:to-blue-800 text-white font-medium py-2.5 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md flex justify-center items-center h-11"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      buttonText
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
          {footerContent && (
            <CardFooter className="flex flex-col items-center space-y-3 text-sm border-t border-gray-100 pt-4 pb-6">
              {footerContent}
            </CardFooter>
          )}
        </Card>

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} RoleRoute. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
