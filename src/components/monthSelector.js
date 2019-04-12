import React, { Component } from 'react';
import moment from 'moment';
const Months = moment.months();
class MonthSelector extends Component{
     handleMonthChanged(e) {
        const {onSelectMonth} =  this.props;
        const selected = e.target.value;
        //console.log(selected);
        onSelectMonth(selected);
    }
    render(){
        const {selected} = this.props;
        return(
            <div style={{marginBottom:20}}>
                <span>Select Month</span>
                {/* use value in select tag to set a default value in beginning */}
                <select value={selected} onChange={this.handleMonthChanged.bind(this)}>
                    {Months.map((month,index)=>(<option value={index} key={index}>{month}</option>))}
                </select>
            </div>
        )
    }
    
}
export {MonthSelector}