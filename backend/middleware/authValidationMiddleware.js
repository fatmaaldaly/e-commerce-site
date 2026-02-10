export const validateRegister = (req, res, next) => {
    const {fullName, email, password} = req.body;
    
    if (!fullName || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
    }

    if(password.length<6){
        return  res.status(400).json({ error: "Password must be at least 6 characters" });
    }
    
    // input valid, move to controller
    next();
};


export const validateLogin = (req, res, next) => {
    const {email, password} = req.body;
    
    if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
    }
    
    next();
};