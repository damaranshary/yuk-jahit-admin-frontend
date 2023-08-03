import {
  Button,
  Center,
  Container,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";

import { useNavigate } from "react-router-dom";

const NotFound404 = () => {
  // this component is used for showing the 404 page
  const navigate = useNavigate();
  return (
    <Container id="404-page" maxW="6xl" centerContent>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Halaman tidak ditemukan | YukJahit admin</title>
      </Helmet>
      <VStack as={Center} my={20}>
        <Image src="/404.jpg" alt="404" width="40%" h="40%" />
        <Text as="h1" fontSize="3xl" fontWeight="bold">
          Halaman tidak ditemukan
        </Text>
        <Button
          colorScheme="green"
          variant="outline"
          onClick={() => navigate(-1)}
        >
          Kembali
        </Button>
      </VStack>
    </Container>
  );
};

export default NotFound404;
