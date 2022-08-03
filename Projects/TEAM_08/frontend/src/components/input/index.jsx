import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

export const StyledInput = styled(TextField)`
  & label.Mui-focused,
  &:hover label.Mui-focused {
    color: #43bd6d;
  }
  & .MuiOutlinedInput-root,
  &:hover .MuiOutlinedInput-root {
    &.Mui-focused fieldset,
    &:hover .Mui-focused fieldset {
      border-color: #43bd6d;
    }
  }
`;
export const Input = (props) => {
  return <StyledInput {...props} />;
};
