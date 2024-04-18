"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { NewClubSchema } from "@/schemas";
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
import { createClub } from "@/actions/createClub";
import { ParkrunClubType } from "@/types/ParkrunClubTypes";
import { Clipboard, ClipboardCheck } from "lucide-react";
import { copyTextToClipboard } from "@/lib/utils";
import { useSetAtom } from "jotai";
import { activeParkrunClubAtom } from "@/atoms/atoms";

export const CreateClubForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [createClubSuccess, setCreateClubSuccess] = useState<boolean>(false);
    const [copyToClipboardSuccess, setCopyToClipboardSuccess] =
        useState<boolean>(false);
    const [isPending, startTransition] = useTransition();

    const setActiveParkrunClub = useSetAtom(activeParkrunClubAtom);

    const [newClub, setNewClub] = useState<ParkrunClubType | null>(null);

    const form = useForm<z.infer<typeof NewClubSchema>>({
        resolver: zodResolver(NewClubSchema),
        defaultValues: {
            name: "",
            userId: -1,
        },
    });

    const onSubmit = (values: z.infer<typeof NewClubSchema>) => {
        setError("");
        setCreateClubSuccess(true);

        startTransition(() => {
            createClub(values)
                .then((data) => {
                    form.reset();
                    setNewClub(data);
                    setCreateClubSuccess(true);
                    console.log(
                        `Setting active parkrun data: ${JSON.stringify(data)}`
                    );
                    setActiveParkrunClub(data);
                })
                .catch((error) => {
                    console.log(error);
                    setCreateClubSuccess(false);
                    setError("Something went wrong");
                });
        });
    };

    const ClipboardConditionalIcon = copyToClipboardSuccess
        ? ClipboardCheck
        : Clipboard;
    return (
        <CardWrapper
            headerTitle="Create a Club"
            headerLabel="Name your club and get a unique code to invite people!"
            backButtonLabel="Go to my dashboard"
            backButtonHref="/parkrunclub"
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
                                    <FormLabel>Club Name:</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Jim's parkrun runners"
                                            type="text"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error} />
                    {createClubSuccess && newClub && (
                        <div className="p-4 bg-green-400 text-white rounded-md space-y-2">
                            <h5>Hooray!</h5>
                            <p>{newClub.name}&apos;s code:</p>
                            <span className="w-full flex justify-center gap-4">
                                <h4>{newClub.uniqueCode}</h4>
                                <ClipboardConditionalIcon
                                    className="cursor-pointer"
                                    onClick={() => {
                                        copyTextToClipboard(newClub.uniqueCode);
                                        setCopyToClipboardSuccess(true);
                                    }}
                                />
                            </span>
                        </div>
                    )}
                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full"
                    >
                        Create
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
