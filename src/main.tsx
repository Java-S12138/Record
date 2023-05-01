import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider,extendTheme } from '@chakra-ui/react'
import {Match} from "./view/match";
import "./styles.css";
import {tagTheme} from "./utils/theme";

const theme = extendTheme({
  components: {
    Tag: tagTheme
  }
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Match />
    </ChakraProvider>
  // </React.StrictMode>
);
