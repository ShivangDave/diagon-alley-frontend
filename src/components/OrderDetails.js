import { useState, useEffect } from 'react';

const OrderDetails = ({ match }) => {

  const [ item, setItem ] = useState({})

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/orders/${match.params.id}`)
    .then(res => res.json())
    .then(console.log)
  },[])

  return (
    <>
      Order details
    </>
  )
}

export default OrderDetails;
