'use strict';

var React = require('react'),
    Autocomplete = require('../vendor/Autocomplete.js');

import { getStates, matchStateToTerm, sortStates, styles } from '../vendor/utils';

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

var notes = React.createClass({

    getInitialState: function(){

        return {
            notes: notesData
        }
    },

    render: function() {

        var notes = this.state.notes;

        var items = notes.map(function(item) {
            return <NoteItem key={item.key} title={item.title} />
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

module.exports = notes;
