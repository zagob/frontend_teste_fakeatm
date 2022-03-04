import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import { ChakraProvider } from "@chakra-ui/react";
import { globalTheme } from "./styles/globalTheme";
import { AuthProvider } from "./hooks/AuthContext";

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <ChakraProvider theme={globalTheme}>
        <App />
      </ChakraProvider>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
