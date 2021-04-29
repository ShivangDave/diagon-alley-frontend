import { useState, useEffect } from 'react';
import { Item, Segment, Grid, Image, Button } from 'semantic-ui-react';

const Cart = () => {

  const [ items, setItems ] = useState([])

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

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/carts',{
      method: 'GET',
      headers: {
        'Auth-Token': localStorage.getItem('token')
      }
    }).then(res => res.json())
    .then(items => {
      const mappedItems = items.reduce((acc,item) =>
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

      setItems(mappedItems)
    })
    .catch(err => setItems([]))
  },[])

  return (
    <Grid stackable columns={2} className={'cart-item-container'}>
      <Grid.Column width={10}>
        <Item.Group>
          {
            items.map((item,index) => (
              <>
                <Item key={index} image={item.item_images[0].img_url}
                  header={item.name}
                    extra={() => (
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
                    meta={`Quantity: ${item.quantity}`} verticalAlign='middle'
                />
              </>
            ))
          }
        </Item.Group>
      </Grid.Column>
      <Grid.Column width={6}>
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
          <Button positive fluid> Checkout </Button>
        </Segment>
      </Grid.Column>
    </Grid>
  )
}

export default Cart;
