import { useState } from "react";
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
  FaCalendarAlt,
  FaChartBar,
  FaBell,
  FaCog,
  FaUser, // 👤 사용자 아이콘
} from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

   const mainMenu = [
    { label: "Dashboard", icon: FaHome, path: "/dashboard" },
    { label: "Contents", icon: FaUsers, path: "/contents" },
    { label: "Oral-Status", icon: FaRegFileAlt, path: "/oral-status" },
    { label: "OralCheck Result", icon: FaCalendarAlt, path: "/oral-check/result" },
    { label: "Income", icon: FaChartBar, path: "/income" },
  ];

  const settingsMenu = [
    { label: "Notification", icon: FaBell, path: "/notifications" },
    { label: "Settings", icon: FaCog, path: "/settings" },
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
            <FaUser size={20} /> // 축소 상태: 사용자 아이콘만
          ) : (
            <Flex align="center" gap={3} cursor="pointer">
              <Avatar size="sm" name="Andrew Smith" src="/images/profile.png" />
              <Box>
                <Text fontWeight="bold" fontSize="sm">
                  Andrew Smith
                </Text>
                <Text fontSize="xs" color="gray.500">
                  Product Manager
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
            MAIN
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

      {/* SETTINGS Section */}
      <Box mt={6}>
        {!isCollapsed && (
          <Text fontSize="xs" color="gray.500" mb={2} fontWeight="bold">
            SETTINGS
          </Text>
        )}
        <VStack align="stretch" spacing={1}>
          {settingsMenu.map(({ label, icon: Icon, path }) => (
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
    </Box>
  );
}
