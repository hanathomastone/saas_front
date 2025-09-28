import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Image,
  Grid,
  GridItem,
  Badge,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getContents } from "../api/contents";
import type { ContentsDto, DataResponse } from "../types/contents";
import { useTranslation } from "react-i18next";

// ✅ 카테고리 타입 정의
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
  const { t } = useTranslation();

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
        <Text mt="4">{t("loading_content")}</Text>
      </Box>
    );
  }

  return (
    <Box p={6} maxW="1200px" mx="auto">
      <Text fontSize="2xl" fontWeight="bold" mb={6}>
        {t("contents_list")}
      </Text>
      <Box p={6} maxW="1200px" mx="auto">
        {/* ✅ 반응형 카드 배치 (minmax) */}
        <Grid
          templateColumns={[
            "repeat(2, 1fr)", // 📱 모바일: 2개
            "repeat(3, 1fr)", // 💻 태블릿: 3개
            "repeat(4, 1fr)", // 🖥️ 데스크탑: 4개
          ]}
          gap={6}
        >
          {contents.map((item) => {
            const contentCategories = categories.filter((cat) =>
              item.categoryIds.includes(cat.id)
            );

            return (
              <GridItem
                key={item.id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                shadow="sm"
                bg="white"
                cursor="pointer"
                _hover={{ shadow: "md" }}
                onClick={() =>
                  navigate(`/contents/${item.id}`, { state: { content: item } })
                }
              >
                {/* 이미지 */}
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  w="100%"
                  h="200px"
                  objectFit="cover"
                />

                {/* 내용 */}
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
                    <Badge
                      borderRadius="full"
                      px={3}
                      py={1}
                      fontSize="xs"
                      bg={item.typeColor}
                      color="white"
                    >
                      {item.type === "CARD"
                        ? t("type_card")
                        : item.type === "VIDEO"
                        ? t("type_video")
                        : t("type_animation")}
                    </Badge>
                  </Flex>

                  <Text fontWeight="bold" noOfLines={2}>
                    {item.title}
                  </Text>
                </Box>
              </GridItem>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default Contents;
