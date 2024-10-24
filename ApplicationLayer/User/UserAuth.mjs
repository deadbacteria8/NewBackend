import userQueries from "../../Infrastructure/User/userQueries.mjs";
import signinToken from "../Token/signInToken.mjs";
import passwordHandler from "./PasswordHandler.mjs";
import passwordRules from "./PasswordRules.mjs";
export default {
    signUp: async (email, password) => {
        if(!(passwordRules.passwordRequirements(password))) throw new Error("Not passing password requirements");
        const user = await userQueries.findUserWithEmail(email);
        if (user) throw new Error('User with this email already exists');
        await userQueries.createUser(email, await passwordHandler.createPassword(password), []);
    },
    signIn: async (email, password) => {
        const user = await userQueries.findUserWithEmail(email);
        if (!user) throw new Error('User does not exist');
        if (!(await passwordHandler.verifyPassword(password, user.password))) throw new Error("Password doesnt match");
        return signinToken.createNewSignInToken(user);
    },

    authenticateToken: (token) => {
        return signinToken.verifySignInToken(token);
    }
}
