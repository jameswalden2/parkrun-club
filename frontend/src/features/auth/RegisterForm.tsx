"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterSchema } from "@/schemas";
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
import { register } from "@/actions/register";
import InfoBoxWrapper from "@/components/wrappers/InfoBoxWrapper";

export const RegisterForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            username: "",
            password: "",
            name: "",
        },
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            register(values).then((data) => {
                setError(data.error);
                setSuccess(data.success);
            });
        });
    };

    return (
        <CardWrapper
            headerLabel="Create an account"
            headerTitle="🔏 Register"
            backButtonLabel="Already have an account? Login here"
            backButtonHref="/auth/login"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Jim"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                                            placeholder="Parkrunner Jim"
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
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <InfoBoxWrapper danger>
                            This project is in beta. Do NOT use login
                            credentials you use anywhere else.
                        </InfoBoxWrapper>
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full"
                    >
                        Create an account
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
