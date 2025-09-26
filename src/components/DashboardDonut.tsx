// // src/components/DashboardDonut.tsx
// import { Box, Heading } from "@chakra-ui/react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   Tooltip,
//   Legend,
// } from "recharts";

// // 타입 정의
// interface ChartData {
//   name: "건강" | "양호" | "주의" | "위험";
//   value: number;
// }

// const data: ChartData[] = [
//   { name: "건강", value: 45 },
//   { name: "양호", value: 25 },
//   { name: "주의", value: 20 },
//   { name: "위험", value: 10 },
// ];

// const COLORS: Record<ChartData["name"], string> = {
//   건강: "#147DFF", // 파랑
//   양호: "#16DEBC", // 민트
//   주의: "#FFD808", // 노랑
//   위험: "#FF4D4D", // 빨강
// };

// export default function DashboardDonut() {
//   return (
//     <Box p={6} borderRadius="lg" bg="white" shadow="md" w="100%" h="350px">
//       <Heading size="md" mb={4}>
//         건강 구강 상태 비율
//       </Heading>

//       <ResponsiveContainer width="100%" height="80%">
//         <PieChart>
//           <Pie
//             data={data}
//             dataKey="value"
//             nameKey="name"
//             cx="50%"
//             cy="50%"
//             innerRadius={70} // ✅ 도넛형
//             outerRadius={100}
//             paddingAngle={3}
//             label
//           >
//             {data.map((entry) => (
//               <Cell key={`cell-${entry.name}`} fill={COLORS[entry.name]} />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend verticalAlign="bottom" height={36} />
//         </PieChart>
//       </ResponsiveContainer>
//     </Box>
//   );
// }
