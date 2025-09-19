import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client/react";
import createApolloClient from "@/lib/apollo-client";
import { Provider } from "@/components/ui/provider";

const client = createApolloClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </ApolloProvider>
  );
}
