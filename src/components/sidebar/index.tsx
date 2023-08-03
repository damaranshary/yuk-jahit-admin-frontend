import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Spacer,
} from "@chakra-ui/react";
import {
  FiHome,
  FiCompass,
  FiMenu,
  FiFileText,
  FiLogOut,
} from "react-icons/fi";
import { IconType } from "react-icons";
import React, { ReactText } from "react";

import { Link as RouterLink, useNavigate } from "react-router-dom";

interface LinkItemProps {
  name: string;
  icon: IconType;
  to: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", icon: FiHome, to: "/" },
  { name: "Produk", icon: FiCompass, to: "/products" },
  { name: "Transaksi", icon: FiFileText, to: "/order" },
  { name: "Logout", icon: FiLogOut, to: "/logout" },
];

interface SimpleSidebarProps {
  children: React.ReactNode;
}

const SimpleSidebar = ({ children }: SimpleSidebarProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" minW="6xl">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="2px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Flex>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Yuk
            <Text as="span" color="green.500">
              Jahit
            </Text>
          </Text>
          <Spacer />
          <Text
            fontWeight="bold"
            color="black"
            fontSize="9px"
            alignContent="end"
          >
            admin
          </Text>
        </Flex>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} to={link.to}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  to: string;
}
const NavItem = ({ icon, children, to, ...rest }: NavItemProps) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <Box
      id={children.toString() + "-navigation"}
      as={RouterLink}
      to={children === "Logout" ? "/" : to}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      {children === "Logout" ? (
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "red.500",
            color: "white",
          }}
          onClick={handleLogout}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      ) : (
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "green.500",
            color: "white",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      )}
    </Box>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Flex>
        <Text as="h1" fontSize="2xl" fontWeight="bold">
          Yuk
          <Text as="span" color="green.500">
            Jahit
          </Text>
        </Text>
        <Spacer />
        <Text fontWeight="bold" color="black" fontSize="9px" alignContent="end">
          admin
        </Text>
      </Flex>
    </Flex>
  );
};

export default SimpleSidebar;
