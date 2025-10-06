import {
  Box,
  Flex,
  Text,
  Heading,
  VStack,
  HStack,
  Divider,
  Button,
  Tag,
} from "@chakra-ui/react";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";

export default function OralCheckResult() {
  // ✅ Mock 데이터
  const result = {
    date: "2025.01.22",
    name: "홍길동",
    status: "위험",
    plaqueAvg: 74.6,
    details: [
      { id: 1, label: "상악우측", value: 53.4, status: "위험" },
      { id: 2, label: "상악좌측", value: 64.4, status: "위험" },
      { id: 3, label: "하악좌측", value: 92.4, status: "위험" },
      { id: 4, label: "하악우측", value: 88.4, status: "위험" },
    ],
  };

  return (
    <Box p={4} maxW="420px" mx="auto" bg="gray.50" minH="100vh">
      {/* 상단 결과 */}
      <Box
        bg="white"
        p={5}
        rounded="lg"
        shadow="sm"
        mb={6}
        textAlign="center"
      >
        <Text fontSize="sm" color="gray.500" mb={1}>
          {result.date}
        </Text>
        <Text fontWeight="bold" fontSize="lg" mb={2}>
          {result.name}님의 구강상태는{" "}
          <Text as="span" color="red.500">
            {result.status}
          </Text>{" "}
          입니다.
        </Text>
        <Box fontSize="4xl" color="blue.400">
          😊
        </Box>
      </Box>

      {/* 검진 결과 내용 */}
      <Box bg="white" p={5} rounded="lg" shadow="sm" mb={6}>
        <Heading size="sm" mb={4}>
          {result.name}님의 검진 결과 내용
        </Heading>

        {/* 전체 상태 */}
        <HStack justify="space-between" mb={4}>
          <Text fontWeight="bold">전체 평균</Text>
          <HStack>
            <Text>플라그 : {result.plaqueAvg}%</Text>
            <Tag colorScheme="red">{result.status}</Tag>
          </HStack>
        </HStack>

        <Divider mb={4} />

        {/* 부위별 상태 */}
        <VStack spacing={3} align="stretch">
          {result.details.map((d) => (
            <HStack key={d.id} justify="space-between">
              <Text>{d.label}</Text>
              <HStack>
                <Text>플라그 : {d.value}%</Text>
                <Tag colorScheme="red">{d.status}</Tag>
              </HStack>
            </HStack>
          ))}
        </VStack>

        <Box mt={4} p={3} bg="gray.50" rounded="md" fontSize="sm">
          양치질을 할 때{" "}
          <Text as="span" fontWeight="bold">
            {result.details.map((d) => d.label).join(", ")}
          </Text>
          을(를) 더 신경 써주세요.
        </Box>
      </Box>

      {/* 구강 관리 팁 */}
      <Box bg="white" p={5} rounded="lg" shadow="sm">
        <Heading size="sm" mb={3}>
          구강관리를 위한 팁
        </Heading>
        <Text fontSize="sm" mb={3}>
          {result.name}님을 위한 콘텐츠가 있어요! 구강 관리를 위한 정보를
          알아볼까요?
        </Text>
        <Button colorScheme="blue" w="100%">
          확인하러 가기
        </Button>
      </Box>
    </Box>
  );
}
