// src/common/errors/unknownError.ts
export const handleUnknownError = (err: any) => {
    return {
        type: 'UnknownError',
        message: err?.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err?.stack : undefined,
        statusCode: 500,
    };
};
