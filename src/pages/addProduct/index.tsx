import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Text,
  Input,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { addProduct } from "../../api/product";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    price: 0,
    description: "",
    category: "",
  });

  const [productImg, setProductImg] = useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleOnChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleInputImageOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProductImg(e.target.files[0]);
    }
  };

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    productImg &&
      token &&
      (await addProduct(productData, productImg, token)
        .then(() => {
          toast({
            title: "Produk berhasil ditambahkan",
            status: "success",
            duration: 1500,
            isClosable: true,
          });
        })
        .catch(() => {
          toast({
            title: "Produk gagal ditambahkan",
            status: "error",
            duration: 1500,
            isClosable: true,
          });
        })
        .finally(() => {
          setProductData({ name: "", description: "", category: "", price: 0 });
          setProductImg(null);
          setIsSubmitting(false);
        }));
  };

  return (
    <Container maxW="3xl">
      <Text as="h2" fontSize="2xl" fontWeight="bold" my={5}>
        Tambah Produk
      </Text>
      <Flex
        as="form"
        flexDirection="column"
        w={{ base: "sm", md: "lg", lg: "xl" }}
        onSubmit={handleOnSubmit}
        mt={3}
        gap={3}
        alignItems="center"
      >
        <FormControl isRequired>
          <FormLabel>Nama</FormLabel>
          <Input
            id="nama-produk"
            name="name"
            type="text"
            value={productData.name}
            onChange={handleOnChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Harga</FormLabel>
          <Input
            id="harga-produk"
            name="price"
            type="number"
            value={productData.price}
            onChange={handleOnChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Kategori</FormLabel>
          <Select
            placeholder="Pilih Kategori Produk"
            name="category"
            onChange={handleOnChange}
          >
            {["Celana Panjang", "Celana Pendek", "Kaos", "Kemeja"].map(
              (value) => (
                <option value={value} key={value}>
                  {value}
                </option>
              )
            )}
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Deskripsi</FormLabel>
          <Textarea
            id="deskripsi-produk"
            name="description"
            value={productData.description}
            onChange={handleOnChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Gambar</FormLabel>
          <Input
            id="gambar-produk"
            name="image"
            accept="image/jpg, image/png, image/jpeg"
            type="file"
            onChange={handleInputImageOnChange}
          />
        </FormControl>
        <Button
          id="tambah-produk-submit-button"
          type="submit"
          isDisabled={
            productData.name === "" ||
            productData.price === 0 ||
            productData.category === "" ||
            productData.description === "" ||
            productImg === null ||
            token === null
          }
          w={{ base: "full", md: "200px" }}
          mt={5}
          colorScheme="green"
          borderRadius="30px"
          isLoading={isSubmitting}
          loadingText="Submitting"
        >
          Tambah
        </Button>
      </Flex>
    </Container>
  );
};

export default AddProduct;
