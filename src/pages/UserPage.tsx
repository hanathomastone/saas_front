import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Stack,
  Switch,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  RadioGroup,
  Radio,
  VStack,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function UserPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  // ✅ 모달 상태
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedService, setSelectedService] = useState("플라그 검출 서비스");

  const handleServiceChange = () => {
    console.log("선택된 서비스:", selectedService);
    // TODO: API 연동해서 실제 서비스 변경 처리
    onClose();
  };

  return (
    <Box bg="gray.50" minH="100vh" p={6}>
      {/* Header */}
      <Heading size="md" mb={6}>
        {t("user_settings")}
      </Heading>

      {/* Profile Section */}
      <Box bg="white" rounded="xl" shadow="sm" p={6} mb={6}>
        <Flex align="center" justify="space-between">
          <Flex align="center" gap={4}>
            <Avatar size="lg" name="홍길동" />
            <Box>
              <Text fontWeight="bold">홍길동</Text>
              <Text fontSize="sm" color="gray.600">
                ABCDEFG12
              </Text>
              <Text fontSize="sm" color="gray.600">
                90.06.06 (32)
              </Text>
              <Text fontSize="sm" color="gray.600">
                010-1234-****
              </Text>
            </Box>
          </Flex>
          <RouterLink to="/reset-password" state={{ from: "user" }}>
            <Button size="sm" colorScheme="blue" variant="outline">
              {t("change_password")}
            </Button>
          </RouterLink>
        </Flex>
      </Box>

      {/* Service Subscription Section */}
      <Box bg="white" rounded="xl" shadow="sm" p={6} mb={6}>
        <Flex justify="space-between" align="center" mb={2}>
          <Text fontWeight="bold">이용중인 서비스</Text>
          <Button size="sm" colorScheme="blue" variant="outline" onClick={onOpen}>
            서비스 변경하기
          </Button>
        </Flex>
        <Text>{selectedService}</Text>
      </Box>

      {/* Service Settings */}
      <Box bg="white" rounded="xl" shadow="sm" p={6} mb={6}>
        <Heading size="sm" mb={4}>
          {t("service_settings")}
        </Heading>
        <Flex justify="space-between" align="center" mb={4}>
          <Text>{t("marketing_consent")}</Text>
          <Switch />
        </Flex>
        <Divider />
        <Flex justify="space-between" align="center" my={4}>
          <Text>{t("auto_login")}</Text>
          <Switch defaultChecked />
        </Flex>
        <Divider />
        <Flex justify="space-between" align="center" mt={4}>
          <Text>{t("toothbrushing_count")}</Text>
          <Input
            type="number"
            defaultValue={3}
            width="60px"
            textAlign="center"
          />
        </Flex>
      </Box>

      {/* Service Menu */}
      <Box bg="white" rounded="xl" shadow="sm" p={6} mb={6}>
        <Heading size="sm" mb={4}>
          {t("service_usage")}
        </Heading>
        <Stack spacing={0}>
          <Button variant="ghost" justifyContent="flex-start">
            {t("medical_info")}
          </Button>
          <Divider />
          <Button variant="ghost" justifyContent="flex-start">
            {t("oral_check_guide")}
          </Button>
          <Divider />
          <RouterLink to="/contact" state={{ from: "user" }}>
            <Button variant="ghost" justifyContent="flex-start">
              {t("contact")}
            </Button>
          </RouterLink>
          <Divider />
          <Button variant="ghost" justifyContent="flex-start">
            {t("view_terms")}
          </Button>
          <Divider />
          <Button variant="ghost" justifyContent="flex-start" color="red.500">
            {t("delete_account")}
          </Button>
          <Divider />
          <Flex justify="space-between" align="center" py={2}>
            <Text>{t("version_info")}</Text>
            <Text fontSize="sm">1.0.0</Text>
          </Flex>
          <Divider />
          <Button variant="ghost" justifyContent="flex-start">
            {t("open_source_license")}
          </Button>
        </Stack>
      </Box>

      {/* Logout */}
      <Button w="100%" colorScheme="gray" onClick={handleLogout}>
        {t("logout")}
      </Button>

      {/* Service Change Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>서비스 변경하기</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RadioGroup value={selectedService} onChange={setSelectedService}>
              <VStack align="stretch" spacing={3}>
                <Radio value="플라그 검출 서비스">플라그 검출 서비스</Radio>
                <Radio value="치은염 검출 서비스">치은염 검출 서비스</Radio>
              </VStack>
            </RadioGroup>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleServiceChange}>
              확인
            </Button>
            <Button variant="ghost" onClick={onClose}>
              취소
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
