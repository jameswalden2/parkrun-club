"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthForm() {
    const params = useSearchParams();

    const [activeTab, setActiveTab] = useState<string>("login");
    const [newUsername, setNewUsername] = useState<string | undefined>();

    useEffect(() => {
        const tabs = ["login", "register"];
        const activeTab = params.get("activeTab");
        if (activeTab && tabs.includes(activeTab)) {
            setActiveTab(activeTab);
            if (activeTab == "login") {
                const username = params.get("username") || undefined;
                setNewUsername(username);
            }
        }
    }, [params, setNewUsername, setActiveTab]);

    return (
        <Tabs value={activeTab} defaultValue="login" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                    onClick={() => setActiveTab("login")}
                    value="login"
                >
                    Login
                </TabsTrigger>
                <TabsTrigger
                    onClick={() => setActiveTab("register")}
                    value="register"
                >
                    Register
                </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <LoginForm username={newUsername} />
            </TabsContent>
            <TabsContent value="register">
                <RegisterForm />
            </TabsContent>
        </Tabs>
    );
}
