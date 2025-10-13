import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Select,
  Tab,
  TabList,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import api from "../api"; // ✅ axios 클라이언트
// import axios from "axios";

export default function Login() {
  const [language, setLanguage] = useState("ko");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleFocus = (field: string) => setFocusedField(field);
  const handleBlur = () => setFocusedField(null);

  const handleLogin = async () => {
    try {
      const res = await api.post("/login", {
        loginId: id,
        password: password,
        userType: "user",
      });

      // ✅ 실패 응답 처리 (rt가 있으면 무조건 실패)
      if (res.data.rt) {
        setError(res.data.rtMsg || "로그인 실패");
        return;
      }

      // ✅ 성공 응답 처리
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("userName", res.data.userName);
      localStorage.setItem("userId", res.data.userId.toString());

      navigate("/dashboard");
    } catch (err) {
      console.error("로그인 중 오류 발생:", err);
      setError("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="white" px={6}>
      <Box w="100%" maxW="400px">
        {/* Header */}
        <Flex justify="space-between" align="center" mb={6}>
          {/* 뒤로가기 버튼 */}
          <Button
            variant="ghost"
            p={0}
            minW="auto"
            onClick={() => console.log("뒤로가기")}
          >
            <Image src="/images/back.png" alt="뒤로가기" w="14px" h="14px" />
          </Button>

          {/* 언어 선택 */}
          <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            w="120px"
            borderRadius="md"
            border="1px solid"
            borderColor="gray.300"
            fontSize="sm"
            textAlign="center"
            iconSize="16px"
          >
            <option value="ko">한국어</option>
            <option value="en">English</option>
            <option value="vi">베트남어</option>
          </Select>
        </Flex>

        {/* Dentix 로고 */}
        <Image
          src="/images/denti_x.png"
          alt="Dentix Logo"
          mx="auto"
          mb={8}
          h="40px"
        />

        {/* Tabs */}
        <Tabs variant="unstyled" align="center" mb={6}>
          <TabList borderBottom="1px solid" borderColor="gray.200">
            <Tab
              _selected={{
                color: "blue.600",
                borderBottom: "2px solid",
                borderColor: "blue.600",
              }}
              flex="1"
            >
              개인 회원
            </Tab>
            <Tab
              _selected={{
                color: "blue.600",
                borderBottom: "2px solid",
                borderColor: "blue.600",
              }}
              flex="1"
              color="gray.400"
            >
              관리자 회원
            </Tab>
          </TabList>
        </Tabs>

        {/* Input Fields */}
        <Box mb={4}>
          <FormControl>
            <FormLabel>아이디</FormLabel>
            <Input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              onFocus={() => handleFocus("id")}
              onBlur={handleBlur}
              borderColor={focusedField === "id" ? "red.400" : "gray.300"}
              focusBorderColor="red.400"
              _hover={{
                borderColor: focusedField === "id" ? "red.400" : "gray.400",
              }}
            />
          </FormControl>
        </Box>

        <Box mb={6}>
          <FormControl>
            <FormLabel>비밀번호</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => handleFocus("pw")}
              onBlur={handleBlur}
              borderColor={focusedField === "pw" ? "red.400" : "gray.300"}
              focusBorderColor="red.400"
              _hover={{
                borderColor: focusedField === "pw" ? "red.400" : "gray.400",
              }}
            />
          </FormControl>
        </Box>

        {/* Login Button */}
        <Button
          colorScheme="blue"
          w="100%"
          h="50px"
          mb={4}
          onClick={handleLogin}
        >
          로그인
        </Button>

        {/* 에러 메시지 */}
        {error && (
          <Text color="red.500" textAlign="center" mb={4}>
            {error}
          </Text>
        )}

        {/* Footer Links */}
        <Flex justify="center" gap={4} mt={4} fontSize="sm" color="gray.500">
          <RouterLink to="/register/verify">
            <Text as="span" color="blue.500" cursor="pointer">
              회원가입
            </Text>
          </RouterLink>
          <Text>|</Text>
          <RouterLink to="/find-password">
            <Text as="span" color="blue.500" cursor="pointer">
              비밀번호 찾기
            </Text>
          </RouterLink>
          <Text>|</Text>
          <RouterLink to="/contact" state={{ from: "login" }}>
            <Text as="span" color="blue.500" cursor="pointer">
              문의하기
            </Text>
          </RouterLink>
        </Flex>
      </Box>
    </Flex>
  );
}

// import { Box, Heading, Button, VStack } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";

// export default function LoginPage() {
//   const navigate = useNavigate();

//   return (
//     <Box
//       minH="100vh"
//       bg="gray.50"
//       display="flex"
//       alignItems="center"
//       justifyContent="center"
//     >
//       <VStack spacing={6} p={10} bg="white" shadow="xl" borderRadius="xl">
//         <Heading color="blue.600">Denti Global 로그인</Heading>
//         <Button colorScheme="blue" onClick={() => navigate("/contents")}>
//           로그인
//         </Button>
//       </VStack>
//     </Box>
//   );
// }
