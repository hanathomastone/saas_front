import { useRef, useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const OralCheckCamera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [captured, setCaptured] = useState<string | null>(null);
  const { t } = useTranslation();

  const startCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(videoRef.current, 0, 0);
    const dataUrl = canvas.toDataURL("image/png");
    setCaptured(dataUrl);
  };

  return (
    <Box textAlign="center">
      <Text fontWeight="bold" mb={4}>
        {t("oral_check_camera_title")}
      </Text>
      <video
        ref={videoRef}
        autoPlay
        style={{ width: "100%", maxHeight: "300px" }}
      />
      <Button mt={4} colorScheme="blue" onClick={startCamera}>
        {t("start_camera")}
      </Button>
      <Button mt={4} colorScheme="teal" onClick={capturePhoto}>
        {t("capture_photo")}
      </Button>
      {captured && (
        <Box mt={4}>
          <Text>{t("captured_photo")}</Text>
          <img src={captured} alt="Captured" style={{ maxWidth: "100%" }} />
        </Box>
      )}
    </Box>
  );
};

export default OralCheckCamera;
