"use client";

import * as z from "zod";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { SettingsSchema } from "@/schemas";
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

import {
    updateSettings,
    UpdateSettingsResultType,
} from "@/actions/settings/updateSettings";
import { getSettings } from "@/actions/settings/getSettings";
import { useAtom } from "jotai";
import { userSettingsAtom } from "@/atoms/atoms";

type UpdateSettingsFormProps = {
    className?: string;
};

export default function UpdateSettingsForm({
    className,
}: UpdateSettingsFormProps) {
    const [error, setError] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const [userSettings, setUserSettings] = useAtom(userSettingsAtom);

    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            theme: "",
        },
    });

    useEffect(() => {
        startTransition(() => {
            getSettings().then((data) => {
                if (data.success && data.settings) {
                    setUserSettings(data.settings);
                    form.reset(data.settings);
                }
            });
        });
    }, [form, setUserSettings]);

    const sampleUserSettingsDefaultValue = {
        success: false,
        settings: null,
        code: "",
    };

    const [updateSettingsSuccess, setUpdateSettingsSuccess] =
        useState<UpdateSettingsResultType>(sampleUserSettingsDefaultValue);

    const onSubmitFind = (values: z.infer<typeof SettingsSchema>) => {
        setError("");
        setUpdateSettingsSuccess(sampleUserSettingsDefaultValue);

        startTransition(() => {
            updateSettings(values)
                .then((data) => {
                    form.reset(data.settings);
                    setUpdateSettingsSuccess(data);
                    setUserSettings(data.settings);
                })
                .catch((error) => {
                    console.log(error);
                    setUpdateSettingsSuccess({
                        success: false,
                        settings: null,
                        code: "error",
                    });
                    setError("Something went wrong");
                });
        });
    };

    return (
        <CardWrapper
            headerTitle="Update Settings"
            headerLabel="Update your profile settings below!"
            backButtonLabel="Go to club dashboard"
            backButtonHref="/parkrunclub"
            className={clsx(className, "w-full")}
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmitFind)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="theme"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Theme:</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="pink, #f4e3a6"
                                            type="text"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full"
                    >
                        Update
                    </Button>
                </form>
            </Form>
            {updateSettingsSuccess.success &&
                updateSettingsSuccess.code == "success" && (
                    <div className="p-4 bg-green-400 text-white rounded-md space-y-2">
                        <h5>Settings Updated!</h5>
                        <p>Reload to apply them.</p>
                    </div>
                )}
        </CardWrapper>
    );
}
