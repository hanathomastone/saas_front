import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Divider,
  Button,
} from "@chakra-ui/react";

export default function OralCheckResult() {
  return (
    <Box bg="gray.50" minH="100vh" p={6}>
      {/* 상단 헤더 */}
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="md">촬영 결과</Heading>
        <Text color="blue.500" fontWeight="bold" cursor="pointer">
          완료
        </Text>
      </Flex>

      {/* 전체 상태 */}
      <Box bg="white" rounded="xl" shadow="sm" p={6} textAlign="center" mb={6}>
        <Text fontSize="lg" mb={2}>
          김철수님의 구강상태는
        </Text>
        <Text fontSize="2xl" fontWeight="bold" color="orange.500" mb={2}>
          주의 입니다.
        </Text>
        <Text color="gray.500">2025.02.10</Text>
      </Box>

      {/* 결과 내용 */}
      <Box bg="white" rounded="xl" shadow="sm" p={6} mb={6}>
        <Heading size="sm" mb={4}>
          김철수님의 검진 결과 내용
        </Heading>

        {/* 전체 구강 상태 */}
        <Flex justify="space-between" align="center" mb={4}>
          <HStack>
            <Text fontWeight="bold">전체 평균</Text>
          </HStack>
          <HStack>
            <Text>플라크 : 58.2%</Text>
            <Box
              bg="orange.100"
              color="orange.600"
              px={2}
              py={1}
              rounded="md"
              fontSize="sm"
              fontWeight="bold"
            >
              주의
            </Box>
          </HStack>
        </Flex>
        <Divider mb={4} />

        {/* 부위별 상태 */}
        <VStack align="stretch" spacing={3}>
          {[
            { label: "상악우측", value: 42.7, status: "양호", color: "green" },
            { label: "상악좌측", value: 61.3, status: "주의", color: "orange" },
            { label: "하악좌측", value: 72.9, status: "위험", color: "red" },
            { label: "하악우측", value: 56.0, status: "주의", color: "orange" },
          ].map((part, idx) => (
            <Flex key={idx} justify="space-between" align="center">
              <Text>{part.label}</Text>
              <HStack>
                <Text>플라크 : {part.value}%</Text>
                <Box
                  bg={`${part.color}.100`}
                  color={`${part.color}.600`}
                  px={2}
                  py={1}
                  rounded="md"
                  fontSize="sm"
                  fontWeight="bold"
                >
                  {part.status}
                </Box>
              </HStack>
            </Flex>
          ))}
        </VStack>
      </Box>

      {/* 맞춤 안내 */}
      <Box bg="white" rounded="xl" shadow="sm" p={6} mb={6}>
        <Text>
          양치질을 할 때{" "}
          <Text as="span" fontWeight="bold" color="orange.500">
            상악좌측, 하악좌측, 하악우측
          </Text>{" "}
          을(를) 더 신경 써주세요
        </Text>
      </Box>

      {/* 구강관리 팁 */}
      <Box bg="white" rounded="xl" shadow="sm" p={6} textAlign="center">
        <Text mb={2}>김철수님을 위한 콘텐츠가 있어요!</Text>
        <Text mb={4}>구강 관리를 위한 정보를 알아볼까요?</Text>
        <Button colorScheme="blue">확인하러 가기</Button>
      </Box>
    </Box>
  );
}
