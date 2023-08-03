import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `"Open Sans", sans-serif`,
    body: `"Inter", sans-serif`,
  },
  colors: {
    green: {
      500: "#03AC0E",
    }
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "regular",
        borderRadius: 10,
      }
    }
  }
});

export default theme;
