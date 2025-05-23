import { useState } from "react";
import { FaTimes, FaSpinner } from "react-icons/fa";

const AuthModal = ({ onClose, onLogin, onRegister }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    password: "" 
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Валидация полей
      if (!formData.email || !formData.password) {
        throw new Error("Email и пароль обязательны");
      }

      if (!isLogin && !formData.name.trim()) {
        throw new Error("Имя обязательно");
      }

      if (isLogin) {
        await onLogin(formData);
      } else {
        await onRegister(formData);
      }
    } catch (err) {
      setError(err.message || "Произошла ошибка");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="mainPageAuthModalOverlay">
      <div className="mainPageAuthModal">
        <div className="mainPageAuthModalHeader">
          <h2 className="mainPageAuthModalTitle">
            {isLogin ? "Вход в аккаунт" : "Создать аккаунт"}
          </h2>
          <button 
            className="mainPageAuthModalCloseButton" 
            onClick={onClose}
            disabled={isLoading}
          >
            <FaTimes />
          </button>
        </div>

        <form className="mainPageAuthModalForm" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mainPageAuthModalInputGroup">
              <label className="mainPageAuthModalLabel">Ваше имя</label>
              <input
                className="mainPageAuthModalInput"
                type="text"
                name="name"
                placeholder="Иван Иванов"
                value={formData.name}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>
          )}

          <div className="mainPageAuthModalInputGroup">
            <label className="mainPageAuthModalLabel">Email</label>
            <input
              className="mainPageAuthModalInput"
              type="email"
              name="email"
              placeholder="example@mail.com"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>

          <div className="mainPageAuthModalInputGroup">
            <label className="mainPageAuthModalLabel">Пароль</label>
            <input
              className="mainPageAuthModalInput"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>

          {error && <div className="mainPageAuthModalError">{error}</div>}

          <button 
            type="submit" 
            className="mainPageAuthModalButton mainPageAuthModalSubmitButton"
            disabled={isLoading}
          >
            {isLoading ? (
              <FaSpinner className="spin" />
            ) : isLogin ? "Войти" : "Зарегистрироваться"}
          </button>

          <button 
            type="button"
            className="mainPageAuthModalButton mainPageAuthModalSwitchButton"
            onClick={() => setIsLogin(!isLogin)}
            disabled={isLoading}
          >
            {isLogin ? "Нет аккаунта? Зарегистрироваться" : "Уже есть аккаунт? Войти"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;