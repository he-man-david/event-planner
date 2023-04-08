const LoadingIcon = () => {
  return (
    <div className="m-auto flex justify-center align-middle max-w-7xl px-4 sm:px-6 lg:px-8 h-[30rem] lg:h-[50rem]">
      <div className="m-auto max-w-2xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ margin: "auto" }}
          width="180px"
          height="180px"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
        >
          <path
            fill="none"
            stroke="#9333ea"
            strokeWidth="4"
            strokeDasharray="42.76482137044271 42.76482137044271"
            d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z"
            strokeLinecap="round"
            style={{
              transform: "scale(0.8300000000000001)",
              transformOrigin: "50px 50px",
            }}
          >
            <animate
              attributeName="stroke-dashoffset"
              repeatCount="indefinite"
              dur="2.127659574468085s"
              keyTimes="0;1"
              values="0;256.58892822265625"
            ></animate>
          </path>
        </svg>
      </div>
    </div>
  );
};

export default LoadingIcon;
