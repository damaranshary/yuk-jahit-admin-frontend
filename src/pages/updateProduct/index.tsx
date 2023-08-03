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
  Image,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { fetchProductById, updateProduct } from "../../api/product";

import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const [productData, setProductData] = useState({
    name: "",
    price: 0,
    description: "",
    category: "",
  });

  useEffect(() => {
    const getProductById = async () => {
      id &&
        (await fetchProductById(id).then((res) => {
          setProductData({
            name: res.data.name,
            price: res.data.price,
            description: res.data.description,
            category: res.data.category,
          });
          setProductImgLink(res.data.product_img);
        }));
    };
    getProductById();
  }, []);

  const [productImgLink, setProductImgLink] = useState<string | null>(null);

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
      navigate("/login");
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
      id &&
      (await updateProduct({ ...productData, id }, token, productImg)
        .then(() => {
          toast({
            title: "Data produk berhasil diubah",
            status: "success",
            duration: 1500,
            isClosable: true,
          });
        })
        .catch(() => {
          toast({
            title: "Data produk gagal diubah",
            status: "error",
            duration: 1500,
            isClosable: true,
          });
        })
        .finally(() => {
          setIsSubmitting(false);
        }));
  };

  return (
    <Container maxW="3xl">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Ubah Data Produk | YukJahit admin</title>
      </Helmet>
      <Text as="h2" fontSize="2xl" fontWeight="bold" my={5}>
        Ubah Produk
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
        {productImgLink && <Image src={productImgLink} w="200px" h="200px" />}
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
        <Flex>
          <Button
            id="submit-ubah-button"
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
            Ubah
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};

export default EditProduct;
