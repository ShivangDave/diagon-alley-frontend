import { useState, useEffect } from 'react';
import { Item, Segment, Grid, Image, Button, Modal, Header } from 'semantic-ui-react';

const Cart = () => {

  const [ items, setItems ] = useState([])
  const [ addresses, setAddresses ] = useState({})

  const removeFromCart = (item) => {
    fetch(`http://localhost:3000/api/v1/carts/${item.id}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Auth-Token': localStorage.getItem('token')
      }
    }).then(res => res.json())
    .then(_ => {
      const filtered = items.filter(i => item.id !== i.id)
      setItems(filtered)
    })
  }

  const handleItemQuantity = (item, what) => {
    fetch(`http://localhost:3000/api/v1/carts/${item.id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Auth-Token': localStorage.getItem('token')
      },
      body: JSON.stringify({ todo: what })
    }).then(res => res.json())
    .then(items => setItems(reduceForCart(items)))
  }

  const placeOrder = () => {
    fetch(`http://localhost:3000/api/v1/orders`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Auth-Token': localStorage.getItem('token')
      }
    }).then(res => res.json())
    .then(resp => {
      if(resp.msg == "Order fulfilled."){
        setItems([])
      }else{
        alert('Order failed..')
      }
    })
  }

  const reduceForCart = (items) => {
    return items.reduce((acc,item) =>
    {
      if(acc.filter(x => x.id === item.id).length > 0)
      {
        return acc.map(i => {
          if(i.id === item.id){
            return {
              ...item, quantity: i.quantity + 1
            }
          }
          return i
        })
      }
      else{
        return [ ...acc, { ...item, quantity: 1 } ]
      }
    },[])
  }

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/carts',{
      method: 'GET',
      headers: {
        'Auth-Token': localStorage.getItem('token')
      }
    }).then(res => res.json())
    .then(data => {
      setItems(reduceForCart(data.items))
      setAddresses(data.addresses[0])
    })
    .catch(err => setItems([]))
  },[])

  return (
    <Grid stackable columns={2} className={'cart-item-container'}>
      <Grid.Column key={0} width={10}>
        <Item.Group>
          {
            items.length < 1 && (
              <h1> No Items in Cart! </h1>
            )
          }
          {
            items.map((item,index) => (
              <>
                <Item image={item.item_images[0].img_url}
                  header={item.name}
                    extra={(
                      <>
                        {`$${item.price}`}
                        <br />
                        <br />
                        <br />
                        <p>
                          {`Subtotal: $${(item.price * item.quantity).toFixed(2)}`}
                        </p>
                        <p>
                          <Button fluid negative onClick={() => removeFromCart(item)}>
                            Remove
                          </Button>
                        </p>
                      </>
                    )}
                    meta={(
                        <p>
                          Quantity: {`${item.quantity}`}
                          <Button icon='plus' size={'mini'} onClick={() => handleItemQuantity(item, 'add')} />
                          <Button icon='minus' size={'mini'} onClick={() => handleItemQuantity(item, 'remove')} />
                        </p>
                      )
                    }
                />
              </>
            ))
          }
        </Item.Group>
      </Grid.Column>

      <Grid.Column width={6}>
        <Segment>
          <p>
            Shipping Address <br/>
            <a onClick={() => alert("")}> Edit </a>
          </p>
          <p>
            { addresses.shipping && (
              <p>
                {addresses.shipping.street_address} <br />
                {addresses.shipping.apartment_no} <br />
                {addresses.shipping.city}, {addresses.shipping.state} {addresses.shipping.zip_code}
              </p>
            )}
          </p>
          <hr />
          <p>
            Billing Address <br/>
            <a onClick={() => alert("")}> Edit </a>
          </p>
          <p>
            { addresses.billing && (
              <p>
                {addresses.billing.street_address} <br />
                {addresses.billing.apartment_no} <br />
                {addresses.billing.city}, {addresses.billing.state} {addresses.billing.zip_code}
              </p>
            )}
          </p>
        </Segment>

        <Segment>
          <p>
            Subtotal: ${items.reduce((acc,item) => {
              return acc + (item.price * item.quantity)
            },0).toFixed(2)}
          </p>
          <p>
            Shipping: ---
          </p>
          <hr />
          <p>
            Total: ${items.reduce((acc,item) => {
              return acc + (item.price * item.quantity)
            },0).toFixed(2)}
          </p>
          <Button positive fluid onClick={() => (
            items.length > 0 ? placeOrder() : alert('No items in the cart.')
          )}> Checkout </Button>
        </Segment>
      </Grid.Column>

    </Grid>
  )
}

export default Cart;
