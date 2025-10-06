import React, { useState } from "react";
import {
  Button,
  Flex,
  Text,
  VStack,
  Image,
  Input,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const OralCheckUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }
  };

  const handleUpload = () => {
    if (!file) {
      alert(t("oral_upload_alert")); // 다국어 변환
      return;
    }
    alert(t("oral_upload_success"));
  };

  const containerPadding = useBreakpointValue({ base: 4, md: 8 });
  const cardWidth = useBreakpointValue({ base: "100%", md: "400px" });

  return (
    <Flex
  direction="column"
  align="center"
  px={containerPadding}
  py={{ base: 8, md: 16 }}   // ✅ 상단에서 여백만 줌
  bg="gray.50"
  minH="100vh"
>
  <Box
    bg="white"
    p={{ base: 4, md: 6 }}
    rounded="lg"
    shadow="md"
    w={cardWidth}
  >
        <VStack spacing={4} w="100%">
          <Text fontWeight="bold" fontSize={{ base: "md", md: "lg" }}>
            {t("oral_upload_title")}
          </Text>

          {/* ✅ Drag & Drop 업로드 박스 */}
          <Box
            border="2px dashed"
            borderColor="gray.300"
            borderRadius="md"
            w="100%"
            h="200px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            position="relative"
            overflow="hidden"
          >
            {/* 미리보기 or 기본 UI */}
            {preview ? (
              <Image
                src={preview}
                alt="미리보기"
                w="100%"
                h="100%"
                objectFit="contain"
              />
            ) : (
              <VStack spacing={2}>
                <Box fontSize="3xl">📄</Box>
                <Text fontWeight="bold">Select Files to Upload</Text>
                <Text fontSize="sm" color="gray.500">
                  or Drag and Drop, Copy and Paste Files
                </Text>
              </VStack>
            )}

            {/* 실제 input 파일 */}
            <Input
              type="file"
              accept="image/*"
              id="file-upload"
              position="absolute"
              top={0}
              left={0}
              w="100%"
              h="100%"
              opacity={0}
              cursor="pointer"
              onChange={handleFileChange}
            />
          </Box>

          {/* 선택된 파일명 표시 */}
          <Text fontSize="sm" color="gray.600" noOfLines={1} w="100%" textAlign="center">
            {file ? file.name : ""}
          </Text>

          <Button
            colorScheme="blue"
            onClick={handleUpload}
            w="100%"
            size={{ base: "md", md: "lg" }}
          >
            {t("oral_upload_submit")}
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default OralCheckUpload;
