// AnalysisLoading.tsx
import { Box, VStack, Text, Button, HStack } from "@chakra-ui/react";
import { keyframes } from "@emotion/react"; // ✅ 요기로 변경

const bounce = keyframes`
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1.0); }
`;

export default function AnalysisLoading({
  onCancel,
}: {
  onCancel: () => void;
}) {
  return (
    <Box
      p={8}
      borderRadius="lg"
      bg="white"
      shadow="md"
      textAlign="center"
      w="full"
      maxW="sm"
      mx="auto"
    >
      <VStack spacing={6}>
        <Text fontWeight="bold" fontSize="lg" lineHeight="1.6">
          잠시만 기다려 주세요! <br />
          <Text as="span" color="blue.500">
            홍길동
          </Text>
          님의 <br />
          <Text as="span" color="blue.600">
            구강상태를 분석중
          </Text>
          입니다!
        </Text>

        {/* 점프하는 점 3개 */}
        <HStack spacing={2}>
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              w="12px"
              h="12px"
              borderRadius="full"
              bg="blue.500"
              animation={`${bounce} 1.4s infinite ease-in-out`}
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </HStack>

        <Button variant="outline" onClick={onCancel}>
          취소하기
        </Button>
      </VStack>
    </Box>
  );
}
