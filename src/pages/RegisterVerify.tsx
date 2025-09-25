import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function RegisterVerify() {
  const navigate = useNavigate();
  const toast = useToast();

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [terms, setTerms] = useState({
    service: false,
    privacy: false,
    marketing: false,
  });

  const [allChecked, setAllChecked] = useState(false);

  // 전체 동의 체크 시 모든 항목 체크
  const handleAllCheck = (checked: boolean) => {
    setAllChecked(checked);
    setTerms({
      service: checked,
      privacy: checked,
      marketing: checked,
    });
  };

  // 단일 체크 시 전체동의 업데이트
  const handleSingleCheck = (key: keyof typeof terms, checked: boolean) => {
    setTerms({ ...terms, [key]: checked });
    if (checked && Object.values({ ...terms, [key]: checked }).every(Boolean)) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  };

  const handleNext = () => {
    if (!phone || !name) {
      toast({ title: "휴대폰 번호와 이름을 입력해주세요.", status: "warning" });
      return;
    }
    if (!terms.service || !terms.privacy) {
      toast({ title: "필수 약관에 동의해주세요.", status: "error" });
      return;
    }
    // 인증 성공 → 회원가입 폼으로 이동
    navigate("/register/form");
  };

  return (
    <Box p={6} maxW="400px" mx="auto">
      {/* 헤더 */}
      <Flex align="center" mb={4}>
        <Button variant="ghost" p={0} minW="auto" onClick={() => navigate(-1)}>
          ←
        </Button>
        <Heading size="sm" ml={2}>
          회원 확인
        </Heading>
      </Flex>

      {/* Progress */}
      <Box h="2px" bg="gray.200" mb={6}>
        <Box h="2px" w="33%" bg="blue.500"></Box>
      </Box>

      <Heading size="md" mb={2}>
        회원을 확인합니다.
      </Heading>
      <Text color="gray.600" mb={6}>
        회원 여부를 확인합니다. 또한, 서비스 이용 동의가 필요해요.
      </Text>

      {/* Phone */}
      <FormControl mb={4}>
        <FormLabel>휴대폰 번호 입력</FormLabel>
        <Input
          placeholder="연락처를 입력해주세요"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </FormControl>

      {/* Name */}
      <FormControl mb={6}>
        <FormLabel>이름 입력</FormLabel>
        <Input
          placeholder="실명을 입력해주세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      {/* 약관 동의 */}
      <Stack spacing={3} mb={6}>
        <Checkbox
          isChecked={allChecked}
          onChange={(e) => handleAllCheck(e.target.checked)}
        >
          전체 동의
        </Checkbox>
        <Divider />
        <Checkbox
          isChecked={terms.service}
          onChange={(e) => handleSingleCheck("service", e.target.checked)}
        >
          서비스 이용약관 동의 (필수)
        </Checkbox>
        <Checkbox
          isChecked={terms.privacy}
          onChange={(e) => handleSingleCheck("privacy", e.target.checked)}
        >
          개인정보 수집 및 이용 동의 (필수)
        </Checkbox>
        <Checkbox
          isChecked={terms.marketing}
          onChange={(e) => handleSingleCheck("marketing", e.target.checked)}
        >
          마케팅 정보 수신 동의 (선택)
        </Checkbox>
      </Stack>

      {/* Next Button */}
      <Button
        colorScheme="blue"
        w="100%"
        h="50px"
        onClick={handleNext}
        isDisabled={!phone || !name}
      >
        다음
      </Button>
    </Box>
  );
}
