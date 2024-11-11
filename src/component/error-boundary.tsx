import { useRouteError } from "react-router-dom";
import { logger } from "../util/console-logger";

export default function ErrorBoundary() {
    const error = useRouteError();
    logger.error(error);
    return <div className="text-h4 text-light-text mx-auto mt-[10rem]">{(error as Error).message}</div>;
}