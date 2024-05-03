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
import { RegisterResult, register } from "@/actions/register";
import InfoBoxWrapper from "@/components/wrappers/InfoBoxWrapper";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
    const [registerResult, setRegisterResult] = useState<RegisterResult>({
        success: false,
        username: null,
        code: "",
    });
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            username: "",
            password: "",
            name: "",
        },
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        startTransition(() => {
            register(values)
                .then((data) => {
                    setRegisterResult(data);
                    if (data.username) {
                        router.push(
                            `/auth?activeTab=login&username=${data.username}`
                        );
                    }
                })
                .catch((error) => {
                    setRegisterResult({
                        success: false,
                        username: null,
                        code: "unknown_error",
                    });
                });
        });
    };

    return (
        <CardWrapper
            headerLabel="Create an account"
            headerTitle="🔏 Register"
            backButtonLabel="Already have an account? Login here"
            backButtonHref="/auth?activeTab=login"
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
                    {registerResult.success && (
                        <FormSuccess message={registerResult.code} />
                    )}
                    {!registerResult.success &&
                        registerResult.code.length > 0 && (
                            <FormError message={registerResult.code} />
                        )}

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
