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

export default function Login() {
  const [language, setLanguage] = useState("ko");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleFocus = (field: string) => setFocusedField(field);
  const handleBlur = () => setFocusedField(null);

  const handleLogin = () => {
    // 지금은 무조건 로그인 성공 처리
    localStorage.setItem("isAuthenticated", "true");
    navigate("/dashboard");
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
