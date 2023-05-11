import { useMemo } from "react";
import styled from "styled-components";

const Select = ({ className, name, onChange, value, options, values }) => {

  const optionTags = useMemo(() => {
    const results = [];

    for (let i = 0; i < options.length; i++) {
      results.push(
        <option key={options[i]} value={(values && values[i]) || options[i]}>
          {options[i]}
        </option>
      );
    }

    return(results);
  }, [options, values])

  return (
    <select className={`${className} Select`} name={name} onChange={onChange} value={value}>
      {optionTags}
    </select>
  );
}

const StyledSelect = styled(Select)`
padding: 0.2rem 0.4rem;
font-weight: bold;
`;

export default StyledSelect;