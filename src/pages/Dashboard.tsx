import { useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { getDashboardData } from "../api/dashboard";
import type { DashboardDto } from "../types/dashboard";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState<DashboardDto | null>(null);
  const [loadingDashboard, setLoadingDashboard] = useState(true);
  const navigate = useNavigate();

  const userName = localStorage.getItem("userName") || "사용자";

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getDashboardData();
        setDashboard(res.response); // ✅ response 안에서 꺼내기
      } catch (err) {
        console.error("대시보드 데이터 불러오기 실패", err);
      } finally {
        setLoadingDashboard(false);
      }
    };
    fetchDashboard();
  }, []);

  // ✅ 구강 상태 도넛 차트 데이터
  const oralData = dashboard
    ? [
        { name: "HEALTHY", value: dashboard.oralCheckHealthyCount, color: "#3182CE" },
        { name: "GOOD", value: dashboard.oralCheckGoodCount, color: "#38A169" },
        { name: "ATTENTION", value: dashboard.oralCheckAttentionCount, color: "#DD6B20" },
        { name: "DANGER", value: dashboard.oralCheckDangerCount, color: "#E53E3E" },
      ]
    : [];

  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">{userName}님, 어서오세요!</Heading>

        {/* ✅ 콘텐츠 페이지로 이동 */}
        <Button
          colorScheme="blue"
          variant="outline"
          onClick={() => navigate("/contents")}
        >
          콘텐츠 보러가기
        </Button>
      </Flex>

      {loadingDashboard ? (
        <Flex minH="60vh" justify="center" align="center">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <SimpleGrid columns={[1, 2]} spacing={6} mb={10}>
          {/* ✅ 구강검진 도넛 그래프 */}
          <Card>
            <CardBody>
              <Stat>
                <StatLabel fontWeight="bold" mb={2}>
                  건강 구강 비율
                </StatLabel>
                <Flex justify="center">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={oralData}
                        dataKey="value"
                        outerRadius={80}
                        innerRadius={50}
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
                <StatNumber textAlign="center" mt={4}>
                  {dashboard && dashboard.oralCheckTotalCount > 0
                    ? (
                        (dashboard.oralCheckHealthyCount /
                          dashboard.oralCheckTotalCount) *
                        100
                      ).toFixed(0)
                    : 0}
                  %
                </StatNumber>
                <Text fontSize="sm" textAlign="center">
                  총 {dashboard?.oralCheckTotalCount ?? 0}회 검사
                </Text>
              </Stat>
            </CardBody>
          </Card>

          {/* ✅ 양치 수 */}
          <Card>
            <CardBody>
              <Stat>
                <StatLabel fontWeight="bold">양치 수</StatLabel>
                <StatNumber>{dashboard?.toothBrushingTotalCount ?? 0}</StatNumber>
                <Text fontSize="sm">
                  일 평균 {dashboard?.toothBrushingAverage ?? 0}회
                </Text>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>
      )}
    </Box>
  );
}
