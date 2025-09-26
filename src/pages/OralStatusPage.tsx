import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  Badge,
  SimpleGrid,
  Heading,
  IconButton,
  Button,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Progress,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import dayjs, { Dayjs } from "dayjs";
import {
  FaRegSmile,
  FaRegMeh,
  FaRegFrown,
  FaRegGrinStars,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

interface AreaStatus {
  name: string;
  plaque: number; // %
  result: "위험" | "주의" | "건강" | "양호";
}

interface CheckupLog {
  time: string;
  result: "위험" | "주의" | "건강" | "양호";
  detail: string;
  areas?: AreaStatus[];
}

interface DailyLogs {
  checkupLogs: CheckupLog[];
}

const OralStatusPage: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCheckup, setSelectedCheckup] = useState<CheckupLog | null>(
    null
  );
  const { t } = useTranslation();

  const logsByDate: Record<string, DailyLogs> = {
    "2025-09-25": {
      checkupLogs: [
        {
          time: "20:30",
          result: "위험",
          detail: t("oral_status_detail_sample"),
          areas: [
            { name: t("upper_right"), plaque: 53.4, result: "위험" },
            { name: t("upper_left"), plaque: 64.4, result: "위험" },
            { name: t("lower_left"), plaque: 92.4, result: "위험" },
            { name: t("lower_right"), plaque: 88.4, result: "위험" },
          ],
        },
      ],
    },
  };

  const daysInMonth = currentMonth.daysInMonth();
  const startDay = currentMonth.startOf("month").day();
  const formattedDate = selectedDate.format("YYYY-MM-DD");
  const logs = logsByDate[formattedDate] || { checkupLogs: [] };

  const resultConfig = {
    위험: { color: "red.400", icon: FaRegFrown, label: t("risk") },
    주의: { color: "yellow.400", icon: FaRegMeh, label: t("caution") },
    건강: { color: "blue.400", icon: FaRegSmile, label: t("healthy") },
    양호: { color: "green.400", icon: FaRegGrinStars, label: t("fair") },
  };

  const handlePrevMonth = () =>
    setCurrentMonth(currentMonth.subtract(1, "month"));
  const handleNextMonth = () => setCurrentMonth(currentMonth.add(1, "month"));

  const handleOpenModal = (log: CheckupLog) => {
    setSelectedCheckup(log);
    onOpen();
  };

  return (
    <Flex p={6} gap={8} align="flex-start">
      {/* 📅 달력 */}
      <Box flex="1" borderRadius="lg" bg="white" shadow="sm" p={4}>
        <Flex justify="space-between" align="center" mb={4}>
          <IconButton
            aria-label={t("prev")}
            icon={<ChevronLeftIcon />}
            onClick={handlePrevMonth}
          />
          <Heading size="md">{currentMonth.format("MMMM YYYY")}</Heading>
          <IconButton
            aria-label={t("next")}
            icon={<ChevronRightIcon />}
            onClick={handleNextMonth}
          />
        </Flex>

        <SimpleGrid columns={7} mb={2}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <Text key={d} textAlign="center" fontWeight="bold" fontSize="sm">
              {d}
            </Text>
          ))}
        </SimpleGrid>

        <SimpleGrid columns={7} spacing={2}>
          {Array.from({ length: startDay }).map((_, i) => (
            <Box key={`empty-${i}`} />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const date = currentMonth.startOf("month").add(i, "day");
            const key = date.format("YYYY-MM-DD");
            const count = logsByDate[key]?.checkupLogs.length || 0;
            const isSelected = date.isSame(selectedDate, "day");

            return (
              <Box
                key={key}
                h="50px"
                w="50px"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                position="relative"
                cursor="pointer"
                bg={isSelected ? "blue.500" : "gray.100"}
                color={isSelected ? "white" : "gray.800"}
                onClick={() => setSelectedDate(date)}
              >
                {i + 1}
                {count > 0 && (
                  <Badge
                    colorScheme="red"
                    borderRadius="full"
                    position="absolute"
                    top="2px"
                    right="2px"
                    fontSize="0.6em"
                    px={1}
                  >
                    {count}
                  </Badge>
                )}
              </Box>
            );
          })}
        </SimpleGrid>
      </Box>

      {/* 📋 기록 */}
      <Box flex="2" borderRadius="lg" bg="white" shadow="sm" p={4}>
        <Heading size="md" mb={4}>
          {selectedDate.format("YYYY년 MM월 DD일")} {t("record")}
        </Heading>
        <VStack align="stretch" spacing={4}>
          {logs.checkupLogs.length === 0 ? (
            <Text color="gray.500">{t("no_records")}</Text>
          ) : (
            logs.checkupLogs.map((log, i) => {
              const config = resultConfig[log.result];
              return (
                <Box
                  key={i}
                  border="1px solid"
                  borderColor={config.color}
                  borderLeft="6px solid"
                  borderRadius="md"
                  p={4}
                  bg="white"
                  shadow="md"
                >
                  <Flex align="center" justify="space-between" mb={2}>
                    <Text fontWeight="bold">
                      {t("checkup_result_message", {
                        result: config.label,
                      })}
                    </Text>
                    <Icon as={config.icon} boxSize={8} color={config.color} />
                  </Flex>
                  <Flex fontSize="sm" color="gray.600" justify="space-between">
                    <Text>🗓 {selectedDate.format("YYYY.MM.DD")}</Text>
                    <Text>⏰ {log.time}</Text>
                    <Button
                      size="sm"
                      variant="link"
                      color={config.color}
                      onClick={() => handleOpenModal(log)}
                    >
                      {t("view_detail")}
                    </Button>
                  </Flex>
                </Box>
              );
            })
          )}
        </VStack>
      </Box>

      {/* 🟢 상세 모달 */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="xl" p={4}>
          <ModalHeader>{t("checkup_detail_result")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedCheckup && (
              <>
                <Box
                  borderRadius="lg"
                  bg="gray.50"
                  p={4}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={4}
                >
                  <Box>
                    <Text fontWeight="bold">{t("checkup_result")}</Text>
                    <Text
                      fontSize="2xl"
                      color={resultConfig[selectedCheckup.result].color}
                      fontWeight="bold"
                    >
                      {resultConfig[selectedCheckup.result].label}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {selectedDate.format("YYYY.MM.DD")} {selectedCheckup.time}
                    </Text>
                  </Box>
                  <Icon
                    as={resultConfig[selectedCheckup.result].icon}
                    boxSize={12}
                    color={resultConfig[selectedCheckup.result].color}
                  />
                </Box>

                {/* 📊 부위별 구강 상태 */}
                {selectedCheckup.areas && (
                  <Box mb={4}>
                    <Text fontWeight="bold" mb={2}>
                      {t("area_oral_status")}
                    </Text>
                    <VStack align="stretch" spacing={3}>
                      {selectedCheckup.areas.map((area, idx) => {
                        const cfg = resultConfig[area.result];
                        return (
                          <Box
                            key={idx}
                            p={3}
                            border="1px solid"
                            borderColor={cfg.color}
                            borderRadius="md"
                            bg="gray.50"
                          >
                            <Flex justify="space-between" mb={1}>
                              <Text fontWeight="semibold">{area.name}</Text>
                              <Text color={cfg.color} fontWeight="bold">
                                {resultConfig[area.result].label}
                              </Text>
                            </Flex>
                            <Progress
                              value={area.plaque}
                              colorScheme={
                                area.result === "위험"
                                  ? "red"
                                  : area.result === "주의"
                                  ? "yellow"
                                  : area.result === "건강"
                                  ? "blue"
                                  : "green"
                              }
                              borderRadius="md"
                              size="sm"
                            />
                            <Text fontSize="sm" color="gray.600" mt={1}>
                              {t("plaque")}: {area.plaque}%
                            </Text>
                          </Box>
                        );
                      })}
                    </VStack>
                  </Box>
                )}

                {/* 상세 메시지 */}
                <Box borderRadius="md" bg="gray.50" p={3} fontSize="md" mb={4}>
                  {selectedCheckup.detail}
                </Box>

                {/* 구강 관리 팁 */}
                <Box borderRadius="md" bg="blue.50" p={4} mt={4}>
                  <Text fontWeight="bold" mb={2}>
                    {t("oral_tips_title")}
                  </Text>
                  <Text fontSize="sm" mb={3}>
                    {t("oral_tips_modal")}
                  </Text>
                  <Button colorScheme="blue" w="100%">
                    {t("go_to_check")}
                  </Button>
                </Box>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default OralStatusPage;
