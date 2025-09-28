import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  Progress,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

interface Question {
  id: number;
  question: string;
  options: string[];
  multiple?: boolean; // 다중 선택 여부
}

const questions: Question[] = [
  {
    id: 1,
    question: "현재 구강 건강 상태는 어떻다고 생각하십니까?",
    options: [
      "매우 건강하다",
      "적절한 편이다",
      "보통이다",
      "건강하지 못한 편이다",
      "전혀 건강하지 않다",
    ],
  },
  {
    id: 2,
    question: "현재 나이가 어떻게 되시나요?",
    options: [
      "만 20세 미만",
      "만 20~39세",
      "만 40~59세",
      "만 60세 이상",
      "그 외",
    ],
  },
  {
    id: 3,
    question: "지난 1년간 치아/잇몸 관련 불편함이 있었습니까?",
    options: ["전혀 없었다", "가끔 있었다", "자주 있었다", "매우 자주 있었다"],
  },
  {
    id: 4,
    question: "어제 하루 동안 칫솔질을 몇 차례 하셨습니까?",
    options: ["칫솔질 하지 않았다", "1회", "2회", "3회", "4회 이상"],
  },
  {
    id: 5,
    question: "어제 칫솔질을 하신 때를 모두 표시해 주십시오.",
    options: [
      "아침 식사 전",
      "아침 식사 후",
      "점심 식사 후",
      "저녁 식사 후",
      "취침 직전",
    ],
    multiple: true, // ✅ 다중 선택
  },
  {
    id: 6,
    question: "치간칫솔, 치실 등 구강위생 보조용품을 사용하고 계십니까?",
    options: [
      "치실(Floss)",
      "치간칫솔",
      "양치용액(구강세정액)",
      "기타",
      "사용하지 않는다",
    ],
    multiple: true, // ✅ 다중 선택
  },
  {
    id: 7,
    question: "치아 닦는 방법(치과나 보건소 등에서)을 배운 적이 있습니까?",
    options: ["예", "아니오"],
  },
  {
    id: 8,
    question: "가장 최근 치과에서 받은 치료는 무엇입니까?",
    options: [
      "충치 치료",
      "스케일링",
      "잇몸 치료",
      "보철물(틀니/브리지/임플란트)",
      "기타",
      "치료받은 적 없음",
    ],
  },
  {
    id: 9,
    question: "어제 단 음식(사탕, 케이크, 탄산음료 등)을 몇 번 드셨습니까?",
    options: ["1번", "2번", "3번", "4번 이상", "먹지 않았다", "모르겠다"],
  },
  {
    id: 10,
    question: "담배를 피우십니까?",
    options: [
      "전혀 피우지 않는다",
      "현재 피우고 있다",
      "이전에 피웠으나 끊었다",
    ],
  },
];

export default function Questionnaire() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number[] | null)[]>(
    Array(questions.length).fill(null)
  );
  const toast = useToast();
  const navigate = useNavigate();

  const currentQuestion = questions[step];

  const handleAnswer = (optionIndex: number) => {
    if (currentQuestion.multiple) {
      // 다중 선택: 배열 토글
      const current = answers[step] || [];
      const newAnswers = [...answers];
      if (current.includes(optionIndex)) {
        newAnswers[step] = current.filter((v) => v !== optionIndex);
      } else {
        newAnswers[step] = [...current, optionIndex];
      }
      setAnswers(newAnswers);
    } else {
      // 단일 선택
      const newAnswers = [...answers];
      newAnswers[step] = [optionIndex]; // 배열로 저장
      setAnswers(newAnswers);
    }
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        form: questions.map((q, idx) => ({
          key: q.id.toString(),
          value: answers[idx]
            ? (answers[idx] as number[]).map((v) => v + 1)
            : [],
        })),
      };

      console.log("📌 제출 데이터:", payload);

      await api.post("/questionnaire/submit", payload);

      toast({
        title: "문진표가 제출되었습니다.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/oral-status");
    } catch (err) {
      console.error("문진표 제출 실패:", err);
      toast({
        title: "제출에 실패했습니다.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex direction="column" align="center" minH="100vh" bg="gray.50" p={6}>
      <Box w="100%" maxW="480px" bg="white" p={6} borderRadius="md" shadow="sm">
        {/* 제목 */}
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          문진표 작성
        </Text>
        <Progress value={((step + 1) / questions.length) * 100} mb={4} />

        {/* 질문 */}
        <Text fontWeight="medium" mb={4}>
          {`${currentQuestion.id}. ${currentQuestion.question}`}
        </Text>

        {/* 선택지 */}
        <VStack spacing={3} mb={6} align="stretch">
          {currentQuestion.multiple ? (
            <CheckboxGroup
              value={answers[step]?.map((v) => v.toString()) || []}
            >
              {currentQuestion.options.map((option, idx) => (
                <Checkbox
                  key={idx}
                  value={idx.toString()}
                  isChecked={answers[step]?.includes(idx)}
                  onChange={() => handleAnswer(idx)}
                >
                  {option}
                </Checkbox>
              ))}
            </CheckboxGroup>
          ) : (
            currentQuestion.options.map((option, idx) => (
              <Button
                key={idx}
                w="100%"
                variant={answers[step]?.[0] === idx ? "solid" : "outline"}
                colorScheme={answers[step]?.[0] === idx ? "blue" : "gray"}
                onClick={() => handleAnswer(idx)}
              >
                {option}
              </Button>
            ))
          )}
        </VStack>

        {/* 네비게이션 버튼 */}
        <Flex justify="space-between">
          <Button onClick={handlePrev} isDisabled={step === 0}>
            이전
          </Button>
          <Button colorScheme="blue" onClick={handleNext}>
            {step === questions.length - 1 ? "제출하기" : "다음"}
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}
