'use strict';

import React, { Component, PropTypes } from 'react';

import { DragSource, DropTarget, DragDropContext } from 'react-dnd';

import update from 'react/lib/update';

import HTML5Backend from 'react-dnd-html5-backend';

import flow from 'lodash/function/flow';

import Note from './note.js';

import SearchNotes from './search.js';

import filter from 'lodash/collection/filter.js';
import indexOf from 'lodash/array/indexOf.js';
import forEach from 'lodash/collection/forEach.js';


class Notes extends Component {

    constructor(props){
        super(props);

        this.moveNote = this.props.moveNote;
        this.findNote = this.props.findNote;

        /*this.state = {
            notes: this.props.notes
        };*/
    }

    /*moveNote(id, atIndex) {
        const { note, index } = this.findNote(id);

        this.setState(update(this.state, {
            notes: {
                $splice: [
                    [index, 1],
                    [atIndex, 0, note]
                ]
            }
        }));

        var counter = 0;
        forEach(this.state.notes,function(item){
            item.position = counter;
            counter++;
        });

        this.props.updatePosition(this.state.notes);

    }*/

    /*findNote(id) {
        const { notes } = this.state;
        const note = notes.filter(c => c.id === id)[0];

        return {
            note,
            index: notes.indexOf(note)
        };
    }*/


    getNotesByFolderId(id){

        const notes = this.props.notes;

        return filter(notes,function(item){
            return item.directoryId == id ;
        });
    }

    render() {

        const { connectDropTarget } = this.props;

        var self = this;

        var filteredNotes = this.getNotesByFolderId(this.props.folder.id);

        var items = filteredNotes.map(function(item) {

            return <Note
                key={item.key}
                id={item.id}
                title={item.title}
                notes={self.props.notes}
                moveNote={self.moveNote}
                findNote={self.findNote}
                saveNotePosition={self.props.saveNotePosition}
                updateNoteTitle={self.props.updateNoteTitle}
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

const noteTarget2 = {
    drop() {
    }
};

function dropCollect2(connect){
    return {
        connectDropTarget: connect.dropTarget()
    }
}

export default flow(
    DropTarget('note', noteTarget2, dropCollect2),
    DragDropContext(HTML5Backend)
)(Notes);

