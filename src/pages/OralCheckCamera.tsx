import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const OralCheckCamera: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [loading, setLoading] = useState(false); // ✅ 로딩 상태 추가
  const toast = useToast();
  const navigate = useNavigate();

  // ✅ PC / 모바일 자동 감지
  const getDefaultFacingMode = (): "user" | "environment" => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    return isMobile ? "environment" : "user";
  };

  // ✅ 카메라 시작
  const startCamera = async (mode: "user" | "environment") => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: mode },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err: unknown) {
      toast({
        title: "카메라 접근 실패",
        description: err instanceof Error ? err.message : "알 수 없는 오류",
        status: "error",
        duration: 3000,
      });
    }
  };

  // ✅ 전면/후면 카메라 전환
  const handleSwitchCamera = () => {
    const newMode = facingMode === "user" ? "environment" : "user";
    setFacingMode(newMode);
    startCamera(newMode);
  };

  // ✅ 촬영
  const handleCapture = () => {
    if (!canvasRef.current || !videoRef.current) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/png");
    setPhoto(dataUrl);
  };

  // ✅ 결과보기 (로딩 → 결과 화면 이동)
  const handleGoResult = () => {
    setLoading(true); // 인디케이터 표시 시작
    setTimeout(() => {
      setLoading(false);
      // 필요하다면 photo를 서버 업로드 후 navigate에 전달
      navigate("/oral-check/result");
    }, 3000); // ⏳ 3초 뒤 결과 화면으로 이동 (API 호출 응답에 맞춰 변경 가능)
  };

  // ✅ 최초 실행 시 카메라 시작
  useEffect(() => {
    const defaultMode = getDefaultFacingMode();
    setFacingMode(defaultMode);
    startCamera(defaultMode);

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  // ✅ 로딩 화면 표시
  if (loading) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        minH="100vh"
        p={6}
      >
        <Box
          border="2px solid"
          borderColor="blue.300"
          borderRadius="md"
          p={8}
          maxW="350px"
          w="100%"
          textAlign="center"
          boxShadow="md"
        >
          <Text fontSize="lg" fontWeight="bold" mb={6}>
            구강 상태를 분석중입니다... <br />
            잠시만 기다려주세요!
          </Text>
          <Box
            w="80px"
            h="80px"
            borderRadius="full"
            bg="gray.200"
            display="flex"
            alignItems="center"
            justifyContent="center"
            mx="auto"
          >
            <Spinner size="lg" color="gray.500" thickness="4px" />
          </Box>
        </Box>
      </Flex>
    );
  }

  return (
    <Flex direction="column" align="center" p={6}>
      <Heading size="md" mb={4}>
        구강 촬영하기
      </Heading>

      {/* 카메라 화면 */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          width: "100%",
          maxWidth: "350px",
          borderRadius: "12px",
          border: "2px solid #ddd",
          marginBottom: "12px",
        }}
      />

      {/* 버튼 */}
      <Flex gap={3} mb={4}>
        <Button onClick={handleSwitchCamera} colorScheme="teal" size="sm">
          🔄 카메라 전환
        </Button>
        <Button onClick={handleCapture} colorScheme="blue" size="sm">
          📸 촬영하기
        </Button>
      </Flex>

      {/* 촬영된 이미지 */}
      {photo && (
        <Box textAlign="center">
          <Text fontSize="sm" mb={2}>
            촬영된 이미지
          </Text>
          <Image
            src={photo}
            alt="Captured"
            borderRadius="md"
            maxW="300px"
            mx="auto"
            mb={3}
          />

          {/* ✅ 결과보기 버튼 */}
          <Button colorScheme="purple" size="md" onClick={handleGoResult}>
            결과보기
          </Button>
        </Box>
      )}

      {/* 숨김 캔버스 */}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </Flex>
  );
};

export default OralCheckCamera;
