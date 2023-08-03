import { Container, Heading, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
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
      <Heading>SELAMAT DATANG ADMIN</Heading>
    </Container>
  );
};

export default Dashboard;
