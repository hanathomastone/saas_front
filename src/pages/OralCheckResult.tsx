import React from "react";
import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

const OralCheckResult: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ 업로드 후 navigate에서 받은 result
  const result = location.state?.result;

  if (!result) {
    return (
      <Flex direction="column" align="center" justify="center" h="100vh">
        <Heading size="md" mb={4}>
          결과 없음
        </Heading>
        <Text>검진 결과 데이터가 없습니다. 다시 촬영해주세요.</Text>
        <Button mt={6} onClick={() => navigate("/oral-check/camera")}>
          다시 촬영하기
        </Button>
      </Flex>
    );
  }

  return (
    <Box p={6} maxW="600px" mx="auto">
      <Heading size="lg" mb={6}>
        구강검진 결과
      </Heading>

      {/* 업로드된 이미지 */}
      {result.response?.imageUrl && (
        <Box mb={6} textAlign="center">
          <Image
            src={result.response.imageUrl}
            alt="검진 이미지"
            maxW="400px"
            mx="auto"
            borderRadius="md"
            border="1px solid #ddd"
          />
          <Text fontSize="sm" color="gray.500" mt={2}>
            촬영된 이미지
          </Text>
        </Box>
      )}

      {/* 분석 결과 텍스트 (예시) */}
      <Box bg="gray.50" p={4} borderRadius="md" shadow="sm">
        <Text fontSize="md" fontWeight="bold" mb={2}>
          분석 결과
        </Text>
        <Text>
          {result.response?.analysis
            ? result.response.analysis
            : "분석 결과가 없습니다."}
        </Text>
      </Box>

      {/* 버튼들 */}
      <Flex gap={3} mt={6}>
        <Button flex="1" onClick={() => navigate("/oral-check/camera")}>
          다시 촬영하기
        </Button>
        <Button
          flex="1"
          colorScheme="blue"
          onClick={() => navigate("/dashboard")}
        >
          대시보드로 이동
        </Button>
      </Flex>
    </Box>
  );
};

export default OralCheckResult;
