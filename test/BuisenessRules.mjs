import passwordRules from "../ApplicationLayer/User/PasswordRules.mjs";
import documentRules from "../ApplicationLayer/Document/documentRules.mjs";
import { expect } from 'chai';

describe('Password Rules Tests', () => {
    describe('passwordRequirements', () => {
        it('should return true for a password longer than 6 characters', () => {
            expect(passwordRules.passwordRequirements('1234567')).to.be.true;
        });

        it('should return false for a password of 6 characters or fewer', () => {
            expect(passwordRules.passwordRequirements('123456')).to.be.false;
        });
    });
});

describe('Document Rules Tests', () => {
    describe('userHasAccessToDocument', () => {
        it('should return true if the user has access to the document', () => {
            const user = { documents: ['id1', 'id2', 'id3'] };
            expect(documentRules.userHasAccessToDocument(user, 'id2')).to.be.true;
        });

        it('should return false if the user does not have access to the document', () => {
            const user = { documents: ['id1', 'id2', 'id3'] };
            expect(documentRules.userHasAccessToDocument(user, 'id4')).to.be.false;
        });
    });

    describe('userCanBeAddedToDocument', () => {
        it('should return true if the user is not already added to the document', () => {
            const document = { users: ['id1', 'id2', 'id3'] };
            expect(documentRules.userCanBeAddedToDocument(document, 'id4')).to.be.true;
        });

        it('should return false if the user is already in the document', () => {
            const document = { users: ['id1', 'id2', 'id3'] };
            expect(documentRules.userCanBeAddedToDocument(document, 'id2')).to.be.false;
        });
    });

    describe('userCanCreateDocument', () => {
        it('should return true if the user exists', () => {
            const user = { name: 'Herman' };
            expect(documentRules.userCanCreateDocument(user)).to.be.true;
        });

        it('should return false if the user is undefined', () => {
            expect(documentRules.userCanCreateDocument(undefined)).to.be.false;
        });
    });

    describe('userCanAddUsersToDocument', () => {
        it('should return true if the user can add others to the document', () => {
            const document = { users: ['id1', 'id2', 'id3'] };
            expect(documentRules.userCanAddUsersToDocument(document, 'id2')).to.be.true;
        });

        it('should return false if the user cannot add others to the document', () => {
            const document = { users: ['id1', 'id2', 'id3'] };
            expect(documentRules.userCanAddUsersToDocument(document, 'id4')).to.be.false;
        });
    });
});
