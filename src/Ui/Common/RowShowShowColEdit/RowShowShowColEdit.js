import React, {Component} from 'react';

class RowShowShowColEdit extends Component {
    render() {
        let{label,value,className,labelClass,valueClass}=this.props;
        return (
            <div className={['d-flex','collapseSpanHeight','align-items-center','mt-2' ,className||''].join(' ')} dir='rtl'>
                <span className={['Fs-row-show ' ,labelClass||''].join(' ')}>{label} <span className='pr-2'>:</span></span>
                <span className={['Fs-row-show' ,valueClass||''].join(' ')}>{value}</span>
            </div>
        );
    }
}

export default RowShowShowColEdit;