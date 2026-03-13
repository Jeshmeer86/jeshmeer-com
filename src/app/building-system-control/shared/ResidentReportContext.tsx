import React, { createContext, useContext, useReducer, useEffect } from "react";

const STORAGE_KEY = "bsc-resident-report";

const initialState = {
  language: "en",
  startedAt: null,
  submittedAt: null,
  reference: null,
  status: null,
  category: "",
  urgency: "",
  location: "",
  commonArea: false,
  access: "",
  description: "",
  contactPhone: "",
  media: [], // { name, type, url }
  reviewConfirmed: false,
  privacyConfirmed: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "RESET":
      return { ...initialState, language: state.language };
    case "LOAD":
      return { ...state, ...action.payload };
    case "SET_LANGUAGE":
      return { ...state, language: action.language };
    case "SET_STARTED":
      return { ...state, startedAt: action.startedAt };
    case "SET_CATEGORY":
      return { ...state, category: action.category };
    case "SET_URGENCY":
      return { ...state, urgency: action.urgency };
    case "SET_LOCATION":
      return {
        ...state,
        location: action.location,
        commonArea: action.commonArea,
      };
    case "SET_ACCESS":
      return { ...state, access: action.access };
    case "SET_DESCRIPTION":
      return { ...state, description: action.description };
    case "SET_CONTACT_PHONE":
      return { ...state, contactPhone: action.contactPhone };
    case "SET_MEDIA":
      return { ...state, media: action.media };
    case "REMOVE_MEDIA":
      return {
        ...state,
        media: state.media.filter((_, i) => i !== action.index),
      };
    case "SET_REVIEW_CONFIRMED":
      return { ...state, reviewConfirmed: action.value };
    case "SET_PRIVACY_CONFIRMED":
      return { ...state, privacyConfirmed: action.value };
    case "SUBMIT":
      return {
        ...state,
        submittedAt: action.submittedAt,
        reference: action.reference,
        status: action.status,
      };
    default:
      return state;
  }
}

const ResidentReportContext = createContext(null);

export function ResidentReportProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    if (typeof window !== "undefined") {
      const saved = window.sessionStorage.getItem(STORAGE_KEY);
      if (saved) return { ...init, ...JSON.parse(saved) };
    }
    return init;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  return (
    <ResidentReportContext.Provider value={{ state, dispatch }}>
      {children}
    </ResidentReportContext.Provider>
  );
}

export function useResidentReport() {
  const ctx = useContext(ResidentReportContext);
  if (!ctx)
    throw new Error(
      "useResidentReport must be used within ResidentReportProvider",
    );
  return ctx;
}
