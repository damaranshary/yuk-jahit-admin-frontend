import {
    Box,
    Button,
    Container,
    HStack,
    Image,
    Text,
  } from "@chakra-ui/react";
  import { Helmet } from "react-helmet-async";
  
  import { Link as RouterLink, useNavigate } from "react-router-dom";
  
  const NotFound404 = () => { // this component is used for showing the 404 page
    const navigate = useNavigate();
    return (
      <Container id="404-page" maxW="6xl" centerContent>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Halaman tidak ditemukan | YukJahit admin</title>
        </Helmet>
        <Box my={20}>
          <Image src="/404.jpg" alt="404" width="60%" h="60%" />
          <Text as="h1" fontSize="3xl" fontWeight="bold">
            Halaman tidak ditemukan
          </Text>
          <Text>
            Mungkin kamu salah jalan atau alamat, Ayo balik sebelum gelap
          </Text>
          <HStack gap={2} mt={5}>
            <Button
              colorScheme="green"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Kembali
            </Button>
            <Text>atau </Text>
            <Button as={RouterLink} colorScheme="green" to="/">
              Kembali ke Beranda
            </Button>
          </HStack>
        </Box>
      </Container>
    );
  };
  
  export default NotFound404;