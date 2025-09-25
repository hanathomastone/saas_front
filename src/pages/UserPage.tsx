import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export default function UserPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // 임시 로그아웃 처리
    localStorage.removeItem("accessToken");     // 토큰도 제거 (추후 API 연동 대비)
    navigate("/login");
  };

  return (
    <Box p={6} maxW="500px" mx="auto">
      {/* Header */}
      <Heading size="md" mb={6}>
        사용자 설정
      </Heading>

      {/* Profile Section */}
      <Flex
        align="center"
        justify="space-between"
        p={4}
        borderRadius="md"
        bg="gray.50"
        mb={6}
      >
        <Flex align="center" gap={4}>
          <Avatar size="lg" name="홍길동" />
          <Box>
            <Text fontWeight="bold">홍길동</Text>
            <Text fontSize="sm" color="gray.600">
              ABCDEFG12
            </Text>
            <Text fontSize="sm" color="gray.600">
              90.06.06 (32)
            </Text>
            <Text fontSize="sm" color="gray.600">
              010-1234-****
            </Text>
          </Box>
        </Flex>
        <RouterLink to="/reset-password" state={{ from: "user" }}>
          <Button size="sm" colorScheme="blue" variant="outline">
            비밀번호 변경
          </Button>
        </RouterLink>
      </Flex>

      {/* Service Settings */}
      <Box p={4} borderRadius="md" bg="gray.50" mb={6}>
        <Heading size="sm" mb={4}>
          서비스 설정
        </Heading>
        <Flex justify="space-between" align="center" mb={4}>
          <Text>마케팅 동의</Text>
          <Switch />
        </Flex>
        <Divider />
        <Flex justify="space-between" align="center" my={4}>
          <Text>자동 로그인</Text>
          <Switch defaultChecked />
        </Flex>
        <Divider />
        <Flex justify="space-between" align="center" mt={4}>
          <Text>양치질 횟수</Text>
          <Input type="number" defaultValue={3} width="60px" textAlign="center" />
        </Flex>
      </Box>

      {/* Service Menu */}
      <Box p={4} borderRadius="md" bg="gray.50" mb={6}>
        <Heading size="sm" mb={4}>
          서비스 이용
        </Heading>
        <Stack spacing={4}>
          <Button variant="ghost" justifyContent="flex-start">
            서비스 의료 정보
          </Button>
          <Divider />
          <Button variant="ghost" justifyContent="flex-start">
            구강검진 가이드
          </Button>
          <Divider />
          <RouterLink to="/contact" state={{ from: "user" }}>
            <Button variant="ghost" justifyContent="flex-start">
              문의하기
            </Button>
          </RouterLink>
          <Divider />
          <Button variant="ghost" justifyContent="flex-start">
            약관보기
          </Button>
          <Divider />
          <Button variant="ghost" justifyContent="flex-start" color="red.500">
            회원탈퇴
          </Button>
          <Divider />
          <Flex justify="space-between" align="center">
            <Text>버전정보</Text>
            <Text fontSize="sm">1.0.0</Text>
          </Flex>
          <Divider />
          <Button variant="ghost" justifyContent="flex-start">
            오픈소스 라이선스
          </Button>
        </Stack>
      </Box>

      {/* Logout */}
      <Button w="100%" colorScheme="gray" onClick={handleLogout}>
        로그아웃
      </Button>
    </Box>
  );
}
