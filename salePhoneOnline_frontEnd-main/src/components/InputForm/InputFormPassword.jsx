import { WapperInputPassword } from './style'

const InputFormPassword = (props) => {
    const {placeholder = 'Nhập text', ...rests} = props
    const handleOnchageInput = (e) => {
      props.onChange(e.target.value)
    }
  return (
        <WapperInputPassword placeholder={placeholder} value = {props.value} {...rests} onChange={handleOnchageInput}>
        </WapperInputPassword>

  )
  }

  export default InputFormPassword