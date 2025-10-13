import {
  Box,
  Flex,
  HStack,
  IconButton,
  Text,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  VStack,
  useDisclosure,
  Image,
  useToast,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiHome, FiFileText, FiActivity } from "react-icons/fi";

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = () => {
    // ✅ 토큰/세션 삭제
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    sessionStorage.clear();

    // ✅ 알림 메시지
    toast({
      title: "로그아웃 성공",
      description: "다시 로그인 해주세요.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    // ✅ 로그인 페이지로 이동
    navigate("/login");
  };

  return (
    <>
      {/* 헤더 */}
      <Flex
        as="header"
        bg="white"
        shadow="sm"
        px={4}
        py={3}
        align="center"
        justify="space-between"
        position="sticky"
        top="0"
        zIndex="1000"
      >
        {/* 좌측: 햄버거(모바일) + 메뉴(데스크탑) */}
        <HStack spacing={6}>
          <IconButton
            aria-label="Open Menu"
            icon={<HamburgerIcon />}
            display={{ base: "inline-flex", md: "none" }}
            onClick={onOpen}
            variant="ghost"
          />
          <HStack spacing={6} display={{ base: "none", md: "flex" }}>
            <HStack as={Link} to="/dashboard" spacing={2}>
              <FiHome />
              <Text fontSize="sm" fontWeight="medium">
                대시보드
              </Text>
            </HStack>
            <HStack as={Link} to="/contents" spacing={2}>
              <FiFileText />
              <Text fontSize="sm" fontWeight="medium">
                컨텐츠
              </Text>
            </HStack>
            <HStack as={Link} to="/oral-check" spacing={2}>
              <FiActivity />
              <Text fontSize="sm" fontWeight="medium">
                구강검진
              </Text>
            </HStack>
            <HStack as={Link} to="/oral-status" spacing={2}>
              <FiActivity />
              <Text fontSize="sm" fontWeight="medium">
                구강상태
              </Text>
            </HStack>
          </HStack>
        </HStack>

        {/* 가운데 로고 */}
        <Box>
          <Image
            src="/images/DentiGlobal.png"
            alt="Logo"
            height="50px"
            objectFit="contain"
            mx="auto"
          />
        </Box>

        {/* 우측: 프로필 + 로그아웃 버튼 */}
        <HStack spacing={4}>
          <IconButton
            aria-label="Profile"
            icon={<FiUser />}
            variant="ghost"
            fontSize="lg"
          />
          <Button
            size="sm"
            bg="blue.600"
            color="white"
            _hover={{ bg: "blue.700" }}
            onClick={handleLogout}
          >
            로그아웃
          </Button>
        </HStack>
      </Flex>

      {/* 모바일 사이드바 */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <VStack align="flex-start" spacing={6} mt={10}>
              <HStack as={Link} to="/dashboard" spacing={3} onClick={onClose}>
                <FiHome />
                <Text>대시보드</Text>
              </HStack>
              <HStack as={Link} to="/contents" spacing={3} onClick={onClose}>
                <FiFileText />
                <Text>컨텐츠</Text>
              </HStack>
              <HStack as={Link} to="/oral-check" spacing={3} onClick={onClose}>
                <FiActivity />
                <Text>구강검진</Text>
              </HStack>
              <HStack as={Link} to="/oral-status" spacing={3} onClick={onClose}>
                <FiActivity />
                <Text>구강상태</Text>
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
