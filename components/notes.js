'use strict';

var Autocomplete = require('../vendor/Autocomplete.js');

import React, { Component, PropTypes } from 'react';

import { getStates, matchStateToTerm, sortStates, styles } from '../vendor/utils';

import { DragSource, DropTarget } from 'react-dnd';

import update from 'react/lib/update';

import { DragDropContext } from 'react-dnd';

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

DropTarget('Card', cardTarget, connect => ({
    connectDropTarget: connect.dropTarget()
}));
DragSource('Card', cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}));

class Card extends Component {

    static get propTypes() {
        return {
            connectDragSource: PropTypes.func.isRequired,
            connectDropTarget: PropTypes.func.isRequired,
            isDragging: PropTypes.bool.isRequired,
            id: PropTypes.any.isRequired,
            text: PropTypes.string.isRequired,
            moveCard: PropTypes.func.isRequired,
            findCard: PropTypes.func.isRequired
        }
    }

    constructor(props) {
        super(props);

        /*this.props = {
            connectDragSource: PropTypes.func.isRequired,
            connectDropTarget: PropTypes.func.isRequired,
            isDragging: PropTypes.bool.isRequired,
            id: PropTypes.any.isRequired,
            text: PropTypes.string.isRequired,
            moveCard: PropTypes.func.isRequired,
            findCard: PropTypes.func.isRequired
        };*/

        this.state = {
            editModeClass: 'hidden',
            textModeClass: 'visible',
            value: this.props.title
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


        const { text, isDragging, connectDragSource, connectDropTarget } = this.props;
        const opacity = isDragging ? 0 : 1;
        console.log('connectDropTarget',connectDropTarget,this.props);

        return connectDragSource(connectDropTarget(
            <li>
                <i className="fa fa-file-text-o"></i>
                <span className={self.state.textModeClass} onClick={self.setEditMode}>{this.state.value}</span>
                <input className={self.state.editModeClass}
                       onBlur={self.setTextMode}
                       onChange={self.editing}
                       type="text" value={this.state.value}/>
            </li>

        ));
    }
}

var SearchNotes = React.createClass({

    render: function() {

        return (
            <Autocomplete
                initialValue=""
                items={notesData}
                getItemValue={(item) => item.title}
                shouldItemRender={matchStateToTerm}
                sortItems={sortStates}
                renderItem={(item, isHighlighted) => (
                <div
                  style={isHighlighted ? styles.highlightedItem : styles.item}
                  key={item.key}
                >{item.title}</div>
              )}
                />

        );

        /*
        * <div className="notes_search">
         <input type="text" placeholder="search"/>
         <i className="icon fa fa-search"></i>
         <a href="#" className="advanced-link">Advanced</a>
         </div>
         */
    }

});

var NoteItem = React.createClass({

    getInitialState: function(){
        return {
            editModeClass: 'hidden',
            textModeClass: 'visible',
            value: this.props.title
        }
    },

    setEditMode: function(){
        this.setState({
            editModeClass : "visible",
            textModeClass : "hidden"
        })
    },

    setTextMode: function(){
        this.setState({
            editModeClass : "hidden",
            textModeClass : "visible"
        })
    },

    editing: function(event){
        this.setState({
            value: event.target.value
        })
    },

    render: function() {

        var self = this;

        return (
            <li>
                <i className="fa fa-file-text-o"></i>
                <span className={self.state.textModeClass} onClick={self.setEditMode}>{this.state.value}</span>
                <input className={self.state.editModeClass}
                       onBlur={self.setTextMode}
                       onChange={self.editing}
                       type="text" value={this.state.value}/>
            </li>
        );
    }

});

class Notes extends Component {

    constructor(props){
        super(props);

        this.moveCard = this.moveCard.bind(this);
        this.findCard = this.findCard.bind(this);

        this.state = {
            cards: notesData
        };
    }

    moveCard(id, atIndex) {
        const { card, index } = this.findCard(id);
        this.setState(update(this.state, {
            cards: {
                $splice: [
                    [index, 1],
                    [atIndex, 0, card]
                ]
            }
        }));
    }

    findCard(id) {
        const { cards } = this.state;
        const card = cards.filter(c => c.id === id)[0];

        return {
            card,
            index: cards.indexOf(card)
        };
    }

    render() {

        console.log('notes',this.props);

        const { connectDropTarget } = this.props;
        const { cards } = this.state;

        var self = this;

        //var notes = this.state.notes;

        var items = cards.map(function(item) {
            return <Card
                key={item.key}
                title={item.title}
                moveCard={self.moveCard}
                findCard={self.findCard}
                />
        });

        return (
            <div>

                <SearchNotes />

                <ul>
                    {items}
                </ul>

            </div>
        );
    }
}

var notes = React.createClass({

    getInitialState: function(){

        return {
            notes: notesData
        }
    },

    render: function() {

        var notes = this.state.notes;

        var items = notes.map(function(item) {
            return <Card key={item.key} title={item.title} />
        });

        return (
            <div>

                <SearchNotes />

                <ul>
                    {items}
                </ul>

            </div>
        );
    }

});

var notesData = [
    {
        key: 0,
        title : "Future"
    },
    {
        key: 1,
        title : "Birthdays"
    },
    {
        key: 2,
        title : "ToDo"
    }
];

module.exports = Notes;
