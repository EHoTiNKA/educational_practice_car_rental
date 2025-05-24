import { useState, useEffect } from "react";
import CarCard from "../components/CarCard";
import CarCheckBox from "../components/CarCheckBox";
import CarModal from "../components/CarModal";
import AuthModal from "../components/AuthModal";
import CartModal from "../components/CartModal";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import "./styles/MainPage.css";

const MainPage = () => {
  const [carList, setCarList] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState(new Set());
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/cars");
        if (!response.ok) throw new Error("Ошибка при загрузке машин");
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

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedCart = localStorage.getItem("cart");
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, user]);

  const handleTypeToggle = (type) => {
    setSelectedTypes(prev => {
      const newTypes = new Set(prev);
      newTypes.has(type) ? newTypes.delete(type) : newTypes.add(type);
      return newTypes;
    });
  };

  const addToCart = (car) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    setCart(prev => {
      const existing = prev.find(item => item.id === car.id);
      return existing
        ? prev.map(item =>
          item.id === car.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        : [...prev, { ...car, quantity: 1 }];
    });
  };

  const removeFromCart = (carId) => {
    setCart(prev => prev.filter(item => item.id !== carId));
  };

  const updateQuantity = (carId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prev =>
      prev.map(item =>
        item.id === carId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handlePrintContract = () => {
    const printContent = `
      <h1>Договор аренды</h1>
      <p>Клиент: ${user?.name}</p>
      <p>Дата: ${new Date().toLocaleDateString()}</p>
      <h3>Автомобили:</h3>
      <ul>
        ${cart.map(car => `
          <li>${car.name} - ${car.quantity} суток - ${car.price * car.quantity} руб.</li>
        `).join('')}
      </ul>
      <h3>Итого: ${cart.reduce((sum, car) => sum + car.price * car.quantity, 0)} руб.</h3>
    `;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  const filteredCars = carList.filter(car =>
    selectedTypes.size === 0 || selectedTypes.has(car.type)
  );

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
      } else alert(data.error || "Ошибка входа");
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
    setCart([]);
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
                  <div className="cartIconContainer" onClick={() => setShowCartModal(true)}>
                    <FaShoppingCart size={24} />
                    {cart.length > 0 && <span className="cartBadge">{cart.length}</span>}
                  </div>
                  <span className="mainPageUserName">{user.name}</span>
                  <button className="mainPageLogoutButton" onClick={handleLogout}>
                    Выйти
                  </button>
                </div>
              ) : (
                <div className="mainPageProfileIcon" onClick={() => setShowAuthModal(true)}>
                  <FaUserCircle size={32} />
                </div>
              )}
            </div>
          </div>

          {loading && <p className="mainPageLoading">Загрузка...</p>}
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
                onClick={() => setSelectedCar(car)}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedCar && (
        <CarModal
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
          onAddToCart={addToCart}
        />
      )}

      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
          onRegister={handleRegister}
        />
      )}

      {showCartModal && (
        <CartModal
          cart={cart}
          onClose={() => setShowCartModal(false)}
          onRemove={removeFromCart}
          onUpdateQuantity={updateQuantity}
          onPrint={handlePrintContract}
        />
      )}
    </div>
  );
};

export default MainPage;