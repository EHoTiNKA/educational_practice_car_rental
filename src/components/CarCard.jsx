import "./styles/CarCard.css";

const CarCard = ({ name, desc, img, type, price, onClick }) => {
  return (
    <div className="carCardContent" onClick={onClick}>
      <img src={img} alt="carImg" className="carCardImg" />
      <p className="carCardName">{name}</p>
      <p className="carCardType">{type}</p>
      <p className="carCardDesc">{desc}</p>
      <div className="carCardPriceBlock">
        <p className="carCardPrice">{price}</p>
        <p>руб.</p>
      </div>
    </div>
  );
};

export default CarCard;
