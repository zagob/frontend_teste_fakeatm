import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import { ChakraProvider } from "@chakra-ui/react";
import { globalTheme } from "./styles/globalTheme";

ReactDOM.render(
  <BrowserRouter>
    <ChakraProvider theme={globalTheme}>
      <App />
    </ChakraProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
