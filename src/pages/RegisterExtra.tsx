import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function RegisterExtra() {
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("male");
  const [birth, setBirth] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const handleComplete = () => {
    if (!nickname || !birth || !question || !answer) {
      toast({ title: "모든 필드를 입력해주세요.", status: "warning" });
      return;
    }
    // 회원가입 완료 시 모달 열기
    setIsCompleteOpen(true);
  };

  const handleConfirm = () => {
    setIsCompleteOpen(false);
    navigate("/login"); // 로그인 페이지로 이동
  };

  return (
    <Box p={6} maxW="400px" mx="auto">
      {/* 헤더 */}
      <Heading size="sm" mb={6}>
        추가 정보를 입력합니다
      </Heading>

      <Text color="gray.600" mb={6}>
        추가 정보를 입력하면 향후 더 많은 데이터를 비교할 수 있어요.
      </Text>

      {/* 이름 */}
      <FormControl mb={4}>
        <FormLabel>이름</FormLabel>
        <Input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="별명이나 애칭도 좋아요"
        />
      </FormControl>

      {/* 성별 */}
      <FormControl mb={4}>
        <FormLabel>성별</FormLabel>
        <RadioGroup onChange={setGender} value={gender}>
          <Stack direction="row" spacing={6}>
            <Radio value="male">남성</Radio>
            <Radio value="female">여성</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>

      {/* 생년월일 */}
      <FormControl mb={4}>
        <FormLabel>생년월일</FormLabel>
        <Input
          type="date"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
        />
      </FormControl>

      {/* 비밀번호 찾기 질문 */}
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

      {/* 답변 */}
      <FormControl mb={6}>
        <FormLabel>답변</FormLabel>
        <Input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="답변을 입력하세요"
        />
      </FormControl>

      {/* Complete Button */}
      <Button colorScheme="blue" w="100%" h="50px" onClick={handleComplete}>
        완료
      </Button>

      {/* 가입 완료 모달 */}
      <Modal isOpen={isCompleteOpen} onClose={() => setIsCompleteOpen(false)} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="md" textAlign="center" py={4}>
          <ModalHeader fontSize="lg">가입을 축하드려요 🎉</ModalHeader>
          <ModalBody>
            <Text color="gray.600">이제 서비스를 시작해볼까요?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" w="100%" onClick={handleConfirm}>
              좋아요
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
