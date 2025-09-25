import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);

  const toast = useToast();
//   const navigate = useNavigate();
const location = useLocation();
  const navigate = useNavigate();
   const from = location.state?.from || "login"; // 기본값은 로그인
  const handleSubmit = () => {
    if (!name || !email || !message) {
      toast({ title: "모든 항목을 입력해주세요.", status: "warning" });
      return;
    }
    // 지금은 단순히 성공 모달만 띄우기
    setIsCompleteOpen(true);
  };

   const handleConfirm = () => {
    if (from === "user") {
      navigate("/user"); // 사용자 페이지로 이동
    } else {
      navigate("/login"); // 로그인 페이지로 이동
    }
  };

  return (
    <Box p={6} maxW="400px" mx="auto">
      <Heading size="sm" mb={6}>
        문의하기
      </Heading>

      <FormControl mb={4}>
        <FormLabel>이름</FormLabel>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력하세요"
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>이메일</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일을 입력하세요"
        />
      </FormControl>

      <FormControl mb={6}>
        <FormLabel>문의 내용</FormLabel>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="문의 내용을 입력하세요"
          rows={5}
        />
      </FormControl>

      <Button colorScheme="blue" w="100%" h="50px" onClick={handleSubmit}>
        제출하기
      </Button>

      {/* 완료 모달 */}
      <Modal isOpen={isCompleteOpen} onClose={handleConfirm} isCentered>
        <ModalOverlay />
        <ModalContent textAlign="center" py={4}>
          <ModalHeader fontSize="lg">문의가 접수되었습니다 🎉</ModalHeader>
          <ModalBody>빠른 시일 내에 답변드리겠습니다.</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" w="100%" onClick={handleConfirm}>
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
