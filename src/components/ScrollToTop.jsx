import { useEffect, useState } from "react";
import "../styles/ScrollToTop.css";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false); // 스크롤 중인지 상태 관리

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    setIsScrolling(true); // 스크롤 시작 상태 설정
    window.setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 1); // 여기서 1000은 스크롤 애니메이션 시간에 맞춰 조정 가능
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    const onScrollHandler = () => {
      setIsScrolling(true);
    };

    const onScrollEndHandler = () => {
      setIsScrolling(false);
    };

    document.addEventListener("scroll", onScrollHandler);
    document.addEventListener("scrollend", onScrollEndHandler);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      document.removeEventListener("scroll", onScrollHandler);
      document.removeEventListener("scrollend", onScrollEndHandler);
    };
  }, []);

  return (
    isVisible && (
      <div className="scroll-to-top-container">
        <button
          onClick={scrollToTop}
          disabled={isScrolling} // 스크롤 중 버튼 비활성화
          className={`scroll-to-top-button ${
            isScrolling ? "opacity-60" : "opacity-100"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-up"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
          Top
        </button>
      </div>
    )
  );
};

export default ScrollToTop;
