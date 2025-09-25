import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "login"; // 기본은 login

  const handleSubmit = () => {
    // 지금은 검증 없이 무조건 완료 모달 열기
    setIsCompleteOpen(true);
  };

  const handleConfirm = () => {
    setIsCompleteOpen(false);
    if (from === "user") {
      navigate("/user");
    } else {
      navigate("/login");
    }
  };

  return (
    <Box p={6} maxW="400px" mx="auto">
      <Heading size="sm" mb={6}>
        비밀번호 재설정
      </Heading>

      <Text color="gray.600" mb={6}>
        변경하실 비밀번호를 설정해주세요.
      </Text>

      <FormControl mb={4}>
        <FormLabel>새 비밀번호</FormLabel>
        <Input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="비밀번호를 입력해주세요"
        />
      </FormControl>

      <FormControl mb={6}>
        <FormLabel>새 비밀번호 확인</FormLabel>
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="비밀번호를 다시 입력해주세요"
        />
      </FormControl>

      <Button colorScheme="blue" w="100%" h="50px" onClick={handleSubmit}>
        변경 완료
      </Button>

      {/* 완료 안내 모달 */}
      <Modal isOpen={isCompleteOpen} onClose={handleConfirm} isCentered>
        <ModalOverlay />
        <ModalContent textAlign="center" py={4}>
          <ModalHeader fontSize="lg">비밀번호 변경 완료 🎉</ModalHeader>
          <ModalBody>
            <Text color="gray.600">새 비밀번호로 로그인 해주세요.</Text>
          </ModalBody>
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
