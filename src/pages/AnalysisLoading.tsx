import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";

interface AnalyzingScreenProps {
  name: string;
  onCancel: () => void;
}

export default function AnalyzingScreen({ name, onCancel }: AnalyzingScreenProps) {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      bg="white"
      p={6}
    >
      <Box
        border="2px solid"
        borderColor="blue.300"
        borderRadius="md"
        p={8}
        maxW="350px"
        w="100%"
        textAlign="center"
        boxShadow="md"
      >
        {/* 안내 문구 */}
        <Text fontSize="lg" fontWeight="bold" mb={6}>
          {name} 님의 구강상태를 <br />
          분석중입니다... <br />
          잠시만 기다려주세요!
        </Text>

        {/* 원형 로딩 영역 */}
        <Box
          w="80px"
          h="80px"
          borderRadius="full"
          bg="gray.200"
          display="flex"
          alignItems="center"
          justifyContent="center"
          mx="auto"
          mb={8}
        >
          <Spinner size="lg" color="gray.500" thickness="4px" />
        </Box>

        {/* 취소 버튼 */}
        <Button
          w="100%"
          h="50px"
          borderRadius="md"
          bg="gray.500"
          color="white"
          _hover={{ bg: "gray.600" }}
          onClick={onCancel}
        >
          취소하기
        </Button>
      </Box>
    </Flex>
  );
}
