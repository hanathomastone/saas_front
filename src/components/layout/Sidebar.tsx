import { useState } from "react";
import { GiTooth } from "react-icons/gi";
import {
  Box,
  Flex,
  IconButton,
  Text,
  VStack,
  Tooltip,
  Avatar,
  Divider,
} from "@chakra-ui/react";
import {
  FaHome,
  FaUsers,
  FaRegFileAlt,
  FaChartBar,
  FaUser,
} from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { t } = useTranslation();

  const mainMenu = [
    { label: t("dashboard"), icon: FaHome, path: "/dashboard" },
    { label: t("contents"), icon: FaUsers, path: "/contents" },
    { label: t("oral_status"), icon: FaRegFileAlt, path: "/oral-status" },
    { label: t("oral_check"), icon: GiTooth, path: "/oral-check" },
    {
      label: t("oral_check_result"),
      icon: FaChartBar,
      path: "/oral-check/result",
    },
  ];

  return (
    <Box
      bg="white"
      color="gray.800"
      minH="100vh"
      w={isCollapsed ? "70px" : "240px"}
      transition="width 0.2s"
      px={isCollapsed ? 2 : 4}
      py={4}
      borderRight="1px solid"
      borderColor="gray.200"
      position="fixed"
      left={0}
      top={0}
      bottom={0}
      zIndex={1000}
    >
      {/* 사용자 정보 + 토글 */}
      <Flex align="center" justify="space-between" mb={8}>
        <RouterLink to="/user">
          {isCollapsed ? (
            <FaUser size={20} />
          ) : (
            <Flex align="center" gap={3} cursor="pointer">
              <Avatar size="sm" name="Andrew Smith" src="/images/profile.png" />
              <Box>
                <Text fontWeight="bold" fontSize="sm">
                  TEST
                </Text>
              </Box>
            </Flex>
          )}
        </RouterLink>

        <IconButton
          aria-label="Toggle Sidebar"
          size="sm"
          variant="ghost"
          color="gray.600"
          onClick={() => setIsCollapsed(!isCollapsed)}
          _hover={{ bg: "gray.100" }}
          icon={<Text fontSize="lg">{isCollapsed ? "›" : "‹"}</Text>}
        />
      </Flex>

      {/* MAIN Section */}
      <Box mb={6}>
        {!isCollapsed && (
          <Text fontSize="xs" color="gray.500" mb={2} fontWeight="bold">
            {t("main_section")}
          </Text>
        )}
        <VStack align="stretch" spacing={1}>
          {mainMenu.map(({ label, icon: Icon, path }) => (
            <RouterLink key={label} to={path}>
              <Flex
                align="center"
                p={3}
                borderRadius="md"
                _hover={{ bg: "gray.100" }}
                cursor="pointer"
              >
                <Icon size={18} />
                {!isCollapsed && <Text ml={3}>{label}</Text>}
                {isCollapsed && (
                  <Tooltip label={label} placement="right">
                    <span />
                  </Tooltip>
                )}
              </Flex>
            </RouterLink>
          ))}
        </VStack>
      </Box>

      <Divider />
    </Box>
  );
}
