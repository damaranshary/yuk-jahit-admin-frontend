import { Center, Container, Text, useToast } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import OrderCard from "../../components/orderCard";
import { fetchAllOrders, ResponseOrder } from "../../api/order";
import { Helmet } from "react-helmet-async";

const Order = () => {
  const [orderData, setOrderData] = useState<ResponseOrder | undefined>(
    undefined
  );

  const toast = useToast();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const getOrderData = async () => {
    if (token) {
      await fetchAllOrders(token).then((res) => {
        setOrderData(res);
      });
    }
  };

  useEffect(() => {
    getOrderData();
  }, []);

  useEffect(() => {
    if (!token) {
      setOrderData(undefined);
      toast({
        description: "Silahkan login terlebih dahulu",
        status: "warning",
        isClosable: true,
        duration: 1500,
      });
      navigate("/");
    }
  }, [token, orderData]);

  return (
    <Container maxW="6xl">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Semua Transaksi | YukJahit admin</title>
      </Helmet>
      <Text as="h2" fontSize="2xl" fontWeight="bold" my={5}>
        Semua Transaksi
      </Text>
      {orderData && orderData.orders.length > 0 ? (
        orderData.orders.map((item, index) => {
          return (
            <OrderCard
              {...item}
              key={item._id}
              index={index}
              getOrderData={getOrderData}
            />
          );
        })
      ) : (
        <Center>
          <Text>Belum ada transaksi</Text>
        </Center>
      )}
    </Container>
  );
};

export default Order;
