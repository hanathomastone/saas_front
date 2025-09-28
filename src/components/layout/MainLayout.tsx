import type { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import Header from "./Header";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box minH="100vh" bg="gray.50">
      {/* 상단 헤더 */}
      <Header />

      {/* 메인 콘텐츠 */}
      <Box pt="70px" px={6}>
        {children}
      </Box>
    </Box>
  );
}
