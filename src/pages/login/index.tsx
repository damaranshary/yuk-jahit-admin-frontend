import {
  Container,
  Center,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { fetchLoginData } from "../../api/admin";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const { email, password } = loginData;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await fetchLoginData(loginData)
      .then((res) => {
        setIsSubmitting(true);
        localStorage.setItem("token", res.token);
        navigate("/");
      })
      .catch(() => {})
      .finally(() => {
        setLoginData({ email: "", password: "" });
        setIsSubmitting(false);
      });
  };

  const handleOnChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  return (
    <Container
      as={Flex}
      centerContent
      minW="6xl"
      minH={"100vh"}
      align={"center"}
      justify={"center"}
    >
      <Helmet>
        <meta charSet="utf-8" />
        <title>Masuk | YukJahit admin</title>
      </Helmet>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Flex as={Center}>
          <Text as="h1" fontSize="4xl" fontWeight="bold">
            Yuk
            <Text as="span" color="green.500">
              Jahit
            </Text>
          </Text>
          <Text
            fontWeight="bold"
            color="black"
            fontSize="9px"
            alignContent="end"
          >
            admin
          </Text>
        </Flex>
        <Box
          minW="400px"
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack as="form" onSubmit={handleOnSubmit} spacing={4}>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                id="email-login"
                type="email"
                name="email"
                value={email}
                onChange={handleOnChange}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                id="password-login"
                type="password"
                name="password"
                value={password}
                onChange={handleOnChange}
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                id="login-button"
                colorScheme="green"
                type="submit"
                isLoading={isSubmitting}
              >
                Masuk
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default Login;
