import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderItems: [],
    orderItemSelected: [],
    shippingAddress: {
    },
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    discountCode: 0,
    discountPercentage: 0,
    totalPrice: 0,
    user : '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    delivereAt: '',
}

export const orderSlide = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrderProduct: (state, action) => {
        const {orderItem} = action.payload
        const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem.product)
        if(itemOrder){
            itemOrder.amount += orderItem?.amount
        }else{
            state.orderItems.push(orderItem)
        }
      },
      increaseAmount: (state, action) => {
        const {idProduct} = action.payload
        const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
        const itemOrderSelected = state?.orderItemSelected?.find((item) => item?.product === idProduct)
        itemOrder.amount += 1
        if(itemOrderSelected){
          itemOrderSelected.amount +=1
        }
      },
      decreaseAmount: (state, action) => {
        const {idProduct} = action.payload
        const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
        const itemOrderSelected = state?.orderItemSelected?.find((item) => item?.product === idProduct)
        itemOrder.amount -= 1
        if(itemOrderSelected){
          itemOrderSelected.amount -=1
        }

      },
      removeOrderProduct: (state, action) => {
        const {idProduct} = action.payload
        const itemOrder = state?.orderItems?.filter((item) => item?.product !== idProduct)
        const itemOrderSelected = state?.orderItemSelected?.filter((item) => item?.product !== idProduct)

        state.orderItems = itemOrder
        state.orderItemSelected = itemOrderSelected
      },
      removeAllOrderProduct: (state, action) => {
        const {listChecked} = action.payload
        const itemOrders = state?.orderItems?.filter((item) => !listChecked.includes( item?.product))
        const itemOrderSelected = state?.orderItemSelected?.filter((item) => !listChecked.includes( item?.product))

        state.orderItems = itemOrders
        state.orderItemSelected = itemOrderSelected

      },
      selectedOrder:(state, action) => {
        const {listChecked} = action.payload
        const orderSelected = []
        state.orderItems.forEach((order) => {
          if(listChecked.includes(order.product)){
            orderSelected.push(order)
          }
        })
        state.orderItemSelected = orderSelected
      },
      setDiscountPercentage: (state, action) => {
        state.discountPercentage = action.payload;
    },
    setDiscount: (state, action) => {
      state.discountCode = action.payload; // Cập nhật discount
    },
    resetDiscount: (state) => {
      state.discountCode = ""; // Hoặc giá trị mặc định bạn muốn
      state.discountPercentage = 0; // Hoặc giá trị mặc định bạn muốn
    },
    },
})

export const { addOrderProduct,increaseAmount,decreaseAmount,removeOrderProduct,removeAllOrderProduct,selectedOrder,setDiscountPercentage,setDiscount,resetDiscount } = orderSlide.actions

export default orderSlide.reducer