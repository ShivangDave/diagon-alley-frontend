import { useEffect, useState } from 'react';
import {
  useParams
} from 'react-router-dom';
import { Grid, Segment, Image } from 'semantic-ui-react';

const ItemPage = () => {

  const { productId } = useParams()
  const [ item, setItem ] = useState({})
  const [ selectedImg, setSelectedImg ] = useState(0)

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/items/${productId}`)
    .then(res => res.json())
    .then(({ data }) => setItem(data.attributes))
  },[])

  return (
    <Grid stackable columns={'equal'} className={'item-container'} >
      <Grid.Row>
        <Grid.Column>
          <div>
            <div>
              { `item is ${item.name} & id is ${item.id}` }
            </div>
          </div>
        </Grid.Column>

        <Grid.Column>
          <Segment className={'item-image-container'}>
            {
              item.item_images && (
                item.item_images.map((i,index) => (
                  <Image key={i.id} src={i.img_url}
                    className={selectedImg === index ? 'item-image active' : 'item-image'}
                      onClick={() => setSelectedImg(index)}
                  />
                ))
              )
            }
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default ItemPage;
