import { useEffect, useState } from 'react';
import {
  useParams
} from 'react-router-dom';
import { Grid, Segment, Image, Header, Button, Icon } from 'semantic-ui-react';

import PreviewModal from './PreviewModal'

const ItemPage = () => {

  const { productId } = useParams()
  const [ item, setItem ] = useState({})
  const [ selectedImg, setSelectedImg ] = useState(0)
  const [ open, setOpen ] = useState(false)

  const [ isLoading, setLoading ] = useState(false)
  const [ isAdded, setAdded ] = useState(false)

  const changeImage = (count) => {
    if(count === -1 && selectedImg === 0){
      setSelectedImg(item.item_images.length - 1)
    }else if(count === 1 && selectedImg === item.item_images.length - 1){
      setSelectedImg(0)
    }else{
      setSelectedImg(selectedImg+count)
    }
  }

  const addToCart = () => {
    setLoading(true)
    setAdded(true)

    console.log(item)

    setTimeout(() => {
      setLoading(false)
      setTimeout(() => {
        setAdded(false)
      },2000)
    },3000)
  }

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/items/${productId}`)
    .then(res => res.json())
    .then(({ data }) => setItem(data.attributes))
  },[productId])

  return (
    <Grid stackable columns={'equal'} className={'item-container'}>
      <Grid.Row>
        <Grid.Column>
          <Segment className={'item-image-container'}>
            {
              item.item_images && (
                <Image key={selectedImg} src={item.item_images[selectedImg].img_url}
                  className={'item-image active'}
                    onClick={() => setOpen(true)}/>
              )
            }
            <div className="item-mini-image-container">
              {
                item.item_images && (
                  item.item_images.map((i,index) => (
                    <Image key={i.id} src={i.img_url}
                      className={'item-image'}
                        onClick={() => setSelectedImg(index)}
                    />
                  ))
                )
              }
            </div>
          </Segment>
        </Grid.Column>
        {
          open && (
            <PreviewModal open={open} setOpen={setOpen}
              image={item.item_images[selectedImg].img_url}
                name={item.name} changeImage={changeImage}
            />
          )
        }

        <Grid.Column>
          <div className={'item-details-container'}>
            <Header as='h1'>
              { item.name }
            </Header>

            <p>
              { item.description }
            </p>

            {
              item.price && (
                <Header as='h2' className="original-price-text">
                  { `Current: $${item.price.toFixed(2)}` }
                  <p>
                    { `Original: $${item.original_price}` }
                  </p>
                </Header>
              )
            }

            <Button icon labelPosition='left'
              color='black' loading={isLoading}
                onClick={() => addToCart(item)}
                  animated
                    className={'add-to-cart-btn'}
            >

              <Icon name={ isAdded ? 'checkmark' : 'cart' } />
              { isAdded ? `Added to Cart!` : `Add to Cart`}
            </Button>
          </div>
        </Grid.Column>

      </Grid.Row>
    </Grid>
  )
}

export default ItemPage;
