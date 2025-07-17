// import express from 'express';
// import jwt from 'jsonwebtoken';

// export const auth = (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction
// ) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader?.startsWith('Bearer ')) {
//     return res.status(401).json({
//       success: false,
//       message: 'Unauthorized - No token provided',
//     });
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET || 'your-secret-key'
//     ) as jwt.JwtPayload;

//     // Safely attach only the userId if your payload structure includes it
//     (req as any).user = {
//       userId: decoded.userId || decoded.id || decoded.sub || decoded, // fallback to decoded if you have a different payload
//     };

//     next();
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: 'Unauthorized - Invalid token',
//     });
//   }
// };
// auth-middleware.ts
// auth-middleware.ts
// auth-middleware.ts
// auth-middleware.ts
// auth-middleware.ts
import express from 'express';
import jwt from 'jsonwebtoken';

export const auth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization;
    

    if (!authHeader && req.cookies['next-auth.session-token']) {
        try {
            const decoded = jwt.decode(req.cookies['next-auth.session-token']);
            (req as any).user = {
                userId: decoded?.id || decoded?.sub
            };
            return next();
        } catch (error) {
            console.error('NextAuth cookie decode error:', error);
        }
    }


    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ 
            success: false,
            message: "Unauthorized - No token provided" 
        });
    }

    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
        
        console.log('Decoded Token:', decoded);
        
        const userId = decoded.userId || decoded.id || decoded.sub;
        
        if (!userId) {
            throw new Error("No user ID found in token");
        }

        (req as any).user = {
            userId: userId,
            tokenData: decoded
        };
        
        next();
    } catch (error) {
        console.error('Auth error:', error);
        return res.status(401).json({ 
            success: false,
            message: "Unauthorized - Invalid token",
            debug: process.env.NODE_ENV === 'development' ? {
                error: error.message,
                token: jwt.decode(token)
            } : undefined
        });
    }
};