import React from 'react';
import Popover from 'devextreme-react/popover';



/**
 * `category`: string - префикс группы  
 * `properties`: {} - list properties   
 * `image`: string - file handle    
 * `width`: number  
 * `position`: "bottom" | "left" | "right" | "top"  
 * `detaild`: ()=> - render props
 */
export class ViewItem extends React.PureComponent {
    constructor(props) {
        super(props)
        this.show = this.show.bind(this);
        this.renderDetails = this.renderDetails.bind(this);
    }
    render() {
        const { item } = this.props;

        return (
            <div>
                <div onClick={this.show} className="item-content">
                    <img src={item.image} />
                    <div className="item-options">
                        { this.props.properties }
                    </div>
                    <Popover
                        showEvent="mouseenter"
                        hideEvent="mouseleave"
                        position={this.props.position}
                        target={`#${this.props.category}-${item.id}`}
                        width={this.props.width??260}
                        contentRender={this.renderDetails}
                    />
                </div>
            </div>
        );
    }
    renderDetails() {
        const agent = this.props.item.details;

        return(
            { agent }
        );
    }
    show() {
        this.props.show(this.props.item);
    }
}