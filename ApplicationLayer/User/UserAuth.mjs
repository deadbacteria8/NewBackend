import userQueries from "../../Infrastructure/User/userQueries.mjs";
import jwtToken from "../Token/jwtToken.mjs";
import signinToken from "../Token/signInToken.mjs";
import bcrypt from "bcrypt";
export default {
    signUp: async (email, password) => {
        const user = await userQueries.findUserWithEmail(email);
        if (user) throw new Error('User with this email already exists');
        await userQueries.createUser(email, await bcrypt.hash(password, 10), []);
    },
    signIn: async (email, password) => {
        const user = await userQueries.findUserWithEmail(email);
        if (!user) throw new Error('User does not exist');
        if(!(await bcrypt.compare(password, user.password))) throw new Error("Password doesnt match");
        return signinToken.createNewSignInToken(user);
    },

    authenticateToken: (token) => {
        return signinToken.verifySignInToken(token);
    }
}
