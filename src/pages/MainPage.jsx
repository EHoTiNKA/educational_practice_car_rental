import { useState, useEffect } from "react";
import CarCard from "../components/CarCard";
import CarCheckBox from "../components/CarCheckBox";
import CarModal from "../components/CarModal";
import "./styles/MainPage.css";

const MainPage = () => {
  const [carList, setCarList] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/cars");
        if (!response.ok) {
          throw new Error("Ошибка при загрузке машин");
        }
        const data = await response.json();
        setCarList(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleCardClick = (carData) => {
    setSelectedCar(carData);
  };

  const handleCloseModal = () => {
    setSelectedCar(null);
  };

  return (
    <div className="mainPageContainer">
      <div className="mainPageContent">
        <div className="mainPageFiltersNavBar">
          <div className="filterNavBarCarType">
            <h2 className="filterNavBarCarTypeH2">Выберите тип авто</h2>
            <CarCheckBox text={"Седан"} />
            <CarCheckBox text={"Купе"} />
            <CarCheckBox text={"Универсал"} />
            <CarCheckBox text={"Хетчбек"} />
            <CarCheckBox text={"Внедорожник"} />
            <CarCheckBox text={"Пикап"} />
            <CarCheckBox text={"Минивэн"} />
            <CarCheckBox text={"Лимузин"} />
          </div>
        </div>

        <div className="mainPageCarList">
          <h1 className="mainPageCarListH1">Список доступных автомобилей</h1>

          {loading && <p>Загрузка автомобилей...</p>}
          {error && <p style={{ color: "red" }}>Ошибка: {error}</p>}

          <div className="carCardsGrid">
            {carList.map((car) => (
              <CarCard key={car.id} {...car} onClick={() => handleCardClick(car)} />
            ))}
          </div>
        </div>
      </div>

      {selectedCar && <CarModal car={selectedCar} onClose={handleCloseModal} />}
    </div>
  );
};

export default MainPage;
