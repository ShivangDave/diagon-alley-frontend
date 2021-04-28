import { Modal, Image, Icon } from 'semantic-ui-react';

const PreviewModal = ({ open, setOpen, name, image, changeImage }) => {
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      dimmer={'blurring'}
      closeIcon
      id={'preview-modal-container'}
    >
      <Modal.Header> {name} </Modal.Header>
      <Modal.Content className={'preview-modal-image'} image>
        <Image src={image} wrapped />
      </Modal.Content>
      <>
        <Icon size={'big'} className={'image-btn-left'}
            link onClick={() => changeImage(1)}
              name="caret right" />
        <Icon size={'big'} className={'image-btn-right'}
            link onClick={() => changeImage(-1)}
              name="caret left" />
      </>
    </Modal>
  )
}

export default PreviewModal;
