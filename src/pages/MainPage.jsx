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
  const [selectedTypes, setSelectedTypes] = useState(new Set());

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/cars");
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

  const handleTypeToggle = (type) => {
    setSelectedTypes(prev => {
      const newTypes = new Set(prev);
      if (newTypes.has(type)) {
        newTypes.delete(type);
      } else {
        newTypes.add(type);
      }
      return newTypes;
    });
  };

  const filteredCars = carList.filter(car => 
    selectedTypes.size === 0 || selectedTypes.has(car.type)
  );

  return (
    <div className="mainPageContainer">
      <div className="mainPageContent">
        <div className="mainPageFiltersNavBar">
          <div className="filterNavBarCarType">
            <h2 className="filterNavBarCarTypeH2">Выберите тип авто</h2>
            {['Пикап', 'Седан', 'Купе', 'Универсал', 'Хетчбек', 'Внедорожник', 'Минивэн', 'Лимузин'].map(type => (
              <CarCheckBox 
                key={type}
                text={type}
                checked={selectedTypes.has(type)}
                onChange={() => handleTypeToggle(type)}
              />
            ))}
          </div>
        </div>

        <div className="mainPageCarList">
          <h1 className="mainPageCarListH1">Список доступных автомобилей</h1>

          {loading && <p>Загрузка автомобилей...</p>}
          {error && <p style={{ color: "red" }}>Ошибка: {error}</p>}

          <div className="carCardsGrid">
            {filteredCars.map((car) => (
              <CarCard 
                key={car.id}
                name={car.name}
                desc={car.desc}
                img={car.img}
                type={car.type}
                price={`${car.price}`}
                onClick={() => handleCardClick(car)}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedCar && (
        <CarModal 
          car={selectedCar} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default MainPage;