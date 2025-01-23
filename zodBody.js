const z = require("zod")

const requiredBody = z.object({
    firstName: z.string().min(3, "Name is too short").max(20, "Name is too big"),
    lastName: z.string().min(3, "Name is too short").max(20, "Name is too big"),
    email: z.string().email().min(4).max(50),
    password: z.string().min(4).max(50).refine(value => {
        hasUpperCase = /[A-Z]/.test(value);
        hasLowerCase = /[a-z]/.test(value);
        hasNumber = /[0-9]/.test(value);
        hasSpecialCharacter = /[!@#$%^&*()_+<>?:"{}|]/.test(value);

        return hasUpperCase && hasLowerCase && hasNumber && hasSpecialCharacter
    }, {
        message: "String must contain at least one lowercase letter, one uppercase letter, one number and one special character."
    })

})

module.exports={
    requiredBody
}