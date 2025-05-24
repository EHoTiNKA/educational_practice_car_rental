import "./styles/CarCheckBox.css";

const CarCheckBox = ({ text, checked, onChange }) => {
  return (
    <div className="CarCheckBoxContent" data-testid={`checkbox-${text}`}>
      <label className="custom-checkbox" data-testid="checkbox-label">
        <input 
          type="checkbox" 
          checked={checked}
          onChange={onChange}
          data-testid={`checkbox-input-${text}`}
        />
        <span className="checkmark"></span>
        <p className="carCheckBoxText">{text}</p>
      </label>
    </div>
  );
};

export default CarCheckBox;