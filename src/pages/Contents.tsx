import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Image,
  SimpleGrid,
  Badge,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getContents } from "../api/contents";
import type { ContentsDto, DataResponse } from "../types/contents";

// ✅ 추가: 카테고리 타입 정의
interface ContentsCategoryDto {
  id: number;
  name: string;
  color: string | null;
  sort: number;
}

const Contents: React.FC = () => {
  const [categories, setCategories] = useState<ContentsCategoryDto[]>([]);
  const [contents, setContents] = useState<ContentsDto[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const res = await getContents();
        const data: DataResponse<{
          categories: ContentsCategoryDto[];
          contents: ContentsDto[];
        }> = res.data;

        setCategories(data.response.categories);
        setContents(data.response.contents);
      } catch (err) {
        console.error("콘텐츠 목록 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContents();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt="20">
        <Spinner size="xl" />
        <Text mt="4">콘텐츠를 불러오는 중...</Text>
      </Box>
    );
  }

  return (
    <Box p={6}>
      <Text fontSize="2xl" fontWeight="bold" mb={6}>
        콘텐츠 목록
      </Text>

      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {contents.map((item) => {
          const contentCategories = categories.filter((cat) =>
            item.categoryIds.includes(cat.id)
          );

          return (
            <Box
              key={item.id}
              borderRadius="lg"
              overflow="hidden"
              shadow="md"
              cursor="pointer"
              onClick={() =>
                navigate(`/contents/${item.id}`, { state: { content: item } })
              }
            >
              {/* 배경 이미지 */}
              <Image
                src={item.thumbnail}
                alt={item.title}
                w="100%"
                h="180px"
                objectFit="cover"
              />

              {/* 하단 정보 박스 */}
              <Box p={4}>
                <Flex gap={2} mb={2} wrap="wrap">
                  {contentCategories.map((cat) => (
                    <Badge
                      key={cat.id}
                      borderRadius="full"
                      px={3}
                      py={1}
                      fontSize="xs"
                      bg={cat.color || "gray.500"}
                      color="white"
                    >
                      {cat.name}
                    </Badge>
                  ))}
                  <Badge borderRadius="full" px={3} py={1} fontSize="xs" bg={item.typeColor} color="white">
                    {item.type === "CARD"
                      ? "카드뉴스"
                      : item.type === "VIDEO"
                      ? "영상"
                      : "애니메이션"}
                  </Badge>
                </Flex>
                <Text fontWeight="bold" noOfLines={2}>
                  {item.title}
                </Text>
              </Box>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default Contents;
