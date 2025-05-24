import "./styles/CartModal.css";

const CartModal = ({ cart, onClose, onRemove, onUpdateQuantity, onPrint }) => {
  const totalAmount = cart.reduce((sum, car) => sum + car.price * car.quantity, 0);

  return (
    <div className="modalOverlay" onClick={(e) => e.target.className === 'modalOverlay' && onClose()}>
      <div className="modalContent cartModal">
        <button className="modalCloseBtn" onClick={onClose}>×</button>
        <h2>Корзина аренды</h2>
        
        {cart.length === 0 ? (
          <p>Корзина пуста</p>
        ) : (
          <>
            <div className="cartItems">
              {cart.map(car => (
                <div key={car.id} className="cartItem">
                  <div className="cartItemInfo">
                    <h4>{car.name}</h4>
                    <p>{car.price} руб./сутки</p>
                  </div>
                  <div className="cartItemControls">
                    <input
                      type="number"
                      min="1"
                      value={car.quantity}
                      onChange={(e) => onUpdateQuantity(car.id, parseInt(e.target.value))}
                    />
                    <button 
                      className="removeButton"
                      onClick={() => onRemove(car.id)}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cartTotal">
              <h3>Итого: {totalAmount} руб.</h3>
              <button className="printButton" onClick={onPrint}>
                Печать договора
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;