import "./styles/CarModal.css";

const CarModal = ({ car, onClose, onAddToCart }) => {
  const handleBackgroundClick = (e) => {
    if (e.target.className === "modalOverlay") onClose();
  };

  return (
    <div className="modalOverlay" onClick={handleBackgroundClick}>
      <div className="modalContent">
        <button className="modalCloseBtn" onClick={onClose}>×</button>
        <img src={car.img} alt={car.name} className="modalCarImg" />
        <h2>{car.name}</h2>
        <div className="modalSpecs">
          <p><strong>Тип:</strong> {car.type}</p>
          <p><strong>Цена:</strong> {car.price} руб./сутки</p>
          <p><strong>Категория прав:</strong> {car.required_drive_license}</p>
          <p><strong>Описание:</strong> {car.desc}</p>
          <button className="addToCartButton" onClick={() => onAddToCart(car)}>
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarModal;