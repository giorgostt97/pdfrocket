"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

import { SignatureItem } from "../types/signature";

type ContextType = {
  signatures: SignatureItem[];

  addSignature: (signature: SignatureItem) => void;

  updateSignature: (
    id: number,
    updates: Partial<SignatureItem>
  ) => void;

  deleteSignature: (id: number) => void;

  clearSignatures: () => void;
};

const SignatureContext =
  createContext<ContextType | null>(null);

export function SignatureProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [signatures, setSignatures] =
    useState<SignatureItem[]>([]);

  function addSignature(signature: SignatureItem) {
    setSignatures((prev) => [
      ...prev,
      signature,
    ]);
  }

  function updateSignature(
    id: number,
    updates: Partial<SignatureItem>
  ) {
    setSignatures((prev) =>
      prev.map((signature) =>
        signature.id === id
          ? {
              ...signature,
              ...updates,
            }
          : signature
      )
    );
  }

  function deleteSignature(id: number) {
    setSignatures((prev) =>
      prev.filter(
        (signature) => signature.id !== id
      )
    );
  }

  function clearSignatures() {
    setSignatures([]);
  }

  return (
    <SignatureContext.Provider
      value={{
        signatures,
        addSignature,
        updateSignature,
        deleteSignature,
        clearSignatures,
      }}
    >
      {children}
    </SignatureContext.Provider>
  );
}

export function useSignature() {
  const context =
    useContext(SignatureContext);

  if (!context) {
    throw new Error(
      "useSignature must be used inside SignatureProvider."
    );
  }

  return context;
}