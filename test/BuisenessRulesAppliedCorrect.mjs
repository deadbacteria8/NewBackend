
import documentRules from "../ApplicationLayer/Document/documentRules.mjs";
import userApplicationLayer from "../ApplicationLayer/User/userApplicationLayer.mjs";
import document from "../ApplicationLayer/Document/document.mjs";
import docs from "../Infrastructure/Documents/docs.mjs"
import { expect } from 'chai';
import sinon from 'sinon';

describe('updateDocument Function Tests', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should not throw an error if user has access to the document', async () => {
        const userId = 1;
        const docId = 101;

        sinon.stub(userApplicationLayer, 'findUser').resolves({ id: userId, documents: [docId] });
        sinon.stub(documentRules, 'userHasAccessToDocument').returns(true);
        sinon.stub(docs, 'updateContent').resolves();

        let error;
        try {
            await document.updateDocument("userId", "docId", "content" , "title");
        } catch (err) {
            error = err;
        }

        expect(error).to.be.undefined;
    });
});
