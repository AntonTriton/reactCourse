'use strict';

var Autocomplete = require('../vendor/Autocomplete.js');

import React, { Component, PropTypes } from 'react';

import { getStates, matchStateToTerm, sortStates, styles } from '../vendor/utils';

import { DragSource, DropTarget, DragDropContext } from 'react-dnd';

import update from 'react/lib/update';

import HTML5Backend from 'react-dnd-html5-backend';

import flow from 'lodash/function/flow';

import Card from './note.js';

import filter from 'lodash/collection/filter.js';

import indexOf from 'lodash/array/indexOf.js';

import forEach from 'lodash/collection/forEach.js';



class SearchNotes extends Component{

    render(){

        var self = this;

        return (
            <Autocomplete
                initialValue=""
                items={self.props.notes}
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

};


class Notes extends Component {

    constructor(props){
        super(props);

        this.moveCard = this.moveCard.bind(this);
        this.findCard = this.findCard.bind(this);

        this.state = {
            cards: this.props.notes
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

        var counter = 0;
        forEach(this.state.cards,function(item){
            item.position = counter;
            counter++;
        });

        this.props.updatePosition(this.state.cards);

    }

    findCard(id) {
        const { cards } = this.state;
        const card = cards.filter(c => c.id === id)[0];

        return {
            card,
            index: cards.indexOf(card)
        };
    }


    getCardsByFolderId(id){

        const cards = this.state.cards;

        return filter(cards,function(item){
            return item.directoryId == id ;
        });
    }

    render() {

        const { connectDropTarget } = this.props;

        var self = this;

        var filteredCards = this.getCardsByFolderId(this.props.folder.id);

        var items = filteredCards.map(function(item) {

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

                <SearchNotes
                    notes={self.props.notes}
                    />

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

export default flow(
    DropTarget('card', cardTarget2, dropCollect2),
    DragDropContext(HTML5Backend)
)(Notes);

