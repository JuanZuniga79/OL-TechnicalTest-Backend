import {Injectable, NestMiddleware} from "@nestjs/common";
import {NextFunction} from "express";

@Injectable()
export class ResponseMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const originalJson = res.json;

        //@ts-expect-error
        res.json = (body: any) => {
            if (body?.success !== undefined) {
                return originalJson.call(res, body);
            }

            const response = {
                success: true,
                message: "Operación exitosa",
                data: body
            };

            return originalJson.call(res, response);
        };

        next();
    }
}