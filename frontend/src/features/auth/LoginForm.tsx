"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/CardWrapper";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/forms/FormError";
import { FormSuccess } from "@/components/forms/FormSuccess";
import { LoginResult, login } from "@/actions/login";
import InfoBoxWrapper from "@/components/wrappers/InfoBoxWrapper";

type LoginFormProps = {
    username?: string | undefined;
};

export const LoginForm = ({ username }: LoginFormProps) => {
    const [loginResult, setLoginResult] = useState<LoginResult>({
        success: false,
        code: "",
    });
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    useEffect(() => {
        form.reset({ username: username });
    }, [form, username]);

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        startTransition(() => {
            login(values)
                .then((data) => {
                    form.reset();
                    setLoginResult(data);
                })
                .catch((error) => {
                    setLoginResult({
                        success: false,
                        code: error,
                    });
                });
        });
    };

    return (
        <CardWrapper
            headerLabel={username ? "Welcome back" : "Login below"}
            headerTitle="🔐 Login"
            backButtonLabel="Don't have an account? Create one here"
            backButtonHref="/auth?activeTab=register"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        {username && (
                            <InfoBoxWrapper success>
                                You successfully registered! Log in below!
                            </InfoBoxWrapper>
                        )}
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Jim"
                                            type="text"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="******"
                                            type="password"
                                            autoFocus={username != undefined}
                                        />
                                    </FormControl>
                                    {/* <Button
                                        size="sm"
                                        variant="link"
                                        asChild
                                        className="px-0 font-normal"
                                    >
                                        <Link href="/auth/reset">
                                            Forgot password?
                                        </Link>
                                    </Button> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {loginResult.success && (
                        <FormSuccess message={loginResult.code} />
                    )}
                    {loginResult &&
                        !loginResult.success &&
                        loginResult.code &&
                        loginResult.code.length > 0 && (
                            <FormError message={loginResult.code} />
                        )}
                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full"
                    >
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
