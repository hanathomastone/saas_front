import { Box, Flex, Heading, Text, Image, Badge } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function OralCheckPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Flex direction="column" align="center" p={10} bg="gray.50" minH="100vh">
      <Box w="full" maxW="900px" textAlign="center">
        {/* 상단: 구강촬영 가이드 */}
        <Heading size="md" mb={4}>
          {t("oral_guide_title") || "구강촬영 가이드"}
        </Heading>

        <Flex justify="center" mb={4}>
          <Box
            w="280px"
            h="280px"
            borderRadius="md"
            overflow="hidden"
            shadow="sm"
            bg="white"
          >
            <Image
              src="/images/guide1.png"
              alt={t("oral_guide_image_alt")}
              w="100%"
              h="100%"
              objectFit="cover"
            />
          </Box>
        </Flex>

        <Text fontSize="sm" color="gray.600" mb={10}>
          치아와 잇몸이 잘 보이도록 사진을 촬영하거나 업로드해주세요.
        </Text>

        {/* 하단: 실시간 촬영 / 파일 업로드 */}
        <Flex gap={6} justify="center" wrap="wrap">
          {/* 실시간 촬영 */}
          <Box
            flex="1"
            minW="250px"
            maxW="350px"
            p={6}
            bg="white"
            borderRadius="lg"
            shadow="sm"
            cursor="pointer"
            _hover={{ shadow: "md" }}
            onClick={() => navigate("/oral-check/camera")}
          >
            <Badge colorScheme="purple" mb={2}>
              {t("oral_method_camera_badge") || "ORAL METHOD CAMERA BADGE"}
            </Badge>
            <Heading size="sm" mb={2}>
              {t("oral_method_camera") || "실시간 촬영"}
            </Heading>
            <Text fontSize="sm" color="gray.600" mb={2}>
              카메라를 이용해 실시간으로 촬영 후 분석합니다.
            </Text>
            <Text fontSize="sm" color="blue.500">
              {t("learn_more") || "learn more →"}
            </Text>
          </Box>

          {/* 파일 업로드 */}
          <Box
            flex="1"
            minW="250px"
            maxW="350px"
            p={6}
            bg="white"
            borderRadius="lg"
            shadow="sm"
            cursor="pointer"
            _hover={{ shadow: "md" }}
            onClick={() => navigate("/oral-check/upload")}
          >
            <Badge colorScheme="blue" mb={2}>
              {t("oral_method_upload_badge") || "ORAL METHOD UPLOAD BADGE"}
            </Badge>
            <Heading size="sm" mb={2}>
              {t("oral_method_upload") || "파일 업로드"}
            </Heading>
            <Text fontSize="sm" color="gray.600" mb={2}>
              이미 촬영된 사진을 업로드하여 분석합니다.
            </Text>
            <Text fontSize="sm" color="blue.500">
              {t("learn_more") || "learn more →"}
            </Text>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}
