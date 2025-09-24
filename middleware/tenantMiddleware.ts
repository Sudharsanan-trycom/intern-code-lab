import { Request, Response, NextFunction } from "express";

export const tenantMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const tenantName = req.params.tenantName as string;

  if (!tenantName) {
    return res.status(400).json({ message: "Tenant name is required in query params" });
  }

  (req as any).tenantName = tenantName;
  next();
};
