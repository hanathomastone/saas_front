import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function RegisterForm() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const { t } = useTranslation();

  const isPasswordValid =
    password.length >= 8 &&
    password.length <= 20 &&
    /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const handleNext = () => {
    if (!userId) {
      toast({ title: t("enter_user_id"), status: "warning" });
      return;
    }
    if (!isPasswordValid) {
      toast({
        title: t("password_invalid"),
        status: "error",
      });
      return;
    }
    if (password !== passwordCheck) {
      toast({ title: t("password_mismatch"), status: "error" });
      return;
    }
    navigate("/register/extra");
  };

  return (
    <Box p={6} maxW="400px" mx="auto">
      {/* 헤더 */}
      <Heading size="sm" mb={6}>
        {t("register_id_pw")}
      </Heading>

      <Text color="gray.600" mb={6}>
        {t("register_id_pw_description")}
      </Text>

      {/* 아이디 */}
      <FormControl mb={4}>
        <FormLabel>{t("enter_user_id")}</FormLabel>
        <Input
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder={t("user_id_placeholder")}
        />
        <Text fontSize="sm" color="gray.500">
          {t("user_id_rule")}
        </Text>
      </FormControl>

      {/* 비밀번호 */}
      <FormControl mb={4}>
        <FormLabel>{t("enter_password")}</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t("password_placeholder")}
        />
        <Text fontSize="sm" color={isPasswordValid ? "green.500" : "red.500"}>
          {isPasswordValid ? t("password_valid") : t("password_rule")}
        </Text>
      </FormControl>

      {/* 비밀번호 확인 */}
      <FormControl mb={6}>
        <FormLabel>{t("confirm_password")}</FormLabel>
        <Input
          type="password"
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
          placeholder={t("confirm_password_placeholder")}
        />
        {password && passwordCheck && password !== passwordCheck && (
          <Text fontSize="sm" color="red.500">
            {t("password_mismatch")}
          </Text>
        )}
      </FormControl>

      {/* Next Button */}
      <Button
        colorScheme="blue"
        w="100%"
        h="50px"
        onClick={handleNext}
        isDisabled={!userId || !password || !passwordCheck}
      >
        {t("next")}
      </Button>
    </Box>
  );
}
