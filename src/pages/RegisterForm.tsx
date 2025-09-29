import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  RadioGroup,
  Radio,
  Stack,
  Text,
  useToast,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/api";
import axios from "axios";

type Question = { id: number; sort: number; title: string };

const TERMS = {
  service: `서비스 이용약관 내용...`,
  privacy: `개인정보 수집 및 이용 동의 내용...`,
  marketing: `마케팅 정보 수신 동의 내용...`,
};

export default function RegisterForm() {
  const navigate = useNavigate();
  const toast = useToast();
  const { state } = useLocation() as { state?: { userId?: number | null } };
  const userId = state?.userId ?? null;

  const [userLoginIdentifier, setUserLoginIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [userName, setUserName] = useState("");
  const [gender, setGender] = useState<"M" | "W">("M");
  const [findPwdQuestionId, setFindPwdQuestionId] = useState<number | "">("");
  const [findPwdAnswer, setFindPwdAnswer] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);

  const [terms, setTerms] = useState({
    service: false,
    privacy: false,
    marketing: false,
  });
  const [allChecked, setAllChecked] = useState(false);

  const svc = useDisclosure();
  const prv = useDisclosure();
  const mkt = useDisclosure();

  const [idChecked, setIdChecked] = useState(false);
  useEffect(() => {
    setIdChecked(false); // 아이디 값 바뀔 때마다 초기화
  }, [userLoginIdentifier]);

  // ✅ 질문 리스트 불러오기 (/password/questions → response.questions)
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await api.get("/password/questions");
        const list = res.data?.response?.questions ?? res.data?.questions ?? [];
        setQuestions(list as Question[]);
      } catch (error: unknown) {
        console.error("질문리스트 불러오기 실패:", error);
        toast({ title: "질문 불러오기 실패", status: "error" });
      }
    };
    fetchQuestions();
  }, [toast]);

  // ✅ 아이디 중복확인 (/login/loginIdentifier-check)
  const handleCheckId = async () => {
    if (!userLoginIdentifier) {
      toast({ title: "아이디를 입력하세요.", status: "warning" });
      return;
    }
    try {
      const res = await api.get("/login/loginIdentifier-check", {
        params: { userLoginIdentifier },
      });

      if (res.data?.rt && res.data.rt !== 200) {
        toast({
          title: "아이디 확인 실패",
          description: res.data.rtMsg,
          status: "error",
        });
        setIdChecked(false);
        return;
      }

      toast({ title: "사용 가능한 아이디입니다.", status: "success" });
      setIdChecked(true);
    } catch (error: unknown) {
      console.error("아이디 중복확인 실패:", error);
      const msg = axios.isAxiosError(error)
        ? (error.response?.data as { rtMsg?: string } | undefined)?.rtMsg ??
          "이미 사용 중인 아이디입니다."
        : "중복확인 실패";
      toast({ title: "아이디 확인 실패", description: msg, status: "error" });
      setIdChecked(false);
    }
  };

  const handleAllCheck = (checked: boolean) => {
    setAllChecked(checked);
    setTerms({ service: checked, privacy: checked, marketing: checked });
  };
  const handleSingleCheck = (key: keyof typeof terms, checked: boolean) => {
    const updated = { ...terms, [key]: checked };
    setTerms(updated);
    setAllChecked(updated.service && updated.privacy && updated.marketing);
  };

  const handleRegister = async () => {
    if (!idChecked) {
      toast({ title: "아이디 중복확인을 해주세요.", status: "warning" });
      return;
    }
    if (!userLoginIdentifier || !password || !userName || !gender) {
      toast({ title: "필수 항목을 입력해주세요.", status: "warning" });
      return;
    }
    if (password !== passwordCheck) {
      toast({ title: "비밀번호가 일치하지 않습니다.", status: "error" });
      return;
    }
    if (!findPwdQuestionId || !findPwdAnswer) {
      toast({
        title: "비밀번호 찾기 질문과 답변을 입력해주세요.",
        status: "warning",
      });
      return;
    }
    if (!terms.service || !terms.privacy) {
      toast({ title: "필수 약관에 동의해야 합니다.", status: "error" });
      return;
    }

    try {
      setLoading(true);
      await api.post("/register", {
        userId,
        userLoginIdentifier,
        userName,
        userGender: gender,
        userPassword: password,
        findPwdQuestionId,
        findPwdAnswer,
        userServiceAgreementRequest: {
          service: terms.service,
          privacy: terms.privacy,
          marketing: terms.marketing,
        },
      });

      toast({ title: "회원가입 완료!", status: "success" });
      navigate("/login");
    } catch (error: unknown) {
      console.error("회원가입 요청 실패:", error);
      const msg = axios.isAxiosError(error)
        ? (error.response?.data as { rtMsg?: string } | undefined)?.rtMsg ??
          "회원가입 실패"
        : "회원가입 실패";
      toast({ title: "회원가입 실패", description: msg, status: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box bg="white" p={8} rounded="xl" shadow="lg" w="full" maxW="md">
        <Heading size="lg" mb={6} textAlign="center">
          회원가입
        </Heading>

        {/* 아이디 + 중복확인 */}
        <FormControl mb={4}>
          <FormLabel>아이디</FormLabel>
          <Flex gap={2}>
            <Input
              value={userLoginIdentifier}
              onChange={(e) => setUserLoginIdentifier(e.target.value)}
              placeholder="아이디 (4~12자)"
            />
            <Button onClick={handleCheckId}>중복확인</Button>
          </Flex>
          {idChecked && (
            <Text mt={2} fontSize="sm" color="green.500">
              사용 가능한 아이디입니다.
            </Text>
          )}
        </FormControl>

        {/* 비밀번호 */}
        <FormControl mb={4}>
          <FormLabel>비밀번호</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 입력"
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>비밀번호 확인</FormLabel>
          <Input
            type="password"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
            placeholder="비밀번호 다시 입력"
          />
        </FormControl>

        {/* 닉네임 */}
        <FormControl mb={4}>
          <FormLabel>닉네임</FormLabel>
          <Input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="별명이나 애칭도 좋아요"
          />
        </FormControl>

        {/* 성별 */}
        <FormControl mb={4}>
          <FormLabel>성별</FormLabel>
          <RadioGroup
            value={gender}
            onChange={(v) => setGender(v as "M" | "W")}
          >
            <Stack direction="row">
              <Radio value="M">남성</Radio>
              <Radio value="W">여성</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        {/* 질문/답변 */}
        <FormControl mb={4}>
          <FormLabel>비밀번호 찾기 질문</FormLabel>
          <Select
            placeholder="질문 선택"
            value={findPwdQuestionId}
            onChange={(e) => setFindPwdQuestionId(Number(e.target.value))}
          >
            {questions.map((q) => (
              <option key={q.id} value={q.id}>
                {q.title}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl mb={6}>
          <FormLabel>답변</FormLabel>
          <Input
            value={findPwdAnswer}
            onChange={(e) => setFindPwdAnswer(e.target.value)}
            placeholder="답변 입력"
          />
        </FormControl>

        {/* 약관 동의 */}
        <VStack align="stretch" spacing={3} mb={6}>
          <Checkbox
            isChecked={allChecked}
            onChange={(e) => handleAllCheck(e.target.checked)}
          >
            전체 동의
          </Checkbox>
          <Divider />
          <Flex align="center" justify="space-between">
            <Checkbox
              isChecked={terms.service}
              onChange={(e) => handleSingleCheck("service", e.target.checked)}
            >
              서비스 이용약관 동의 (필수)
            </Checkbox>
            <Button variant="link" size="sm" onClick={svc.onOpen}>
              보기
            </Button>
          </Flex>
          <Flex align="center" justify="space-between">
            <Checkbox
              isChecked={terms.privacy}
              onChange={(e) => handleSingleCheck("privacy", e.target.checked)}
            >
              개인정보 수집 및 이용 동의 (필수)
            </Checkbox>
            <Button variant="link" size="sm" onClick={prv.onOpen}>
              보기
            </Button>
          </Flex>
          <Flex align="center" justify="space-between">
            <Checkbox
              isChecked={terms.marketing}
              onChange={(e) => handleSingleCheck("marketing", e.target.checked)}
            >
              마케팅 정보 수신 동의 (선택)
            </Checkbox>
            <Button variant="link" size="sm" onClick={mkt.onOpen}>
              보기
            </Button>
          </Flex>
        </VStack>

        <Button
          colorScheme="blue"
          w="full"
          h="50px"
          onClick={handleRegister}
          isLoading={loading}
        >
          회원가입
        </Button>
      </Box>

      {/* 약관 모달 */}
      <Modal
        isOpen={svc.isOpen}
        onClose={svc.onClose}
        size="lg"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>서비스 이용약관</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text whiteSpace="pre-wrap">{TERMS.service}</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={svc.onClose}>닫기</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={prv.isOpen}
        onClose={prv.onClose}
        size="lg"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>개인정보 수집 및 이용 동의</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text whiteSpace="pre-wrap">{TERMS.privacy}</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={prv.onClose}>닫기</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={mkt.isOpen}
        onClose={mkt.onClose}
        size="lg"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>마케팅 정보 수신 동의</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text whiteSpace="pre-wrap">{TERMS.marketing}</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={mkt.onClose}>닫기</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
