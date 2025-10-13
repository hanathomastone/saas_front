// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Text,
//   Image,
//   VStack,
//   Spinner,
//   AspectRatio,
// } from "@chakra-ui/react";
// import { useParams, useLocation } from "react-router-dom";
// import { getContentDetail } from "../api/contents";
// import type {
//   ContentsCardListDto,
//   ContentsDto,
//   DataResponse,
// } from "../types/contents";
// import { useTranslation } from "react-i18next";

// const ContentDetail: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const location = useLocation();
//   const stateContent = (location.state as { content?: ContentsDto })?.content;

//   const [content, setContent] = useState<ContentsCardListDto | null>(null);
//   const [loading, setLoading] = useState(true);
//   const { t } = useTranslation();

//   useEffect(() => {
//     const fetchDetail = async () => {
//       if (!id) return;

//       // 🎯 VIDEO는 목록 데이터만 있으면 됨 (API 호출 불필요)
//       if (stateContent?.type === "VIDEO") {
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await getContentDetail(id);
//         const data: DataResponse<ContentsCardListDto> = res.data;
//         setContent(data.response);
//       } catch (err) {
//         console.error("콘텐츠 상세 조회 실패:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDetail();
//   }, [id, stateContent]);

//   if (loading) {
//     return (
//       <Box textAlign="center" mt="20">
//         <Spinner size="xl" />
//         <Text mt="4">{t("loading_content")}</Text>
//       </Box>
//     );
//   }

//   // 🎯 VIDEO 타입 처리
//   if (stateContent?.type === "VIDEO" && stateContent.videoURL) {
//     return (
//       <Box p={6}>
//         <Text fontSize="2xl" fontWeight="bold" mb={6}>
//           {stateContent.title}
//         </Text>
//         <AspectRatio ratio={16 / 9} w="100%" maxW="800px">
//           <iframe
//             src={stateContent.videoURL.replace(
//               "youtu.be",
//               "www.youtube.com/embed"
//             )}
//             title={stateContent.title}
//             allowFullScreen
//           />
//         </AspectRatio>
//       </Box>
//     );
//   }

//   // 🎯 CARD/ANIMATION 타입 처리
//   if (content) {
//     return (
//       <Box p={6}>
//         <Text fontSize="2xl" fontWeight="bold" mb={6}>
//           {content.title}
//         </Text>
//         <VStack spacing={6}>
//           {content.cardList.map((card) => (
//             <Image
//               key={card.number}
//               src={card.path}
//               alt={`${content.title} - ${t("card")} ${card.number}`}
//               borderRadius="lg"
//               shadow="sm"
//             />
//           ))}
//         </VStack>
//       </Box>
//     );
//   }

//   return (
//     <Box p={6}>
//       <Text>{t("content_not_found")}</Text>
//     </Box>
//   );
// };

// export default ContentDetail;
