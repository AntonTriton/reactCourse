'use strict';

import React, { Component, PropTypes } from 'react';

import { DragSource, DropTarget } from 'react-dnd';

import update from 'react/lib/update';

import flow from 'lodash/function/flow';

import { Link } from 'react-router';


/**
 * Implements the drag source contract.
 */
const cardSource = {
    beginDrag(props) {
        return {
            id: props.id,
            originalIndex: props.findCard(props.id).index
        };
    },

    endDrag(props, monitor) {
        const { id: droppedId, originalIndex } = monitor.getItem();
        const didDrop = monitor.didDrop();

        if (!didDrop) {
            props.moveCard(droppedId, originalIndex);
        }
    }
};

const cardTarget = {
    canDrop() {
        return false;
    },

    hover(props, monitor) {
        const { id: draggedId } = monitor.getItem();
        const { id: overId } = props;

        if (draggedId !== overId) {
            const { index: overIndex } = props.findCard(overId);
            props.moveCard(draggedId, overIndex);
        }
    }
};

class Card extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editModeClass: 'hidden',
            textModeClass: 'visible',
            value: this.props.title,
            id: this.props.id
        };
    }

    setEditMode(){
        this.setState({
        editModeClass : "visible",
        textModeClass : "hidden"
        })
    }

    setTextMode(){
        this.setState({
            editModeClass : "hidden",
            textModeClass : "visible"
        })
    }

    editing(event){
        this.setState({
            value: event.target.value
        })
    }

    render() {
        var self = this;

        const { title, isDragging, connectDragSource, connectDropTarget } = this.props;
        const opacity = isDragging ? 0 : 1;

        return connectDragSource(connectDropTarget(
            <li>
                <Link to={"/note/"+self.state.id}>
                    <i className="fa fa-file-text-o"></i>
                    <span className={self.state.textModeClass} onClick={self.setEditMode}>{self.state.value}</span>
                    <input className={self.state.editModeClass}
                           onBlur={self.setTextMode}
                           onChange={self.editing}
                           type="text" value={self.state.value}/>
                </Link>
            </li>

        ));
    }
}

function dropCollect(connect){
    return {
        connectDropTarget: connect.dropTarget()
    }
}

function dragCollect(connect,monitor){
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

Card.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    moveCard: PropTypes.func.isRequired,
    findCard: PropTypes.func.isRequired
};

module.exports = flow(
    DropTarget('card', cardTarget, dropCollect),
    DragSource('card', cardSource, dragCollect)
)(Card);
