import { ChakraProvider } from "@chakra-ui/react";
import AppRouter from "./router";
import theme from "./theme";
import { HelmetProvider } from "react-helmet-async";
import "@fontsource/inter/400.css";
import "@fontsource/open-sans/700.css";

function App() {
  return (
    <HelmetProvider>
      <ChakraProvider theme={theme}>
        <AppRouter />
      </ChakraProvider>
    </HelmetProvider>
  );
}

export default App;
