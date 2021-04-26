import { useState, useEffect } from 'react';
import { Card } from 'semantic-ui-react';
import Item from '../components/Item';
import DiscoveryBoard from '../containers/DiscoveryBoard';

const API = 'http://localhost:3000/api/v1/items'

const MainContainer = () => {

  const [ items, setItems ] = useState([])

  useEffect(() => {
    fetch(API).then(res => res.json())
    .then(({ data }) => setItems(data))
  },[])

  return(
    <>
      <DiscoveryBoard />

      <Card.Group className="cards-group" centered itemsPerRow={4} stackable>
        {
          items && (
            items.map(item => <Item key={item.id} item={item} />)
          )
        }
      </Card.Group>
    </>
  )
}

export default MainContainer;
