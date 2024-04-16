import * as z from "zod";

export const SettingsSchema = z
    .object({
        name: z.optional(z.string()),
        password: z.optional(z.string().min(6)),
        newPassword: z.optional(z.string().min(6)),
        theme: z.optional(z.string()),
    })
    .refine(
        (data) => {
            if (!data.password) return true;
            if (data.password && !data.newPassword) {
                return false;
            }

            return true;
        },
        {
            message: "New password is required!",
            path: ["newPassword"],
        }
    )
    .refine(
        (data) => {
            if (!data.password) return true;
            if (data.newPassword && !data.password) {
                return false;
            }

            return true;
        },
        {
            message: "Password is required!",
            path: ["password"],
        }
    );

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Minimum of 6 characters required",
    }),
});

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
});

export const LoginSchema = z.object({
    username: z.string().min(2, {
        message: "Username is required",
    }),
    password: z.string().min(1, {
        message: "Password is required",
    }),
    code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
    username: z.string().min(2, {
        message: "Longer!!!!",
    }),
    password: z.string().min(5, {
        message: "Minimum 6 characters required",
    }),
    name: z.string().min(1, {
        message: "Name is required",
    }),
});

export const NewClubSchema = z.object({
    name: z.string().min(3, {
        message: "Longer!!",
    }),
    userId: z.number(),
});

export const JoinClubSchema = z.object({
    uniqueCode: z.string().length(8, {
        message: "The code should be 8 characters long.",
    }),
});

export const FindClubSchema = z.object({
    uniqueCode: z.string().length(8, {
        message: "The code should be 8 characters long.",
    }),
});
