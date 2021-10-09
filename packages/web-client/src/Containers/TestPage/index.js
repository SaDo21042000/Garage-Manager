import React from 'react'
import TestContainer from './Components/TestComponent/TestContainerComponent'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import * as actions from './actions'


const TestPage=(props)=>{

    const dispatch = useDispatch();
    const onToggleStatus=async()=>{ 
        dispatch(actions.onFetchListProductRequest());
    }

    const status =useSelector(state=>state.status);
    const lstProduct =useSelector(state=>state.lstProduct);
    console.log('lst',lstProduct);
    return (
        <>  
            <h1>{props.title}</h1>
            <TestContainer onToggleStatus={onToggleStatus}/>
            {status?<h3>Có</h3>:null}
        </>  
    );
}

export default TestPage;
