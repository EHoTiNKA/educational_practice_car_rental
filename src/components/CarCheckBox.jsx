import "./styles/CarCheckBox.css";

const CarCheckBox = ({ text, checked, onChange }) => {
  return (
    <div className="CarCheckBoxContent">
      <label className="custom-checkbox">
        <input 
          type="checkbox" 
          checked={checked}
          onChange={onChange}
        />
        <span className="checkmark"></span>
        <p className="carCheckBoxText">{text}</p>
      </label>
    </div>
  );
};

export default CarCheckBox;