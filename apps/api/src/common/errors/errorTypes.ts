export interface HandledError {
    type: string;
    message: string;
    errors?: any;
    meta?: any;
    statusCode: number;
}
