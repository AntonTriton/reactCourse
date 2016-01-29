
import React, { Component } from 'react';

import {Modal, Button} from 'react-bootstrap';

import {modalStyle,backdropStyle,dialogStyle} from '../initialData/constants.js';

class ConfirmModal extends Component {

    constructor(props){
        super(props)
    }

    render(){

        var self = this;

        return (
            <Modal
                aria-labelledby='modal-label'
                style={modalStyle}
                backdropStyle={backdropStyle}
                show={self.props.is_show}
                onHide={self.props.onClose}
                >

                <div style={dialogStyle()}>

                    <h4 id='modal-label'>{self.props.message}</h4>

                    <div>
                        <Button bsStyle="primary" onClick={self.props.onSuccess}>Confirm</Button>
                        <Button onClick={self.props.onClose}>Cancel</Button>
                    </div>

                </div>
            </Modal>
        )
    }

}

export default ConfirmModal;
