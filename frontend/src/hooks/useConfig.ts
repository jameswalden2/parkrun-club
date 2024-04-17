import { createContext, useContext, useState, useEffect } from "react";

import { SettingsType } from "@/types/UserTypes";

const ConfigContext = createContext<SettingsType>({ themeColour: "pink" });

export const ConfigProvider = ({ children }) => {
    const [config, setConfig] = useState({});

    useEffect(() => {
        // Load from db settings
        if (storedConfig) {
            setConfig(storedConfig);
        }
    }, []);

    return (
        <ConfigContext value={{ config, setConfig }}>{children}</ConfigContext>
    );
};

export const useConfig = () => useContext(ConfigContext);
