import {
  Flex,
  Box,
  Image,
  HStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Select,
  Avatar,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { i18n } = useTranslation();
  const userName = localStorage.getItem("userName") || "사용자";

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <Flex
      as="header"
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.200"
      px={8}
      py={3}
      align="center"
      justify="space-between"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
    >
      {/* 로고 */}
      <Box>
        <RouterLink to="/dashboard">
          <Image src="/images/DentiGlobal.png" alt="Logo" h="28px" />
        </RouterLink>
      </Box>

      {/* 네비게이션 메뉴 */}
      <HStack spacing={8}>
        {/* 홈 */}
        <RouterLink to="/dashboard">
          <Text fontWeight="medium">홈</Text>
        </RouterLink>

        {/* 콘텐츠 */}
        <Menu>
          <MenuButton as={Text} cursor="pointer" fontWeight="medium">
            콘텐츠
          </MenuButton>
          <MenuList>
            <MenuItem as={RouterLink} to="/contents">
              콘텐츠 보기
            </MenuItem>
          </MenuList>
        </Menu>

        {/* 구강검진 */}
        <Menu>
          <MenuButton as={Text} cursor="pointer" fontWeight="medium">
            구강검진
          </MenuButton>
          <MenuList>
            <MenuItem as={RouterLink} to="/oral-check">
              구강검진
            </MenuItem>
            <MenuItem as={RouterLink} to="/oral-check/result">
              구강검진 결과
            </MenuItem>
          </MenuList>
        </Menu>

        {/* 구강상태 */}
        <Menu>
          <MenuButton as={Text} cursor="pointer" fontWeight="medium">
            구강상태
          </MenuButton>
          <MenuList>
            <MenuItem as={RouterLink} to="/oral-status">
              현재 구강상태
            </MenuItem>
            <MenuItem as={RouterLink} to="/survey">
              문진표
            </MenuItem>
            <MenuItem as={RouterLink} to="/brushing-log">
              양치질 기록
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>

      {/* 오른쪽 영역: 언어 선택 + 프로필 */}
      <HStack spacing={4}>
        {/* 언어 선택 */}
        <Select
          size="sm"
          w="110px"
          value={i18n.language}
          onChange={handleLanguageChange}
          borderColor="gray.300"
        >
          <option value="ko">한국어</option>
          <option value="en">English</option>
          <option value="vi">Tiếng Việt</option>
        </Select>

        {/* 프로필 드롭다운 */}
        <Menu>
          <MenuButton>
            <Avatar size="sm" name={userName} src="/images/profile.png" />
          </MenuButton>
          <MenuList>
            <MenuItem as={RouterLink} to="/user">
              사용자 정보
            </MenuItem>
            <MenuItem
              onClick={() => {
                localStorage.clear();
                window.location.href = "/login";
              }}
            >
              로그아웃
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
}
