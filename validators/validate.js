import { validationResult } from "express-validator";

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).render("admin/addGame", {errors : errors.array(), 
                                                       formData : req.body, 
                                                       rawg_id: req.body.rawg_id,
                                                       });
    }

    next();
}

export default validate;