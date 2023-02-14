import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';

function Loader(props) {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgb(239,239,239,0.4)',
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 99999,
            display: props.isLoading === false ? 'none' : 'flex',
            top: 0,
            left: 0,
        }}>
            <ClipLoader color='blue' loading={props.loading} size={50} />
        </div>
    )
}

export default Loader