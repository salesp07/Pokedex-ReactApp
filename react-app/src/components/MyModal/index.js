import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import EmojiDict from '../../EmojiDict';

function MyModal({currentPoke, ...props}) {
    const poke = currentPoke? JSON.parse(currentPoke) : false;
    return (
      <>
        {poke && <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          id="modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              #{poke.id} {poke.name.english}   
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className='modalBody'>
            <img alt={poke.name.english} src={poke.img} className="modalImg"/>
            <div>
                <h4>Base</h4>
                {Object.keys(poke.base).map((key, index) => {
                    return <p key={index}>{EmojiDict[key]}{key}: {poke.base[key]}</p>
                })}
                <h4>Type</h4>
                {poke.type.map((item, index) => {
                    return <p key={index}>{item}{EmojiDict[item]}</p>
                })}
            </div>
            
          </Modal.Body>
        </Modal>}
      </>
    );
  }

export default MyModal;