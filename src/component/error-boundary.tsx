import { useRouteError } from "react-router-dom";
import { logger } from "../util/console-logger";

export default function ErrorBoundary() {
    const error = useRouteError();
    logger.error(error);
    return <>
            <div className="text-h4 text-center text-text-1 mx-auto mt-[33.34vh]">{(error as Error).message}</div>;
            <div className="text-center text-text-1 mx-auto //mt-[10rem]">Please refresh page or try again later</div>        
        </>
}