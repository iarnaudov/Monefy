import React from 'react'

declare var M

class Icon extends React.Component {



    componentDidMount() {
    }

    render() {
        const category = this.props.category;
        const currentIconClass = category.icon[0] + " " + category.icon[1];

        return (
            <div>
                <i className={`${currentIconClass}`} style={{color: category.color}}></i>
            </div>
        )
    }
}


export default Icon