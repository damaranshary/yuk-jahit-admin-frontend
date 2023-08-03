import { ProductCard, deleteProductById } from "../../api/product";

import {
  Box,
  Button,
  Center,
  Image,
  Text,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const ProductsCard = ({ product, index }: ProductCard) => {
  const { _id, name, price, product_img } = product;
  // this component is used for showing the product details in the products page

  const token = localStorage.getItem("token");
  const toast = useToast();

  const handleDelete = async () => {
    token &&
      (await deleteProductById(_id, token)
        .then((res) => {
          toast({
            title: `Produk ${res.data.name} berhasil dihapus`,
            status: "success",
            duration: 1500,
            isClosable: true,
          });
        })
        .catch(() => {
          toast({
            title: "Produk gagal dihapus",
            status: "error",
            duration: 1500,
            isClosable: true,
          });
        }));
  };

  return (
    <Box
      key={_id}
      id={`product-card-${index + 1}`}
      _hover={{
        shadow: "lg",
      }}
      shadow="md"
      boxShadow="base"
      p={6}
      maxW={{ base: "full", md: "md", lg: "lg" }}
      borderRadius={10}
    >
      <Center>
        <Image
          src={product_img}
          alt={name}
          borderRadius={10}
          objectFit={{ base: "cover", md: "contain", lg: "contain" }}
          loading="lazy"
          w={{ base: "200px", md: "150px", lg: "100px" }}
          h={{ base: "200px", md: "150px", lg: "100px" }}
        />
      </Center>
      <Flex
        flexDirection="column"
        maxW="lg"
        mt="4"
        fontSize={{ base: "lg", sm: "md", md: "sm" }}
      >
        <Text id={`product-name-${index + 1}`} fontWeight="semibold">
          {name}
        </Text>
        <Text as="p" fontSize="sm">
          by{" "}
          <Text as="span" color="green" fontSize="sm">
            YukJahit
          </Text>
        </Text>
        <Text as="p" fontWeight="semibold" mt={2}>
          Rp {price.toLocaleString("id-ID")}
        </Text>
      </Flex>
      <Flex as={Center} gap={2} mt={3}>
        <Button
          as={RouterLink}
          to={`/products/${_id}`}
          id={`ubah-produk-button-${index + 1}`}
          colorScheme="green"
          borderRadius="full"
          size="sm"
          px={10}
          fontSize="sm"
          variant="outline"
        >
          Ubah
        </Button>
        <Button
          id={`hapus-produk-button-${index + 1}`}
          colorScheme="red"
          borderRadius="full"
          size="sm"
          px={10}
          fontSize="sm"
          variant="solid"
          onClick={handleDelete}
        >
          Hapus
        </Button>
      </Flex>
    </Box>
  );
};

export default ProductsCard;
