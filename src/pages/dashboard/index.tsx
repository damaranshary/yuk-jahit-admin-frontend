import { Container, Heading, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast({
        description: "Silahkan login terlebih dahulu",
        status: "warning",
        isClosable: true,
        duration: 1500,
      });
      navigate("/");
    }
  }, [token]);

  return (
    <Container mt={10}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dashboard | YukJahit admin</title>
      </Helmet>
      <Heading>SELAMAT DATANG ADMIN</Heading>
    </Container>
  );
};

export default Dashboard;
