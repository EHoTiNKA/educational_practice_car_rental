import "./styles/CarCheckBox.css";

const CarCheckBox = ({ text }) => {
  return (
    <div className="CarCheckBoxContent">
      <label class="custom-checkbox">
        <input name="dummy" type="checkbox" />
        <span class="checkmark"></span>
        <p className="carCheckBoxText">{text}</p>
      </label>
    </div>
  );
};

export default CarCheckBox;
