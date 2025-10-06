import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Tag,
  Image,
  Divider,
} from "@chakra-ui/react";

export default function OralQuestionnaireResult() {
  // ✅ Mock 고정 데이터
  const result = {
    date: "2025.09.30",
    name: "홍길동",
    types: ["양치 관리형", "시린니 관리형"],
    activeType: "양치 관리형",
    description:
      "양치 관리형은 현재 질병이 있거나 질병이 생길 수 있는 경우로, 양치 관리가 필요하신 상태를 의미합니다. 양치 습관과 관리 방법을 개선하면 구강 건강을 회복할 수 있습니다.",
  };

  const contents = [
    {
      id: 1,
      title: "올바른 양치관리로 백살까지 튼튼하게",
      tag: "카드뉴스",
      image: "/images/content1.jpg",
    },
    {
      id: 2,
      title: "양치관리의 시작 올바른 학습 가이드",
      tag: "카드뉴스",
      image: "/images/content2.jpg",
    },
  ];

  return (
    <Box p={4}>
      {/* 결과 헤더 */}
      <Box bg="blue.600" color="white" p={4} rounded="lg" mb={6}>
        <Text fontSize="sm">{result.date}</Text>
        <Text fontWeight="bold" fontSize="lg" mt={2}>
          {result.name}님의 구강상태는{" "}
          <Text as="span" color="yellow.200" fontWeight="bold">
            {result.types.join(", ")}
          </Text>{" "}
          입니다.
        </Text>
      </Box>

      {/* 구강 유형 선택 */}
      <HStack spacing={4} mb={4}>
        {result.types.map((type) => (
          <Button
            key={type}
            variant={type === result.activeType ? "solid" : "outline"}
            colorScheme="blue"
            size="sm"
          >
            {type}
          </Button>
        ))}
      </HStack>

      {/* 유형 설명 */}
      <Box borderWidth="1px" rounded="lg" p={4} mb={8}>
        <Heading size="sm" mb={2}>
          {result.activeType}이란?
        </Heading>
        <Text fontSize="sm">{result.description}</Text>
        <Text mt={3} color="blue.600" fontWeight="bold" fontSize="sm">
          {result.activeType}에 맞는 콘텐츠를 확인하신 후 올바른 구강 관리 습관을 지녀 보세요!
        </Text>
      </Box>

      {/* 맞춤 콘텐츠 */}
      <Heading size="md" mb={4}>
        {result.name}님을 위한 콘텐츠
      </Heading>

      <VStack spacing={4} align="stretch">
        {contents.map((content) => (
          <Box
            key={content.id}
            position="relative"
            borderRadius="lg"
            overflow="hidden"
            shadow="sm"
          >
            {/* 이미지 */}
            <Image
              src={content.image}
              alt={content.title}
              w="100%"
              h="200px"
              objectFit="cover"
            />

            {/* 오버레이 박스 */}
            <Box
              position="absolute"
              bottom={3}
              left={3}
              right={3}
              bg="white"
              borderRadius="md"
              p={3}
              shadow="md"
            >
              <HStack spacing={2} mb={1}>
                <Tag colorScheme="blue">양치</Tag>
                <Tag colorScheme="orange">{content.tag}</Tag>
              </HStack>
              <Text fontWeight="bold" fontSize="sm">
                {content.title}
              </Text>
            </Box>
          </Box>
        ))}
      </VStack>

      {/* 안내사항 */}
      <Divider my={6} />
      <Text fontSize="sm" color="gray.600">
        본 서비스에서 제공하는 결과는 의학적 판단과 진단에 의한 결과가 아니며 참고용입니다.
        정확한 진단 및 치료는 반드시 치과의사의 상담과 진료를 통해 받아야 합니다.
      </Text>
    </Box>
  );
}
