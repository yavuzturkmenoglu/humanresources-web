import { Form } from "react-bootstrap";
import { fieldConstraints } from "../../constants/fieldConstraints";

type MinMaxValidationTextProps = {
  minLength: number;
  maxLenght: number;
};

function MinMaxValidationText(props: MinMaxValidationTextProps) {
  return (
    <Form.Text className="smallerText">
      En az {props.minLength}, en fazla {props.maxLenght} karakter
    </Form.Text>
  );
}

export default MinMaxValidationText;
