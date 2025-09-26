import React from "react";
import { useTranslation } from "react-i18next";

function OralCheckResult() {
  const { t } = useTranslation();

  const userName = "홍길동"; // ⚠️ 실제로는 로그인/참여자 이름 받아오기
  const examDate = "2023.06.06";

  return (
    <div style={{ background: "#f5f5f5", minHeight: "100vh", padding: "1rem" }}>
      {/* 상단 제목 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <h2 style={{ fontWeight: "bold" }}>{t("oral_result_title")}</h2>
        <button
          style={{
            border: "none",
            background: "transparent",
            color: "#0B57D0",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {t("done")}
        </button>
      </div>

      {/* 요약 카드 */}
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "1rem",
          marginBottom: "1rem",
        }}
      >
        <p style={{ color: "#888", fontSize: "0.9rem" }}>{examDate}</p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "1rem", fontWeight: "bold" }}>
            {t("oral_result_summary", {
              name: userName,
              status: t("healthy"),
            })}
          </p>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "#0B57D0",
            }}
          />
        </div>
      </div>

      {/* 검사 결과 요약 */}
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "1rem",
          marginBottom: "1rem",
        }}
      >
        <h3 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
          {t("oral_result_detail_title", { name: userName })}
        </h3>
        <p style={{ fontWeight: "bold", marginTop: "0.5rem" }}>
          {t("overall_oral_status")}
        </p>
        <p>
          {t("average_plaque")}:{" "}
          <span style={{ fontWeight: "bold" }}>4.6%</span>{" "}
          <span style={{ color: "#0B57D0", fontWeight: "bold" }}>
            {t("healthy")}
          </span>
        </p>

        <p style={{ fontWeight: "bold", marginTop: "1rem" }}>
          {t("area_oral_status")}
        </p>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            {t("upper_right")} → {t("plaque")}: 3.4%{" "}
            <span style={{ color: "#0B57D0" }}>{t("healthy")}</span>
          </li>
          <li>
            {t("upper_left")} → {t("plaque")}: 4.4%{" "}
            <span style={{ color: "#0B57D0" }}>{t("healthy")}</span>
          </li>
          <li>
            {t("lower_left")} → {t("plaque")}: 2.4%{" "}
            <span style={{ color: "#0B57D0" }}>{t("healthy")}</span>
          </li>
          <li>
            {t("lower_right")} → {t("plaque")}: 8.4%{" "}
            <span style={{ color: "green" }}>{t("fair")}</span>
          </li>
        </ul>

        <p style={{ marginTop: "1rem" }}>
          {t("oral_result_conclusion")}
          <br />
          {t("oral_result_tip", { area: t("lower_left") })}
        </p>
      </div>

      {/* 구강 관리 팁 */}
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "1rem",
          marginBottom: "1rem",
        }}
      >
        <h3 style={{ marginBottom: "0.5rem" }}>{t("oral_tips_title")}</h3>
        <p>{t("oral_tips_desc", { name: userName })}</p>
        <p style={{ fontWeight: "bold" }}>{t("oral_tips_cta")}</p>
        <button
          style={{
            background: "#0B57D0",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "0.8rem 1.2rem",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "1rem",
          }}
        >
          {t("like_button")}
        </button>
      </div>

      {/* 안내사항 */}
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "1rem",
          fontSize: "0.85rem",
          color: "#555",
        }}
      >
        <h4 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span
            style={{
              width: "12px",
              height: "12px",
              background: "#ccc",
              borderRadius: "50%",
              display: "inline-block",
            }}
          ></span>
          {t("notice")}
        </h4>
        <p style={{ marginTop: "0.5rem" }}>{t("oral_result_notice_text")}</p>
      </div>
    </div>
  );
}

export default OralCheckResult;
