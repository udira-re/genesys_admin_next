"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextIntlClientProvider } from "next-intl";

interface LocaleContextType {
  locale: string;
  setLocale: (locale: string) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}

function getLocale(): string {
  if (typeof window !== "undefined") {
    return localStorage.getItem("locale") || "en";
  }
  return "en";
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [locale, setLocale] = useState(getLocale);
  const [messages, setMessages] = useState<unknown>(null);

  useEffect(() => {
    import(`../../app/locales/${locale}.json`)
      .then((msgs) => setMessages(msgs.default || msgs))
      .catch(() => setMessages({}));
  }, [locale]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", locale);
    }
  }, [locale]);

  if (!messages) {
    return <div>Loading translations...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <LocaleContext.Provider value={{ locale, setLocale }}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </LocaleContext.Provider>
    </QueryClientProvider>
  );
}
