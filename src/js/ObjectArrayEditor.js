import React from 'react';
import Editor from './Editor'
import PropEditorBase from './PropEditorBase'

export default class ObjectArrayEditor extends React.Component {
  render() {
    this.props.data.value = this.props.data.value || [];
    const editors = this.props.data.value.map((subData, idx) => {
      const subEditors = this.props.data.type.map((subType, subIdx) => {
        // clone the definition
        const itemData = JSON.parse(JSON.stringify(subType));
        // compute the value
        if(typeof this.props.data[itemData.name] === 'undefined')
          itemData.value = itemData.default;
        else
          itemData.value = this.props.data[itemData.name];
        // create the editor
        return Editor.createPropEditors(itemData, this.props.componentNames, this.props.onBrowse, (value) => {
          subData[itemData.name] = value;
          this.props.onChange(this.props.data.value);
        }, subIdx);
      });
      return <div
        key={idx}
        >
          <button onClick={e => {
            this.props.data.value.splice(idx, 1);
            this.props.onChange(this.props.data.value);
          }}>-</button>
          <div className="sub-editors">
            {subEditors}
          </div>
        </div>;
    });
    return <PropEditorBase data={this.props.data}>
      <div className="sub-editors-container">
        { editors }
        <button
          className="add-btn"
          onClick={e => this.props.onChange(this.props.data.value.concat([{}]))}
        >+</button>
      </div>
    </PropEditorBase>;
  }
}