import {
  Box,
  Flex,
  HStack,
  IconButton,
  Select,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  useDisclosure,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import { Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";   // ✅ 라우팅 연결

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <Flex
      as="header"
      bg="white"
      px={4}
      py={2}
      align="center"
      justify="space-between"
      shadow="sm"
      position="sticky"
      top={0}
      zIndex={10}
    >
      {/* 로고 */}
      <Box>
        <Image src="/images/DentiGlobal.png" alt="Dentix Logo" h="32px" objectFit="contain" />
      </Box>

      {/* 데스크탑 메뉴 */}
      <HStack spacing={6} display={{ base: "none", md: "flex" }}>
        <Link to="/">{t("menu.home")}</Link>

        {/* 콘텐츠 */}
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="ghost">
            {t("menu.contents")}
          </MenuButton>
          <MenuList>
            <MenuItem as={Link} to="/contents/view">
              {t("menu.contentsView")}
            </MenuItem>
          </MenuList>
        </Menu>

        {/* 구강검진 */}
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="ghost">
            {t("menu.oralCheck")}
          </MenuButton>
          <MenuList>
            <MenuItem as={Link} to="/oral-check">
              {t("menu.oralCheckMain")}
            </MenuItem>
            <MenuItem as={Link} to="/oral-check/result">
              {t("menu.oralCheckResult")}
            </MenuItem>
          </MenuList>
        </Menu>

        {/* 구강상태 */}
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="ghost">
            {t("menu.oralStatus")}
          </MenuButton>
          <MenuList>
            <MenuItem as={Link} to="/oral-status/survey">
              {t("menu.surveyWrite")}
            </MenuItem>
            <MenuItem as={Link} to="/oral-status/view">
              {t("menu.oralStatusView")}
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>

      {/* 오른쪽 (언어, 사용자, 햄버거) */}
      <HStack spacing={4}>
        <Select size="sm" w="120px" value={i18n.language} onChange={handleLanguageChange}>
          <option value="ko">한국어</option>
          <option value="en">English</option>
          <option value="vi">Tiếng Việt</option>
        </Select>

        <Box
          w="32px"
          h="32px"
          bg="purple.500"
          color="white"
          rounded="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="sm"
        >
          사
        </Box>

        <IconButton
          aria-label="메뉴 열기"
          icon={<HamburgerIcon />}
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          variant="ghost"
        />
      </HStack>

      {/* 모바일 Drawer 메뉴 */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <VStack align="start" p={6} spacing={6}>
            <Link to="/" onClick={onClose}>{t("menu.home")}</Link>
            <Box>
              <Text fontWeight="bold">{t("menu.contents")}</Text>
              <VStack align="start" pl={4}>
                <Link to="/contents" onClick={onClose}>{t("menu.contentsView")}</Link>
              </VStack>
            </Box>
            <Box>
              <Text fontWeight="bold">{t("menu.oralCheck")}</Text>
              <VStack align="start" pl={4}>
                <Link to="/oral-check" onClick={onClose}>{t("menu.oralCheckMain")}</Link>
                <Link to="/oral-check/result" onClick={onClose}>{t("menu.oralCheckResult")}</Link>
              </VStack>
            </Box>
            <Box>
              <Text fontWeight="bold">{t("menu.oralStatus")}</Text>
              <VStack align="start" pl={4}>
                <Link to="/questionnaire" onClick={onClose}>{t("menu.surveyWrite")}</Link>
                <Link to="/oral-status/view" onClick={onClose}>{t("menu.oralStatusView")}</Link>
              </VStack>
            </Box>
          </VStack>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
