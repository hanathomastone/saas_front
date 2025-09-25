import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Button,
  Badge,
} from "@chakra-ui/react";
import dayjs from "dayjs";

interface BrushLog {
  time: string;
  message: string;
}

interface CheckupLog {
  time: string;
  result: string;
}

interface DailyLogs {
  brushLogs: BrushLog[];
  checkupLogs: CheckupLog[];
}

const OralStatusPage: React.FC = () => {
  const today = dayjs();

  // 날짜별 더미 데이터
  const logsByDate: Record<string, DailyLogs> = {
    [today.subtract(2, "day").format("YYYY-MM-DD")]: {
      brushLogs: [
        { time: "09:33", message: "1회차 양치 완료! 오늘의 양치 목표 2번 남았어요." },
        { time: "12:33", message: "2회차 양치 완료! 오늘의 양치 목표 1번 남았어요." },
      ],
      checkupLogs: [],
    },
    [today.subtract(1, "day").format("YYYY-MM-DD")]: {
      brushLogs: [
        { time: "20:33", message: "3회차 양치 완료! 오늘의 양치 목표를 달성했어요." },
      ],
      checkupLogs: [],
    },
    [today.format("YYYY-MM-DD")]: {
      brushLogs: [
        { time: "09:33", message: "오늘 첫 양치 완료!" },
        { time: "21:00", message: "오늘 목표 달성! 총 3회 완료" },
      ],
      checkupLogs: [
        { time: "15:11", result: "검진 완료! 검사 결과 건강해요." },
      ],
    },
    [today.add(1, "day").format("YYYY-MM-DD")]: {
      brushLogs: [],
      checkupLogs: [],
    },
  };

  // 선택한 날짜 상태 (기본: 오늘)
  const [selectedDate, setSelectedDate] = useState(today);

  // 화면에 보여줄 날짜 리스트 (-4일 ~ +1일)
  const dates = Array.from({ length: 6 }, (_, i) =>
    today.add(i - 4, "day")
  );

  const formattedSelectedDate = selectedDate.format("YYYY-MM-DD");
  const logs = logsByDate[formattedSelectedDate] || { brushLogs: [], checkupLogs: [] };

  return (
    <Box p={4}>
      {/* 요일 캘린더 */}
      <Box mb={6}>
        <Text fontWeight="bold">요일별 나의 구강상태</Text>
        <HStack mt={2} spacing={3}>
          {dates.map((date) => {
            const isToday = date.isSame(today, "day");
            const isSelected = date.isSame(selectedDate, "day");
            return (
              <Badge
                key={date.format("YYYY-MM-DD")}
                p={2}
                borderRadius="md"
                cursor="pointer"
                colorScheme={
                  isSelected ? "blue" : isToday ? "gray" : "gray"
                }
                variant={isSelected ? "solid" : "subtle"}
                onClick={() => setSelectedDate(date)}
              >
                {date.format("DD일 (dd)")} {isToday && "(Today)"}
              </Badge>
            );
          })}
        </HStack>
      </Box>

      {/* 활동 로그 */}
      <VStack align="stretch" spacing={4}>
        {logs.brushLogs.length === 0 && logs.checkupLogs.length === 0 && (
          <Text color="gray.500">기록이 없습니다.</Text>
        )}

        {logs.brushLogs.map((log, i) => (
          <Box key={i} p={4} borderRadius="md" bg="gray.50" shadow="sm">
            <Text fontWeight="bold">{log.message}</Text>
            <Text fontSize="sm" color="gray.500">
              {selectedDate.format("YY.MM.DD")} {log.time}
            </Text>
          </Box>
        ))}

        {logs.checkupLogs.map((log, i) => (
          <Box
            key={i}
            p={4}
            borderRadius="md"
            bg="blue.50"
            border="1px solid"
            borderColor="blue.200"
          >
            <Flex justify="space-between">
              <Text fontWeight="bold">{log.result}</Text>
              <Button size="sm" colorScheme="blue" variant="ghost">
                자세히 보기
              </Button>
            </Flex>
            <Text fontSize="sm" color="gray.500">
              {selectedDate.format("YY.MM.DD")} {log.time}
            </Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default OralStatusPage;
