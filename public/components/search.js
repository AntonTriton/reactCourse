
import React, { Component, PropTypes } from 'react';

import Autocomplete from '../vendor/Autocomplete.js';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { getStates, matchStateToTerm, sortStates, styles } from '../vendor/utils';

class SearchNotes extends Component{

    constructor(props){
        super(props);

        this.adv_on_class = "hidden";
        this.adv_off_class = "visible";

        this.tooltip = (
            <Tooltip id="tooltip1">Switch on/off advanced mode. Advanced Mode allows you search also through the content of notes and tags.</Tooltip>
        );

    }

    triggerAdvMode(){

        var self = this;

        if(self.is_advanced_mode){

            self.is_advanced_mode = false;
            self.adv_on_class = "hidden";
            self.adv_off_class = "visible";

        }else{
            self.is_advanced_mode = true;
            self.adv_on_class = "visible";
            self.adv_off_class = "hidden";
        }

        this.forceUpdate();
    }

    goToNote(label, item){
        window.location.hash = "#/note/"+item.id;
    }

    render(){

        var self = this,
            items = self.props.notes;

        return (
            <div>
                <Autocomplete
                    initialValue=""
                    items={items}
                    getItemValue={(item) => item.title}
                    shouldItemRender={matchStateToTerm.bind(this,self.is_advanced_mode)}
                    sortItems={sortStates}
                    onSelect={self.goToNote}
                    renderItem={(item, isHighlighted) => (
                <div
                  style={isHighlighted ? styles.highlightedItem : styles.item}
                  key={item.key}
                >{item.title}</div>
              )}
                    />

                <OverlayTrigger placement="right" overlay={self.tooltip}>
                    <span className="advanced-link"
                          onClick={self.triggerAdvMode.bind(this)}
                        >
                        <span style={{color: 'blue'}} className={self.adv_on_class}>Adv on</span>
                        <span style={{color: 'gray'}} className={self.adv_off_class}>Adv off</span>
                    </span>
                </OverlayTrigger>
            </div>

        );

    }

};

export default SearchNotes;