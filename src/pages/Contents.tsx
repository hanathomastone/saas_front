import {
  Box,
  SimpleGrid,
  Card,
  CardBody,
  Image,
  Heading,
  Text,
  Button,
  VStack,
} from "@chakra-ui/react";

type Content = {
  id: number;
  title: string;
  description: string;
  image: string;
};

const mockContents: Content[] = [
  {
    id: 1,
    title: "치아 관리 기본 가이드",
    description: "매일 실천하는 올바른 양치 습관과 관리법을 배워보세요.",
    image:
      "https://images.unsplash.com/photo-1629904853690-684799b55094?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "충치 예방을 위한 식습관",
    description: "치아 건강을 위한 음식과 피해야 할 음식 알아보기.",
    image:
      "https://images.unsplash.com/photo-1599058917212-d750089bc07f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "정기 검진의 중요성",
    description: "6개월마다 치과 검진을 받는 것이 왜 중요한지 알아봅시다.",
    image:
      "https://images.unsplash.com/photo-1611691544919-226af42f66a4?auto=format&fit=crop&w=800&q=80",
  },
];

export default function ContentsPage() {
  return (
    <Box p={{ base: 4, md: 10 }}>
      <Heading mb={8} color="blue.600" textAlign="center">
        📚 컨텐츠 목록
      </Heading>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
        {mockContents.map((content) => (
          <Card
            key={content.id}
            shadow="lg"
            borderRadius="lg"
            overflow="hidden"
          >
            <Image
              src={content.image}
              alt={content.title}
              h="180px"
              w="100%"
              objectFit="cover"
            />
            <CardBody>
              <VStack align="start" spacing={3}>
                <Heading size="md" color="gray.700">
                  {content.title}
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  {content.description}
                </Text>
                <Button colorScheme="blue" size="sm" alignSelf="flex-end">
                  보기
                </Button>
              </VStack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
}
