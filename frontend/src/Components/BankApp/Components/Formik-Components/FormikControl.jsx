import Input_Component from "./Individual_Components/Input_Component";
import Radio_Component from "./Individual_Components/Radio_Component";
import Select_Component from "./Individual_Components/Select_Component";
import Textarea_Component from "./Individual_Components/Textarea_Component";
import Checkbox_Component from "./Individual_Components/Checkbox_Component"
import Datepicker_Component from "./Individual_Components/Datepicker_Component";
import Datelist_Component from "./Individual_Components/Datelist_Component";


export default function FormikControl(props) {

  const { control, ...rest } = props; //extract control from props
  
  switch(control){
    //return appropriate component with all but control as props
    case 'input': 
      return <Input_Component {...rest } /> 
    case 'textarea':
      return <Textarea_Component {...rest} />
    case 'select':
      return <Select_Component {...rest} />
    case 'radio':
      return <Radio_Component {...rest} />
    case 'checkbox':
      return <Checkbox_Component {...rest} />
    case 'date':
      return <Datepicker_Component {...rest} />
    case 'datelist':
      return <Datelist_Component {...rest} />
    default: return null

  }
}
