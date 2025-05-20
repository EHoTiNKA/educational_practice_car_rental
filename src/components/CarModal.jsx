import "./styles/CarModal.css";

const CarModal = ({ car, onClose }) => {
  const handleBackgroundClick = (e) => {
    if (e.target.className === "modalOverlay") {
      onClose();
    }
  };

  return (
    <div className="modalOverlay" onClick={handleBackgroundClick}>
      <div className="modalContent">
        <button className="modalCloseBtn" onClick={onClose}>
          ×
        </button>
        <img src={car.img} alt={car.name} className="modalCarImg" />
        <h2>{car.name}</h2>
        <p>
          <strong>Тип:</strong> {car.type}
        </p>
        <p>
          <strong>Цена:</strong> {car.price} руб.
        </p>
        <p>
          <strong>Описание:</strong> {car.desc}
        </p>
      </div>
    </div>
  );
};

export default CarModal;
