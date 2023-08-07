import {
  Button,
  Box,
  Card,
  Container,
  Flex,
  Image,
  Spacer,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";

import { OrderData, deleteOrder } from "../../api/order";

import DetailOrderModal from "../detailOrderModal";

const OrderCard = (props: OrderData) => {
  // this component is used for showing the order details in the order history page
  const getDate = (something: string) => {
    // this is the function to get the date
    const date = new Date(something);
    return date
      .toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })
      .replace("pukul", "|")
      .replace(".", ":")
      .concat(" WIB"); // this is the format of the date that will be shown "DD Month YYYY | HH:MM WIB"
  };

  const { updatedAt, _id, products, status, bill, index } = props; // destructuring the props

  const token = localStorage.getItem("token");
  const dateUpdated = getDate(updatedAt); // this is the date that will be shown
  const toast = useToast();

  const handleDeleteOrder = async () => {
    token &&
      (await deleteOrder(token, _id)
        .then((res) => {
          console.log(res);
          toast({
            title: `Transaksi berhasil dihapus`,
            status: "success",
            duration: 1500,
            isClosable: true,
          });
        })
        .catch(() => {
          toast({
            title: "Transaksi gagal dihapus",
            status: "error",
            duration: 1500,
            isClosable: true,
          });
        })
        .finally(() => props.getOrderData()));
  };

  return (
    <Container
      as={Card}
      maxW="6xl"
      key={_id}
      shadow="md"
      p={5}
      my={5}
      id={`order-card-${index + 1}`}
      className="order-card"
    >
      <Flex gap={3} maxW="6xl" mt={2} alignItems="center">
        <Text as="h3" fontWeight="semibold">
          Belanja
        </Text>
        <Spacer />
        {status === "settlement" && (
          <Text
            id={`order-status-${index + 1}`}
            as="p"
            fontSize="sm"
            color="white"
            display="block"
            bgColor="green"
            px={2}
            py={1}
            borderRadius={5}
          >
            Selesai
          </Text>
        )}
        {status === "pending" && (
          <Text
            id={`order-status-${index + 1}`}
            as="p"
            fontSize="sm"
            color="white"
            display="block"
            bgColor="yellow.400"
            px={2}
            py={1}
            borderRadius={5}
          >
            Belum dibayar
          </Text>
        )}
        {status === "expire" && (
          <Text
            id={`order-status-${index + 1}`}
            as="p"
            fontSize="sm"
            color="white"
            display="block"
            bgColor="gray"
            px={2}
            py={1}
            borderRadius={5}
          >
            Kedaluwarsa
          </Text>
        )}
        {status === "cancel" && (
          <Text
            id={`order-status-${index + 1}`}
            as="p"
            fontSize="sm"
            color="white"
            display="block"
            bgColor="red"
            px={2}
            py={1}
            borderRadius={5}
          >
            Dibatalkan
          </Text>
        )}
      </Flex>
      <Flex gap={3} maxW="6xl" mt={2} mb={4} alignItems="center">
        <Text as="p" fontSize="sm">
          {dateUpdated}
        </Text>
        <Spacer />
        <Text as="p" fontSize="sm">
          {_id}
        </Text>
      </Flex>

      <Flex
        flexDirection={{ base: "column", sm: "row" }}
        alignItems="center"
        justifyContent="space-between"
        gap={2}
      >
        {/* Showing the first image of the products in the order */}
        <Image
          src={products[0].product_img}
          alt={products[0].name}
          maxW="100px"
          maxH="100px"
          loading="lazy"
          borderRadius={10}
          mx={5}
        />
        {products.length > 1 ? (
          <VStack>
            <Text as="h3" fontSize="md" fontWeight="semibold">
              {products[0].name} dan {products.length - 1} produk lainnya
            </Text>
          </VStack>
        ) : (
          <Text as="h3" fontSize="md" fontWeight="semibold">
            {products[0].name}
          </Text>
        )}
        <Spacer />
        <Box as={Flex} alignItems="center" flexDirection="column">
          <Text>Total Belanja</Text>
          <Text fontWeight="bold">Rp {bill.toLocaleString("id-ID")}</Text>
        </Box>
      </Flex>
      <Flex alignItems="end" gap={3}>
        <Spacer />
        <DetailOrderModal {...props} />
        <Button
          id={`hapus-transaksi-button-${index + 1}`}
          colorScheme="red"
          borderRadius="full"
          size="sm"
          px={5}
          fontSize="sm"
          variant="solid"
          mt={3}
          onClick={handleDeleteOrder}
        >
          Hapus Transaksi
        </Button>
      </Flex>
    </Container>
  );
};

export default OrderCard;
