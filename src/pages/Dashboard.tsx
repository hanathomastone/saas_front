import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Spinner,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Card,
  CardBody,
  Button,
  Image,
} from "@chakra-ui/react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// 👉 상태는 숫자로 관리
const lineData = [
  { 회차: 9, 상태: 2 },
  { 회차: 10, 상태: 2 },
  { 회차: 11, 상태: 3 },
  { 회차: 12, 상태: 3 },
  { 회차: 13, 상태: 2 },
  { 회차: 14, 상태: 1 },
  { 회차: 15, 상태: 3 },
  { 회차: 99, 상태: 2 },
  { 회차: 100, 상태: 3 },
  { 회차: 101, 상태: 1 },
];

export default function Dashboard() {
  const [loadingDashboard] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const userName = "TEST";

  // ✅ oralData도 번역 키 사용
  const oralData = [
    { name: t("healthy"), value: 3, color: "#3182CE" },
    { name: t("fair"), value: 1, color: "#38A169" },
    { name: t("caution"), value: 1, color: "#FFD808" },
    { name: t("risk"), value: 0, color: "#E53E3E" },
  ];

  // ✅ 상태라벨도 번역 키 사용
  const 상태라벨: Record<number, string> = {
    1: t("risk"),
    2: t("caution"),
    3: t("fair"),
    4: t("healthy"),
  };

  return (
    <Box p={6}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">{t("welcome", { name: userName })}</Heading>

        <Button
          colorScheme="blue"
          variant="outline"
          onClick={() => navigate("/contents")}
        >
          {t("go_to_contents")}
        </Button>
      </Flex>

      {loadingDashboard ? (
        <Flex minH="60vh" justify="center" align="center">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <>
          {/* 🔹 첫 번째 줄 - 카드 4개 */}
          <SimpleGrid columns={[1, 2, 4]} spacing={6} mb={6}>
            <Card>
              <CardBody textAlign="center">
                <Heading size="sm" mb={4}>
                  {t("recent_oral_status")}
                </Heading>
                <Image
                  src="/images/teeth_sample.png"
                  alt={t("recent_oral_status")}
                  mx="auto"
                  mb={4}
                  boxSize="120px"
                />
                <Text>
                  {t("oral_summary", {
                    name: userName,
                    status: t("healthy"),
                  })}
                </Text>
              </CardBody>
            </Card>

            {/* 검사 횟수 */}
            <Card>
              <CardBody>
                <Image
                  src="/images/count.png"
                  mx="auto"
                  mb={4}
                  boxSize="120px"
                />
                <Stat textAlign="center">
                  <StatLabel fontWeight="bold">{t("exam_count")}</StatLabel>
                  <StatNumber>4</StatNumber>
                  <Text fontSize="sm">{t("weekly_recommendation")}</Text>
                </Stat>
              </CardBody>
            </Card>

            {/* 양치 수 */}
            <Card>
              <CardBody>
                <Image
                  src="/images/toothbrush.png"
                  mx="auto"
                  mb={4}
                  boxSize="120px"
                />
                <Stat textAlign="center">
                  <StatLabel fontWeight="bold">{t("brushing_count")}</StatLabel>
                  <StatNumber>176</StatNumber>
                  <Text fontSize="sm">
                    {t("daily_average", { count: 1.4 })}
                  </Text>
                </Stat>
              </CardBody>
            </Card>

            {/* 구강상태 유형 */}
            <Card>
              <CardBody>
                <Image
                  src="/images/teeth.png"
                  mx="auto"
                  mb={4}
                  boxSize="120px"
                />
                <Stat textAlign="center">
                  <StatLabel fontWeight="bold">{t("oral_type")}</StatLabel>
                  <StatNumber fontSize="lg">{t("sensitive_teeth")}</StatNumber>
                  <Text fontSize="sm" color="gray.500">
                    {t("based_on_recent_exam")}
                  </Text>
                  <Text fontSize="sm" color="blue.500">
                    {t("exam_date", { date: "23.06.22" })}
                  </Text>
                </Stat>
              </CardBody>
            </Card>
          </SimpleGrid>

          {/* 🔹 두 번째 줄 - 2개 카드 */}
          <SimpleGrid columns={[1, 2]} spacing={6}>
            {/* 구강검진 건강 비율 */}
            <Card>
              <CardBody>
                <Stat>
                  <StatLabel fontWeight="bold" mb={2}>
                    {t("oral_health_ratio")}
                  </StatLabel>
                  <Flex justify="center" h="200px">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={oralData}
                          dataKey="value"
                          outerRadius={70}
                          innerRadius={45}
                          label
                        >
                          {oralData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </Flex>
                  <StatNumber textAlign="center" mt={2}>
                    60%
                  </StatNumber>
                  <Text fontSize="sm" textAlign="center">
                    {t("exam_total", { count: 5 })}
                  </Text>
                </Stat>
              </CardBody>
            </Card>

            {/* 구강 상태 변화 추이 */}
            <Card>
              <CardBody>
                <Heading size="sm" mb={4}>
                  {t("oral_trend")}
                </Heading>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="회차" />
                    <YAxis
                      type="number"
                      domain={[1, 4]}
                      ticks={[1, 2, 3, 4]}
                      tickFormatter={(value) => 상태라벨[value as number]}
                    />
                    <Tooltip
                      formatter={(value) => 상태라벨[value as number] || ""}
                    />
                    <Line
                      type="monotone"
                      dataKey="상태"
                      stroke="#3182CE"
                      strokeWidth={2}
                      dot
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardBody>
            </Card>
          </SimpleGrid>
        </>
      )}
    </Box>
  );
}
