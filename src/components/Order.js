import { useState, useEffect } from 'react';
import { Feed, Segment, Button } from 'semantic-ui-react';

const Order = () => {

  const [ orders, setOrders ] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/orders',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Auth-Token': localStorage.getItem('token')
      }
    }).then(res => res.json())
    .then(ordersData => {
        setOrders(ordersData)
    })

  },[])

  const deleteOrder = (order) => {
    fetch(`http://localhost:3000/api/v1/orders/${order.id}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(orderObj => {
      const updatedOrders = orders.filter(o => o.id !== orderObj.id)
      setOrders(updatedOrders)
    })
  }

  return (
    <Feed className={'order-history'}>
      {
          orders.map(order => {
            const date = new Date(Date.parse(order.created_at))

            return (
              <Segment>
                <Feed.Event>
                  {
                    order.items.length > 0 && (
                        <Feed.Content className={'order-card-content'}>
                          <Feed.Date as={'h3'}> Placed on: { date.toLocaleString() } </Feed.Date>
                          <Feed.Summary>
                            { order.items[0].name } and More..
                          </Feed.Summary>
                          <div className={'order-image-container'}>
                          {
                            order.items.map(item => (
                                <Feed.Label image={item.item_images[0].img_url} />
                            ))
                          }
                          </div>
                        </Feed.Content>
                    )
                  }
                </Feed.Event>
                <Button onClick={() => deleteOrder(order)} negative> Cancel Order </Button>
              </Segment>
            )
          })
      }
    </Feed>
  )
}

export default Order;
