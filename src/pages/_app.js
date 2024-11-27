import React, { useEffect } from 'react';
import "@/styles/globals.css";
import Layout from "@/components/layout";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.0/css/all.min.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
