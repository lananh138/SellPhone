import { WapperInputStyle } from './style'

const InputForm = (props) => {
    const {placeholder = 'Nhập text', ...rests} = props
    const handleOnchageInput = (e) => {
      props.onChange(e.target.value)
    }
  return (
        <WapperInputStyle placeholder={placeholder} value = {props.value} {...rests} onChange={handleOnchageInput}>
        </WapperInputStyle>
  )
}
export default InputForm