import axios from "axios";

// 127.0.0.1

const backendServiceName =
    process.env.REACT_APP_BACKEND_SERVICE_NAME != undefined
        ? process.env.REACT_APP_BACKEND_SERVICE_NAME
        : "localhost";

export const axiosAPIClient = axios.create({
    baseURL: `http://${backendServiceName}:${
        process.env.REACT_APP_BACKEND_PORT || "8000"
    }`,
    timeout: 10_000,
});
