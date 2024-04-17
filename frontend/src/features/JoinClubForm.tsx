"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { FindClubSchema } from "@/schemas";
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
import { findClub, FindParkrunClubResultType } from "@/actions/findClub";
import { joinClub, JoinClubResultType } from "@/actions/joinClub";

import RedirectButton from "@/components/clubs/RedirectButton";
import SelectClubDialog from "@/components/clubs/SelectClubDialog";

export const JoinClubForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof FindClubSchema>>({
        resolver: zodResolver(FindClubSchema),
        defaultValues: {
            uniqueCode: "",
        },
    });

    const [findClubSuccess, setFindClubSuccess] =
        useState<FindParkrunClubResultType>({
            success: false,
            parkrunClub: null,
            code: "",
        });

    const onSubmitFind = (values: z.infer<typeof FindClubSchema>) => {
        setError("");
        setFindClubSuccess({
            success: false,
            parkrunClub: null,
            code: "",
        });

        startTransition(() => {
            findClub(values)
                .then((data) => {
                    form.reset();
                    setFindClubSuccess(data);
                })
                .catch((error) => {
                    console.log(error);
                    setFindClubSuccess({
                        success: false,
                        parkrunClub: null,
                        code: "",
                    });
                    setError("Something went wrong");
                });
        });
    };

    const [joinClubSuccess, setJoinClubSuccess] = useState<JoinClubResultType>({
        success: false,
        code: "",
    });

    const onSubmitJoin = (uniqueCode: string) => {
        setError("");

        startTransition(() => {
            joinClub(uniqueCode)
                .then((data) => {
                    form.reset();
                    setJoinClubSuccess(data);
                })
                .catch((error) => {
                    console.log(error);
                    setJoinClubSuccess({ success: false, code: "" });
                    setError("Something went wrong");
                });
        });
    };

    return (
        <CardWrapper
            headerTitle="Join a club"
            headerLabel="Get the club code to join!"
            backButtonLabel="Go to my dashboard"
            backButtonHref="/parkrunclub"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmitFind)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="uniqueCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Club Code:</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="J1M5 3jI9"
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
                        Find
                    </Button>
                </form>
            </Form>
            {findClubSuccess.success &&
                findClubSuccess.code == "success" &&
                findClubSuccess.parkrunClub && (
                    <div className="p-4 bg-green-400 text-white rounded-md space-y-2">
                        <h5>Is this the right club?</h5>
                        <p>{findClubSuccess.parkrunClub.name}</p>
                        <p>{findClubSuccess.parkrunClub.uniqueCode}</p>
                        <Button
                            onClick={() =>
                                onSubmitJoin(
                                    findClubSuccess.parkrunClub.uniqueCode
                                )
                            }
                            className="w-full"
                            disabled={isPending}
                        >
                            Join
                        </Button>
                    </div>
                )}
            {!findClubSuccess.success &&
                findClubSuccess.code == "membership_exists" &&
                findClubSuccess.parkrunClub && (
                    <div className="p-4 bg-orange-400 text-white rounded-md space-y-2">
                        <h5>You&apos;re already a member of this club!</h5>
                        <p>{findClubSuccess.parkrunClub.name}</p>
                        <p>{findClubSuccess.parkrunClub.uniqueCode}</p>
                        <RedirectButton
                            buttonText="Go To Club Page"
                            redirectURL="/parkrunclub"
                            className="mt-2"
                        />
                    </div>
                )}
            {joinClubSuccess.success && findClubSuccess.parkrunClub && (
                <div className="p-4 bg-green-400 text-white rounded-md space-y-2">
                    <h5>Hooray!</h5>
                    <p>You&apos;ve joined {findClubSuccess.parkrunClub.name}</p>
                    <RedirectButton
                        buttonText="Go To Club Page"
                        redirectURL="/parkrunclub"
                        className="mt-2"
                    />
                </div>
            )}
        </CardWrapper>
    );
};
