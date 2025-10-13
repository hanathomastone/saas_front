import { Box } from "@chakra-ui/react";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box minH="100vh" bg="gray.50">
      {/* 공통 헤더 */}
      <Header />

      {/* 메인 콘텐츠 영역 */}
      <Box
        as="main"
        maxW="90%" // ✅ 화면 폭의 90%만 사용
        mx="auto" // ✅ 가운데 정렬
        px={{ base: 4, md: 8 }}
        py={6}
      >
        {children}
      </Box>
    </Box>
  );
}
