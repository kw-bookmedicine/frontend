import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Header from "../../components/Header";
import WidePrescriptionCard from "../../components/Prescription/WidePrescriptionCard";

import "../../styles/Profile/MyPrescription.css";

const fetchMyPrescriptions = async () => {
  const response = await api.get(
    `https://api.bookpharmacy.store/api/prescription/my?page=0&size=10`,
    { withCredentials: true }
  );
  return response.data;
};

const MyPrescription = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchMyPrescriptionsData = async () => {
      try {
        const response = await fetchMyPrescriptions();
        // const response = await api.get(
        //   `https://api.bookpharmacy.store/api/prescription/my?page=0&size=10`,
        //   { withCredentials: true }
        // );
        console.log(response);
        setData(response);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyPrescriptionsData();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <section className="myPrescription-background">
        <div className="myPrescription-container">
          <h1 className="myPrescription-title">나의 처방전 목록</h1>
          <ul>
            {data.map((prescription) => (
              <li className="myPrescription-card" key={prescription.id}>
                <WidePrescriptionCard props={prescription} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default MyPrescription;
