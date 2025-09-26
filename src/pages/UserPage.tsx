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
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function UserPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // 임시 로그아웃 처리
    localStorage.removeItem("accessToken"); // 토큰 제거 (추후 API 연동 대비)
    navigate("/login");
  };

  return (
    <Box p={6} maxW="500px" mx="auto">
      {/* Header */}
      <Heading size="md" mb={6}>
        {t("user_settings")}
      </Heading>

      {/* Profile Section */}
      <Flex
        align="center"
        justify="space-between"
        p={4}
        borderRadius="md"
        bg="gray.50"
        mb={6}
      >
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

      {/* Service Settings */}
      <Box p={4} borderRadius="md" bg="gray.50" mb={6}>
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
      <Box p={4} borderRadius="md" bg="gray.50" mb={6}>
        <Heading size="sm" mb={4}>
          {t("service_usage")}
        </Heading>
        <Stack spacing={4}>
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
          <Flex justify="space-between" align="center">
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
    </Box>
  );
}
