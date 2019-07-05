import React from 'react';


const Scroll = (props) => {
    return (
        <div style={{overflowY: 'scroll',border:'5px solid', margin: '5px',height:'800px',overflowX:'hidden' }}>
            {props.children}
        </div>
    )
};

export default Scroll;