import documentRules from "../ApplicationLayer/Document/documentRules.mjs";
import userApplicationLayer from "../ApplicationLayer/User/UserApplicationLayer.mjs";
import document from "../ApplicationLayer/Document/document.mjs";
import docs from "../Infrastructure/Documents/docs.mjs";
import { expect } from 'chai';
import sinon from 'sinon';

describe('updateDocument Function Tests', () => {
    afterEach(() => {
        sinon.restore();
    });


    describe('getDocumentById is implemented correctly', () => {
        it('should return document if user has access', async () => {

            sinon.stub(userApplicationLayer, 'findUser').resolves();
            sinon.stub(documentRules, 'userHasAccessToDocument').returns(true);
            sinon.stub(docs, 'getOne').resolves();
            let error;
            try {
                await document.getDocumentById();
            } catch (err) {
                error = err
            }


            expect(error).to.be.undefined;
        });

        it('should throw an error if user does not have access', async () => {

            sinon.stub(userApplicationLayer, 'findUser').resolves();
            sinon.stub(documentRules, 'userHasAccessToDocument').returns(false);

            let error;
            try {
                await document.getDocumentById();
            } catch (err) {
                error = err;
            }

            expect(error).to.exist;
        });
    });

    describe('updateDocument has integrated userHasAccessToDocument correctly', () => {
        it('should not throw an error because user has access to the document', async () => {
            sinon.stub(userApplicationLayer, 'findUser').resolves();
            sinon.stub(documentRules, 'userHasAccessToDocument').returns(true);
            sinon.stub(docs, 'updateContent').resolves();
            let error;
            try {
                await document.updateDocument();
            } catch (err) {
                error = err;
            }
            expect(error).to.be.undefined;
        });

        it('should throw an error because user does not have access to the document', async () => {
            sinon.stub(userApplicationLayer, 'findUser').resolves();
            sinon.stub(documentRules, 'userHasAccessToDocument').returns(false);
            sinon.stub(docs, 'updateContent').resolves();
            let error;
            try {
                await document.updateDocument();
            } catch (err) {
                error = err;
            }
            expect(error).to.exist;
        });
    });


    describe('subscribe is implemented correctly', () => {
        it('should allow subscription if user has access', async () => {

            sinon.stub(userApplicationLayer, 'findUser').resolves();
            sinon.stub(documentRules, 'userHasAccessToDocument').returns(true);

            let error;
            try {
                await document.subscribe();
            } catch (err) {
                error = err;
            }

            expect(error).to.be.undefined;
        });

        it('should throw an error if user does not have access', async () => {

            sinon.stub(userApplicationLayer, 'findUser').resolves();
            sinon.stub(documentRules, 'userHasAccessToDocument').returns(false);

            let error;
            try {
                await document.subscribe();
            } catch (err) {
                error = err;
            }

            expect(error).to.exist;
        });
    });

    describe('createDocument is implemented correctly', () => {
        it('should create a document if user can create', async () => {

            sinon.stub(userApplicationLayer, 'findUser').resolves();
            sinon.stub(documentRules, 'userCanCreateDocument').returns(true);
            sinon.stub(docs, 'addOne').resolves();

            let error;
            try {
                await document.createDocument();
            } catch (err) {
                error = err;
            }

            expect(error).to.be.undefined;
        });

        it('should throw an error if user cannot create a document', async () => {

            sinon.stub(userApplicationLayer, 'findUser').resolves();
            sinon.stub(documentRules, 'userCanCreateDocument').returns(false);

            let error;
            try {
                await document.createDocument();
            } catch (err) {
                error = err;
            }

            expect(error).to.exist;
        });
    });

});
