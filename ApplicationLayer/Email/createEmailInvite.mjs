
import getFrontendUrl from "../GetFrontendUrl.mjs";

export default (token, email) => {
    return {
        html: `<p>You have been invited to a document. <li><a href=${getFrontendUrl()}/document/invite/${token}>Accept the invite here</a></li></p>`,
        receiver: email,
        text: "You have been invited to a document. Accept the invite here: ",
        subject: "Document Invitation"
    }
}

