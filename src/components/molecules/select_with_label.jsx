import Select from "components/atoms/select";
import styled from "styled-components";

const SelectWithLabel = ({ className, name, label, value, options, values, onChange }) => {
  return (
    <div className={`${className} SelectWithLabel`}>
      <label>{label}</label>
      <Select
        name={name}
        onChange={onChange}
        value={value}
        options={options}
        values={values}
      />
    </div>
  );
}

const StyledSelectWithLabel = styled(SelectWithLabel)`
display: flex;
justify-content: center;
align-items: center;
gap: 0.4rem;

label {
  font-size: 1rem;
}
`;

export default StyledSelectWithLabel;