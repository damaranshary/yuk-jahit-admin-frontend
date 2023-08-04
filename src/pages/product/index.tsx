import {
  Button,
  Center,
  Container,
  Flex,
  SimpleGrid,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";

import ProductCard from "../../components/productCard";

import { useEffect, useState } from "react";
import { ResponseProducts, fetchAllProducts } from "../../api/product";

import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FiPlusSquare } from "react-icons/fi";

const AllProducts = () => {
  const [products, setProducts] = useState<ResponseProducts | undefined>(
    undefined
  );

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const toast = useToast();

  const getProductsData = async () => {
    await fetchAllProducts().then((res) => {
      setProducts(res);
    });
  };

  useEffect(() => {
    getProductsData();
  }, []);

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
    <Container maxW="6xl" mx="auto">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Semua Produk | YukJahit admin</title>
      </Helmet>
      <Flex mt={5} mb={1}>
        <Text as="h2" fontSize="2xl" fontWeight="bold">
          Semua Produk{" "}
        </Text>
        <Spacer />
        <Button
          id="ke-tambah-produk-button"
          as={RouterLink}
          to="/products/add"
          colorScheme="green"
          leftIcon={<FiPlusSquare />}
        >
          Tambah Produk
        </Button>
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing="30px" my={8}>
        {/* this is the grid layout to shows the product card */}
        {products ? (
          products.data.map((product, index) => {
            return (
              <ProductCard
                product={product}
                key={product._id}
                index={index}
                getProductsData={getProductsData}
              />
            );
          })
        ) : (
          <Center>
            <Text>Belum ada produk</Text>
          </Center>
        )}
      </SimpleGrid>
    </Container>
  );
};

export default AllProducts;
