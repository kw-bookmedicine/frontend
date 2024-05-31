import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import OneLinePrscrCard from "./../../components/Prescription/OneLinePrscrCard";
import api from "../../services/api";
import "../../styles/Profile/MyOneLinePrescription.css";

const MyOneLinePrescription = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchMyOneLinePrescriptions = async () => {
      try {
        const response = await api.get(
          `/api/oneline-prescriptions/my?page=0&size=10`,
          { withCredentials: true }
        );
        console.log(response.data);
        setData(response.data.content);
      } catch (error) {
        console.log("나의 한줄처방 요청 실패", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyOneLinePrescriptions();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <section>
        <div className="myOneLinePrescription-container">
          <h1 className="myOneLinePrescription-title">나의 처방전 목록</h1>
          <ul>
            {data.map((item) => (
              <li className="myOneLinePrescription-card" key={item.id}>
                <OneLinePrscrCard item={item} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default MyOneLinePrescription;
