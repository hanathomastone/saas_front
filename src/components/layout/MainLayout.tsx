import type { ReactNode } from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import { logout } from "../../utils/auth";
import Sidebar from "./Sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Flex minH="100vh">
      <Sidebar />
      <Box flex="1" ml={{ base: "70px", md: "240px" }}>
        {/* 헤더 */}
        <Flex
          bg="white"
          px={6}
          py={4}
          justify="space-between"
          align="center"
          borderBottom="1px solid"
          borderColor="gray.200"
        >
          <Image src="/images/denti_x.png" alt="Dentix Logo" h="30px" />
          <Box
            as="button"
            onClick={logout}
            color="red.500"
            fontWeight="medium"
          >
            로그아웃
          </Box>
        </Flex>

        {/* 본문 */}
        <Box p={6}>{children}</Box>
      </Box>
    </Flex>
  );
}
