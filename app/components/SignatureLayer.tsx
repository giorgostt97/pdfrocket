"use client";

import { useSignature } from "../context/SignatureContext";
import SignatureOverlay from "./SignatureOverlay";

type Props = {
  pageNumber: number;
};

export default function SignatureLayer({
  pageNumber,
}: Props) {
  const { signatures } = useSignature();

  const pageSignatures = signatures.filter(
    (signature) => signature.page === pageNumber
  );

  return (
    <>
      {pageSignatures.map((signature) => (
        <SignatureOverlay
          key={signature.id}
          signature={signature}
        />
      ))}
    </>
  );
}