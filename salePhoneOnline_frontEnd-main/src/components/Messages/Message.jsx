import { message } from "antd";

const success = (mes = 'Success') => {
    message.success(mes);
  };
  const error = (mes = 'ERROR') => {
    message.error(mes);
  };
  const warning = (mes = ' WARNING') => {
    message.warning(mes);
  };

  export {success,error,warning}