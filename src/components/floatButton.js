import React from 'react';

const FloatButton =({clickMe})=>{
    return (
        <div style={{position:'fixed',top:8,right:290,cursor:'pointer'}}>
        <div style={{
        width:40,
        height:40,
        borderRadius:50,
        backgroundColor:"#1C667C",
        display:'flex',
        justifyContent:'center'
        ,alignItems:'center'
        ,color:"#FFF",
        boxShadow:"2px 2px 3px #999"
        }}
        onClick={clickMe}>
            <i className='fa fa-plus fa-lg'/>
        </div>
        
      </div>
    );
}
export {FloatButton}