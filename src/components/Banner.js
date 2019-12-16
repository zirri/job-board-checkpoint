import React from 'react';

class Banner extends React.Component{

    handleClick(view){
        const { changeView } = this.props
        changeView(view);
    }

    render(){
        return (
        <>             
            <header className="nav-extended blue-grey darken-2 center">
                <div className="nav-wrapper">
                    <a onClick={this.handleClick.bind(this, 'overview')} href="#!" className="brand-logo">
                        <h1 className='small-header nav-title'>
                            Job board
                        </h1>
                    </a>
                </div>
                <button className="btn-small waves-light grey" onClick={this.handleClick.bind(this, 'overview')}>
                    Back to overview
                </button>
                <button className="btn-small waves-light grey" onClick={this.handleClick.bind(this, 'add')}>
                    Add a new job
                </button>
            </header>
        </>)
    }
}

export default Banner;