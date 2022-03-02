import { extendTheme } from "@chakra-ui/react";

export const globalTheme = extendTheme({
  styles: {
    global: {
        body: {
            bg: '#2b2a33',
            color: '#fff',
            fontFamily: 'Roboto Mono'
        }
    },
  },
});
