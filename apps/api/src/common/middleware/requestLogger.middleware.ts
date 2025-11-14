import morgan, { StreamOptions } from "morgan";
import { logger } from "../utils/logger.utils";

// Custom stream for Winston
const stream: StreamOptions = {
    write: (message: string) => logger.http(message.trim()),
};

// Skip logging during testing
const skip = () => process.env.NODE_ENV === "test";

// Request logger
export const requestLogger = morgan(
    ":method :url :status - :response-time ms", // avoids body/query
    { stream, skip }
);
