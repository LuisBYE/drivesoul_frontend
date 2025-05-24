"use client";
import React, { createContext, useState } from "react";

export const FormContext = createContext();

export function FormProvider({ children }) {
  const [formValues, setFormValues] = useState({});

  return (
    <FormContext.Provider value={{ formValues, setFormValues }}>
      {children}
    </FormContext.Provider>
  );
}
