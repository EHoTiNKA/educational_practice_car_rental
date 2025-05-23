import { useState, useEffect } from "react";
import CarCard from "../components/CarCard";
import CarCheckBox from "../components/CarCheckBox";
import CarModal from "../components/CarModal";
import AuthModal from "../components/AuthModal";
import { FaUserCircle } from "react-icons/fa";
import "./styles/MainPage.css";

const MainPage = () => {
  const [carList, setCarList] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState(new Set());
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState(null);

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

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
        setShowAuthModal(false);
      } else {
        alert(data.error || "Ошибка входа");
      }
    } catch (error) {
      alert("Ошибка соединения");
    }
  };

  const handleRegister = async (credentials) => {
    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();
      if (response.ok) {
        alert("Регистрация успешна! Теперь войдите");
        setShowAuthModal(false);
      } else {
        alert(data.error || "Ошибка регистрации");
      }
    } catch (error) {
      alert("Ошибка соединения");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="mainPageContainer">
      <div className="mainPageContent">
        <div className="mainPageFiltersNavBar">
          <div className="mainPageFilterCarType">
            <h2 className="mainPageFilterTitle">Выберите тип авто</h2>
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
          <div className="mainPageHeader">
            <h1 className="mainPageTitle">Список доступных автомобилей</h1>
            <div className="mainPageProfileControls">
              {user ? (
                <div className="mainPageProfileInfo">
                  <span className="mainPageUserName">{user.name}</span>
                  <button 
                    className="mainPageLogoutButton"
                    onClick={handleLogout}
                  >
                    Выйти
                  </button>
                </div>
              ) : (
                <div 
                  className="mainPageProfileIcon" 
                  onClick={() => setShowAuthModal(true)}
                >
                  <FaUserCircle size={32} />
                </div>
              )}
            </div>
          </div>

          {loading && <p className="mainPageLoading">Загрузка автомобилей...</p>}
          {error && <p className="mainPageError">Ошибка: {error}</p>}

          <div className="mainPageCarGrid">
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

      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
          onRegister={handleRegister}
        />
      )}
    </div>
  );
};

export default MainPage;