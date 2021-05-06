import { useState, useEffect } from 'react';
import { Feed, Segment } from 'semantic-ui-react';

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
        console.log(ordersData)
        setOrders(ordersData)
    })

  },[])

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
              </Segment>
            )
          })
      }


    </Feed>
  )
}

export default Order;
