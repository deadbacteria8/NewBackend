import bcrypt from "bcrypt";

export default {
    createPassword: async (password) => {
        return await bcrypt.hash(password, 10);
    },

    verifyPassword: async (notEncrypted, encrypted) => {
        return await bcrypt.compare(notEncrypted, encrypted)
    }
}