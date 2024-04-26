"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Dialog,
    DialogTrigger,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "../ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { UpdateUserSettingsSchema } from "@/schemas";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useTransition } from "react";

import InfoBoxWrapper from "../wrappers/InfoBoxWrapper";
import { getUserInformation, updateUserProfile } from "@/actions/user/profile";
import { UpdateUserProfileResultType } from "@/actions/user/profile";

export default function UpdateUserSettingsDialog() {
    const [isPending, startTransition] = useTransition();
    const [updateResult, setUpdateResult] =
        useState<UpdateUserProfileResultType>({
            success: false,
            newProfile: null,
            code: "",
        });
    const [error, setError] = useState<string | undefined>("");
    const [newPassword, setNewPassword] = useState<string | undefined>(
        undefined
    );
    const [confirmNewPassword, setConfirmNewPassword] = useState<
        string | undefined
    >(undefined);

    const form = useForm<z.infer<typeof UpdateUserSettingsSchema>>({
        resolver: zodResolver(UpdateUserSettingsSchema),
        defaultValues: {
            name: "",
            username: "",
            newPassword: "",
        },
    });

    useEffect(() => {
        getUserInformation().then((data) => {
            if (!data) {
                return;
            }
            form.reset(data);
        });
    }, [form]);

    const handleSubmit = (values: z.infer<typeof UpdateUserSettingsSchema>) => {
        startTransition(() => {
            updateUserProfile(values).then((data) => {
                if (!data || !data.newProfile) {
                    return;
                }
                form.reset(data.newProfile);
                setUpdateResult(data);
            });
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full">Update</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Update Your Profile</DialogTitle>
                    <DialogDescription>
                        Change your name, username and password here.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
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
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Set a New Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder="******"
                                                type="password"
                                                defaultValue={newPassword}
                                                onChange={(e) => {
                                                    e.preventDefault();
                                                    setNewPassword(
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                        </FormControl>
                                        {newPassword && (
                                            <div className="mt-2 space-y-2">
                                                <FormLabel>
                                                    Confirm New Password
                                                </FormLabel>
                                                <Input
                                                    className={
                                                        confirmNewPassword ===
                                                        newPassword
                                                            ? ""
                                                            : "bg-red-200"
                                                    }
                                                    value={confirmNewPassword}
                                                    disabled={isPending}
                                                    placeholder="Confirm Password"
                                                    type="password"
                                                    onChange={(e) => {
                                                        setConfirmNewPassword(
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                            </div>
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <InfoBoxWrapper danger>
                                This project is in beta. Do NOT use login
                                credentials you use anywhere else.
                            </InfoBoxWrapper>
                            {updateResult.success && (
                                <InfoBoxWrapper success>
                                    Profile updated succesfully! Reload the page
                                    to see the changes.
                                </InfoBoxWrapper>
                            )}
                        </div>
                        <FormMessage />
                        <div className="w-full flex gap-4">
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                            <Button
                                disabled={isPending}
                                type="submit"
                                className="w-full"
                            >
                                Update
                            </Button>
                        </div>
                    </form>
                </Form>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild></DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
