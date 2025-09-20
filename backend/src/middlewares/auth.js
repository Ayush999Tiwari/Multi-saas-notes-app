import jwt from "jsonwebtoken";
export function auth(requiredRole = null){
    return (req ,res , next) => {
        const header = req.headers.authorization;
        if(!header){
            return res.status(401).json({
                message : "No token"
            });   
        }
        const token = header.split("")[1];
        if(!token){
            return res.status(400).json({
                message : "Invalid token "
            });
        }
        try{
            const decoded = jwt.verify(token , process.env.JWT_SECRET);
            req.user = decoded;
            if( requiredRole && deccoded.role !== requiredRole){
                return res.status(403).json({
                    message : " Forbidden"
                })
            }
            next();
        }catch(err){
            return res.status(401).json({
                message : "Invalid token"
            });
        }
    };
}