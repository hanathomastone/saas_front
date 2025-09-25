import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function FindPassword() {
  const [userId, setUserId] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleConfirm = () => {
    // 지금은 검증 없이 무조건 reset-password로 이동
    navigate("/reset-password");
  };

  return (
    <Box p={6} maxW="400px" mx="auto">
      <Heading size="sm" mb={6}>
        비밀번호 찾기
      </Heading>

      <Text color="gray.600" mb={6}>
        아이디와 질문 및 답변을 선택해주세요
      </Text>

      <FormControl mb={4}>
        <FormLabel>아이디</FormLabel>
        <Input
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="아이디를 입력하세요"
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>질문 선택</FormLabel>
        <Select
          placeholder="질문을 선택해주세요."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        >
          <option value="1">내 첫 반려동물 이름은?</option>
          <option value="2">내가 졸업한 초등학교 이름은?</option>
          <option value="3">내가 가장 좋아하는 음식은?</option>
        </Select>
      </FormControl>

      <FormControl mb={6}>
        <FormLabel>답변</FormLabel>
        <Input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="답변을 입력하세요"
        />
      </FormControl>

      <Button colorScheme="blue" w="100%" h="50px" onClick={handleConfirm}>
        확인
      </Button>
    </Box>
  );
}
