'use strict';

import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router';

import {notesData} from './data.js';

import filter from 'lodash/collection/filter.js';

var Menu = require('./menu.js');

class SingleNote extends Component {

    constructor(props) {
        super(props);
    }

    findNote(id){
        return filter(notesData,function(item){
            return item.id == id
        });
    }

    render() {

        var note = this.findNote(this.props.params.id)[0],
            tagsCounter = 0;

        var tags = note.tags.map(function(item) {
            tagsCounter++;
            return <span key={tagsCounter}>{item}</span>
        });

        return (
            <section className="single-note">

                <Menu page="note"/>

                <div className="col-md-11">
                    <div className="single-note-row">
                        <label htmlFor="title">Title</label>
                        <div className="content-block">{note.title}</div>
                    </div>

                    <div className="single-note-row">
                        <label htmlFor="description">Description</label>
                        <div className="content-block">{note.content}</div>
                    </div>

                    <div className="single-note-row">
                        <label>Tags</label>
                        <div>
                            {tags}
                        </div>
                    </div>
                </div>

            </section>
        );
    }
}

module.exports = SingleNote;
