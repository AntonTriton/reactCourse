'use strict';

var Autocomplete = require('../vendor/Autocomplete.js');

import React, { Component, PropTypes } from 'react';

import { getStates, matchStateToTerm, sortStates, styles } from '../vendor/utils';

import { DragSource, DropTarget, DragDropContext } from 'react-dnd';

import update from 'react/lib/update';

import HTML5Backend from 'react-dnd-html5-backend';

import flow from 'lodash/function/flow';

import Card from './note.js';

import {notesData} from './data.js';


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

/*var NoteItem = React.createClass({

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

});*/

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

        console.log('moveCard',this.state);

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

        console.log('findCard',this.state);

        return {
            card,
            index: cards.indexOf(card)
        };
    }

    render() {

        //console.log('notes',this.props);

        const { connectDropTarget } = this.props;
        const { cards } = this.state;

        var self = this;

        //var notes = this.state.notes;

        var items = cards.map(function(item) {
            return <Card
                key={item.key}
                id={item.id}
                title={item.title}
                moveCard={self.moveCard}
                findCard={self.findCard}
                />
        });

        return connectDropTarget(
            <div>

                <SearchNotes />

                <ul>
                    {items}
                </ul>

            </div>
        );
    }
}

Notes.propTypes = {
    connectDropTarget: PropTypes.func.isRequired
};

const cardTarget2 = {
    drop() {
    }
};

function dropCollect2(connect){
    return {
        connectDropTarget: connect.dropTarget()
    }
}

module.exports = flow(
    DropTarget('card', cardTarget2, dropCollect2),
    DragDropContext(HTML5Backend)
)(Notes);

