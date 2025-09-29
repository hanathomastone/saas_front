import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import axios from "axios"; // 👈 isAxiosError 사용

type VerifyForm = {
  userName: string;
  userPhoneNumber: string;
};

export default function RegisterVerify() {
  const [form, setForm] = useState<VerifyForm>({
    userName: "",
    userPhoneNumber: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleVerify = async () => {
    if (!form.userName || !form.userPhoneNumber) {
      toast({
        title: "이름과 전화번호를 입력해주세요.",
        status: "warning",
        duration: 2500,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);

      // ✅ 회원가입 확인
      const res = await api.post("/login/verify", form);
      const userId: number | null = res.data?.response?.userId ?? null;

      if (userId) {
        toast({
          title: "이미 가입된 사용자입니다. 로그인해주세요.",
          status: "info",
          duration: 2500,
          isClosable: true,
        });
        navigate("/login");
      } else {
        toast({
          title: "본인 확인 완료",
          description: "회원가입 단계로 이동합니다.",
          status: "success",
          duration: 2500,
          isClosable: true,
        });
        // 가입 폼으로 값 전달
        navigate("/register/form", { state: form });
      }
    } catch (error: unknown) {
      // 👇 any 대신 unknown + 안전한 분기
      const msg = axios.isAxiosError(error)
        ? (error.response?.data as { rtMsg?: string } | undefined)?.rtMsg ??
          "입력 정보를 확인해주세요."
        : "오류가 발생했습니다.";
      toast({
        title: "본인 확인 실패",
        description: msg,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Flex
        w="900px"
        h="500px"
        bg="white"
        borderRadius="md"
        overflow="hidden"
        shadow="lg"
      >
        {/* 왼쪽 영역 */}
        <Flex
          flex="1"
          bg="blue.600"
          color="white"
          direction="column"
          align="center"
          justify="center"
          p={8}
        >
          <Heading size="md" mb={4}>
            Hello, welcome to!
          </Heading>
          <Box mb={4}>
            <img src="/images/logo.png" alt="logo" width="80" />
          </Box>
          <Text textAlign="center" mb={6}>
            간단한 정보를 입력해 본인 확인을 진행하세요.
          </Text>
          <Button
            variant="outline"
            color="white"
            onClick={() => navigate("/login")}
          >
            SIGN IN ▶
          </Button>
        </Flex>

        {/* 오른쪽 영역 */}
        <Flex flex="1.2" direction="column" p={10} justify="center">
          <Heading size="lg" mb={6}>
            Verify your account
          </Heading>
          <VStack spacing={5} align="stretch">
            <FormControl>
              <FormLabel>이름</FormLabel>
              <Input
                name="userName"
                value={form.userName}
                onChange={handleChange}
                placeholder="홍길동"
              />
            </FormControl>

            <FormControl>
              <FormLabel>전화번호</FormLabel>
              <Input
                name="userPhoneNumber"
                value={form.userPhoneNumber}
                onChange={handleChange}
                placeholder="01012345678"
              />
            </FormControl>

            <Button
              colorScheme="blue"
              w="100%"
              h="50px"
              onClick={handleVerify}
              isLoading={loading}
            >
              확인
            </Button>
          </VStack>
        </Flex>
      </Flex>
    </Flex>
  );
}
