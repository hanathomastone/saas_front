import React from "react";

function OralCheckResult() {
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
        <h2 style={{ fontWeight: "bold" }}>촬영 결과</h2>
        <button
          style={{
            border: "none",
            background: "transparent",
            color: "#0B57D0",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          완료
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
        <p style={{ color: "#888", fontSize: "0.9rem" }}>2023.06.06</p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "1rem", fontWeight: "bold" }}>
            홍길동 님의 구강 상태는{" "}
            <span style={{ color: "#0B57D0" }}>건강</span> 입니다
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
          홍길동님의 검진 결과 내용
        </h3>
        <p style={{ fontWeight: "bold", marginTop: "0.5rem" }}>
          전체적인 구강 상태
        </p>
        <p>
          전체 평균 플라그: <span style={{ fontWeight: "bold" }}>4.6%</span>{" "}
          <span style={{ color: "#0B57D0", fontWeight: "bold" }}>건강</span>
        </p>

        <p style={{ fontWeight: "bold", marginTop: "1rem" }}>
          부위별 구강 상태
        </p>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            상악우측 → 플라그: 3.4%{" "}
            <span style={{ color: "#0B57D0" }}>건강</span>
          </li>
          <li>
            상악좌측 → 플라그: 4.4%{" "}
            <span style={{ color: "#0B57D0" }}>건강</span>
          </li>
          <li>
            하악좌측 → 플라그: 2.4%{" "}
            <span style={{ color: "#0B57D0" }}>건강</span>
          </li>
          <li>
            하악우측 → 플라그: 8.4% <span style={{ color: "green" }}>양호</span>
          </li>
        </ul>

        <p style={{ marginTop: "1rem" }}>
          전체적으로 건강한 상태 👍
          <br />
          양치질 할 때, <b>하악좌측</b>을 조금 더 신경 써주세요.
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
        <h3 style={{ marginBottom: "0.5rem" }}>구강관리를 위한 팁</h3>
        <p>홍길동님을 위한 콘텐츠가 있어요!</p>
        <p style={{ fontWeight: "bold" }}>
          구강 관리를 위한 정보를 알아볼까요?
        </p>
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
          좋아요!
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
          안내사항
        </h4>
        <p style={{ marginTop: "0.5rem" }}>
          본 서비스에서 제공하는 결과는 어떠한 의학적 판단이나 진단의 의미를
          갖지 않으며, 단지 일상적인 구강 건강관리 활동을 위해 보조적으로 활용할
          것과 전문가의 진료 및 진단을 받기 위해서는 의료인 및 의료기관을
          방문하시길 바랍니다.
        </p>
      </div>
    </div>
  );
}

export default OralCheckResult;
