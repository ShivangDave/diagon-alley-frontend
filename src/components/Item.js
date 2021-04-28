import { useState } from 'react';
import { withRouter } from 'react-router';

import { Card, Image, Icon } from 'semantic-ui-react';

const Item = ({ item, history }) => {

  const { id } = item
  const { name, item_images, price } = item.attributes

  const [ imgCount, setImageCount ] = useState(0)
  const [ showBtn, setShowBtn ] = useState(false)

  const changeImage = (count) => {
    if(count === -1 && imgCount === 0){
      setImageCount(item_images.length - 1)
    }else if(count === 1 && imgCount === item_images.length - 1){
      setImageCount(0)
    }else{
      setImageCount(imgCount+count)
    }
  }

  return (
    <Card id={id} color='orange' className="item-card" raised centered
      onMouseEnter={() => setShowBtn(true)}
        onMouseLeave={() => setShowBtn(false)}
    >
      <Image
        src={item_images[imgCount].img_url}
          wrapped ui={false} alt={''}
            onClick={() => history.push(`/product/${id}`)} />
      {
        showBtn && (
          <>
            <Icon size={'big'} className={'image-btn-left'}
                link onClick={() => changeImage(1)}
                  name="caret right" />
            <Icon size={'big'} className={'image-btn-right'}
                link onClick={() => changeImage(-1)}
                  name="caret left" />
          </>
        )
      }

      <Card.Content onClick={() => history.push(`/product/${id}`)}>
        <div className={'image-counter'}>
          {
            item_images.map((img,index) => (
              <p key={index}
                className={index === imgCount ? 'bar active' : 'bar'}>
              </p>
            ))
          }
        </div>
        <Card.Header>{ name }</Card.Header>
        <Card.Meta>
          <span className='date'>${ price }</span>
        </Card.Meta>
      </Card.Content>
    </Card>
  )
}

export default withRouter(Item);
