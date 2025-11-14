// src/common/errors/axiosError.ts
import axios from 'axios';
import { HandledError } from './errorTypes';


export const handleAxiosError = (err: unknown): HandledError | null => {
    if (!(axios as any).isAxiosError?.(err)) return null;

    const axiosErr = err as any;

    return {
        type: 'HttpRequestError',
        message: axiosErr.response?.data?.message || 'External request failed',
        errors: {
            status: axiosErr.response?.status,
            data: axiosErr.response?.data,
            headers: axiosErr.response?.headers,
        },
        statusCode: axiosErr.response?.status || 500,
    };
};
