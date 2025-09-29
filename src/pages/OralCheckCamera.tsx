import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";

const OralCheckCamera: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const toast = useToast();

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
          />
        </Box>
      )}

      {/* 숨김 캔버스 */}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </Flex>
  );
};

export default OralCheckCamera;
