import { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  VStack,
  HStack,
  Text,
  Icon,
  Image,
  Divider,
} from "@chakra-ui/react";
import { FaUpload, FaCamera } from "react-icons/fa";
import OralCheckUpload from "./OralCheckUpload"; // ✅ 커스텀 업로드 반영됨
import OralCheckCamera from "./OralCheckCamera";
import { useTranslation } from "react-i18next";

export default function OralCheckPage() {
  const [method, setMethod] = useState<"upload" | "camera">("upload");
  const { t } = useTranslation();

  return (
    <Flex direction="column" p={6} gap={6}>
      {/* 위쪽 가이드 이미지 영역 */}
      <Box
        border="1px solid"
        borderColor="gray.200"
        borderRadius="lg"
        p={6}
        textAlign="center"
        bg="white"
      >
        <Heading size="md" mb={4}>
          {t("oral_guide_title")}
        </Heading>
        <Flex justify="center" gap={8}>
          <Image
            src="/images/guide1.png"
            alt={t("oral_guide_image_alt")}
            boxSize="300px"
            objectFit="contain"
          />
        </Flex>
        <Text fontSize="sm" color="gray.500" mt={4}>
          {t("oral_guide_desc")}
        </Text>
      </Box>

      <Divider />

      {/* 아래쪽 선택 + 실행 영역 */}
      <Flex gap={8} align="flex-start">
        {/* 왼쪽 선택 영역 */}
        <Box flex="1" borderRight="1px solid" borderColor="gray.200" pr={6}>
          <Heading size="md" mb={4}>
            {t("oral_method_title")}
          </Heading>
          <VStack spacing={4} align="stretch">
            <Box
              p={4}
              borderWidth="2px"
              borderColor={method === "upload" ? "blue.400" : "gray.200"}
              borderRadius="md"
              cursor="pointer"
              onClick={() => setMethod("upload")}
              bg={method === "upload" ? "blue.50" : "white"}
              _hover={{ shadow: "md" }}
            >
              <HStack spacing={3}>
                <Icon as={FaUpload} boxSize={6} color="blue.500" />
                <Text fontWeight="bold">{t("oral_method_upload")}</Text>
              </HStack>
              <Text fontSize="sm" color="gray.500" mt={2}>
                {t("oral_method_upload_desc")}
              </Text>
            </Box>

            <Box
              p={4}
              borderWidth="2px"
              borderColor={method === "camera" ? "teal.400" : "gray.200"}
              borderRadius="md"
              cursor="pointer"
              onClick={() => setMethod("camera")}
              bg={method === "camera" ? "teal.50" : "white"}
              _hover={{ shadow: "md" }}
            >
              <HStack spacing={3}>
                <Icon as={FaCamera} boxSize={6} color="teal.500" />
                <Text fontWeight="bold">{t("oral_method_camera")}</Text>
              </HStack>
              <Text fontSize="sm" color="gray.500" mt={2}>
                {t("oral_method_camera_desc")}
              </Text>
            </Box>
          </VStack>
        </Box>

        {/* 오른쪽 내용 */}
        <Box flex="2" pl={6}>
          {method === "upload" ? <OralCheckUpload /> : <OralCheckCamera />}
        </Box>
      </Flex>
    </Flex>
  );
}
