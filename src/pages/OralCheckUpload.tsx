import React, { useState } from "react";
import { Button, Flex, Text, VStack, Image, Input } from "@chakra-ui/react";
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

  return (
    <Flex direction="column" align="center" p={6}>
      <VStack spacing={4} w="100%" maxW="400px">
        <Text fontWeight="bold" fontSize="lg">
          {t("oral_upload_title")}
        </Text>

        {/* ✅ 기본 input 숨기고 label 버튼으로 커스텀 */}
        <Input
          type="file"
          accept="image/*"
          id="file-upload"
          display="none"
          onChange={handleFileChange}
        />

        <Button as="label" htmlFor="file-upload" colorScheme="blue" w="100%">
          {t("oral_upload_choose_file")}
        </Button>

        {/* 선택된 파일명 표시 */}
        <Text fontSize="sm" color="gray.600">
          {file ? file.name : t("oral_upload_no_file")}
        </Text>

        {preview && (
          <Image
            src={preview}
            alt="미리보기"
            maxH="200px"
            borderRadius="md"
            border="1px solid"
            borderColor="gray.200"
          />
        )}

        <Button colorScheme="blue" onClick={handleUpload} w="100%">
          {t("oral_upload_submit")}
        </Button>
      </VStack>
    </Flex>
  );
};

export default OralCheckUpload;
