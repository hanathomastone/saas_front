import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const isPasswordValid =
    password.length >= 8 &&
    password.length <= 20 &&
    /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const handleNext = () => {
    if (!userId) {
      toast({ title: "아이디를 입력해주세요.", status: "warning" });
      return;
    }
    if (!isPasswordValid) {
      toast({
        title: "비밀번호는 특수문자를 포함한 8~20자여야 합니다.",
        status: "error",
      });
      return;
    }
    if (password !== passwordCheck) {
      toast({ title: "비밀번호가 일치하지 않습니다.", status: "error" });
      return;
    }
    // 다음 단계로 이동
    navigate("/register/extra");
  };

  return (
    <Box p={6} maxW="400px" mx="auto">
      {/* 헤더 */}
      <Heading size="sm" mb={6}>
        아이디, 비밀번호 등록하기
      </Heading>

      <Text color="gray.600" mb={6}>
        로그인할 때 필요한 정보를 등록합니다.
      </Text>

      {/* 아이디 */}
      <FormControl mb={4}>
        <FormLabel>아이디 입력</FormLabel>
        <Input
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="아이디는 숫자나 영문만 사용 가능해요."
        />
        <Text fontSize="sm" color="gray.500">
          아이디는 숫자나 영문만 사용 가능해요.
        </Text>
      </FormControl>

      {/* 비밀번호 */}
      <FormControl mb={4}>
        <FormLabel>비밀번호 입력</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해주세요"
        />
        <Text fontSize="sm" color={isPasswordValid ? "green.500" : "red.500"}>
          {isPasswordValid
            ? "사용 가능한 비밀번호입니다."
            : "*비밀번호는 특수문자를 포함한 8자 이상 20자 이하입니다."}
        </Text>
      </FormControl>

      {/* 비밀번호 확인 */}
      <FormControl mb={6}>
        <FormLabel>비밀번호 확인</FormLabel>
        <Input
          type="password"
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
          placeholder="비밀번호를 다시 입력해주세요"
        />
        {password && passwordCheck && password !== passwordCheck && (
          <Text fontSize="sm" color="red.500">
            *비밀번호가 일치하지 않습니다.
          </Text>
        )}
      </FormControl>

      {/* Next Button */}
      <Button
        colorScheme="blue"
        w="100%"
        h="50px"
        onClick={handleNext}
        isDisabled={!userId || !password || !passwordCheck}
      >
        다음
      </Button>
    </Box>
  );
}
