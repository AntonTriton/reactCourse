'use strict';

import React, { Component, PropTypes } from 'react';

import ReactDOM from 'react-dom';

import { DragSource, DropTarget } from 'react-dnd';

import update from 'react/lib/update';

import flow from 'lodash/function/flow';

import { Link } from 'react-router';

import forEach from 'lodash/collection/forEach.js';

/**
 * Implements the drag source contract.
 */
const noteSource = {
    beginDrag(props) {
        return {
            id: props.id,
            originalIndex: props.findNote(props.id).index
        };
    },

    endDrag(props, monitor) {
        const { id: droppedId, originalIndex } = monitor.getItem();
        const didDrop = monitor.didDrop();

        var counter = 0;
        forEach(props.notes,function(item){
            item.position = counter;
            counter++;
        });

        props.saveNotePosition(props.notes);

        if (!didDrop) {
            props.moveNote(droppedId, originalIndex);
        }
    }
};

const noteTarget = {
    canDrop() {
        return false;
    },

    hover(props, monitor) {
        const { id: draggedId } = monitor.getItem();
        const { id: overId } = props;

        if (draggedId !== overId) {
            const { index: overIndex } = props.findNote(overId);
            props.moveNote(draggedId, overIndex);
        }
    }
};

class Note extends Component {

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

        this.props.updateNoteTitle(this.props.id, this.state.value);

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

    componentDidUpdate(){
        ReactDOM.findDOMNode(this.refs.noteInput).focus();
    }

    render() {
        var self = this;

        const { title, isDragging, connectDragSource, connectDropTarget, id } = this.props;

        return connectDragSource(connectDropTarget(
            <li>
                <Link to={"/note/"+id}>
                    <i className="fa fa-file-text-o"></i>
                </Link>

                <span className="note-title">
                    <span className={self.state.textModeClass+" note-title"} onClick={self.setEditMode.bind(this)}>{self.state.value}</span>

                    <input className={self.state.editModeClass}
                           onBlur={self.setTextMode.bind(this)}
                           onChange={self.editing.bind(this)}
                           ref="noteInput"
                           type="text" value={self.state.value}/>
                </span>
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

Note.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    moveNote: PropTypes.func.isRequired,
    findNote: PropTypes.func.isRequired
};

export default flow(
    DropTarget('note', noteTarget, dropCollect),
    DragSource('note', noteSource, dragCollect)
)(Note);
