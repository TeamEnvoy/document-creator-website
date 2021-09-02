import { LoaderSpinner } from "@govtechsg/tradetrust-ui-components";
import { FunctionComponent, ReactElement } from "react";
import { CheckCircle, XCircle } from "react-feather";
import { QueueState, QueueType } from "../../../constants/QueueState";
import { WrappedDocument } from "../../../types";
interface ProcessDocumentTitle {
  queueState: QueueState;
  documents: WrappedDocument[];
  type: QueueType;
}

export const ProcessDocumentTitle: FunctionComponent<ProcessDocumentTitle> = ({ queueState, documents, type }) => {
  const isIssuingFlow = type === QueueType.ISSUE;

  const titleText = (message: string): ReactElement => {
    return <span data-testid="process-title">{message}</span>;
  };

  const getDisplayTitle = (): ReactElement => {
    switch (queueState) {
      case QueueState.PENDING:
        return (
          <>
            <LoaderSpinner className="mr-2" width="24px" primary="#00cbbc" secondary="#e2e8f0" />
            {titleText(`${isIssuingFlow ? "Publishing document(s)..." : "Revoking document..."}`)}
          </>
        );

      case QueueState.CONFIRMED:
        if (documents.length > 0) {
          return (
            <>
              <CheckCircle className="mr-2 text-teal-300" />
              {titleText(`${isIssuingFlow ? "Document(s) issued" : "Document revoked"} successfully`)}
            </>
          );
        } else {
          return (
            <>
              <XCircle className="mr-2 text-rose" />
              {titleText(`${isIssuingFlow ? "Document(s) failed to issue" : "Document failed to revoke"}`)}
            </>
          );
        }

      case QueueState.INITIALIZED:
      default:
        return titleText(`Please wait while we prepare your ${isIssuingFlow ? "document(s)" : "document"}`);
    }
  };

  return (
    <h3 data-testid="process-document-title" className="flex items-center mb-8">
      {getDisplayTitle()}
    </h3>
  );
};
