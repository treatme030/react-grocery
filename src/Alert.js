import React, { useEffect } from 'react';

const Alert = ({ type, msg, removeAlert, list }) => {
    //3초 뒤 alert 사라지게 하기
    useEffect(() => {
        const timeout = setTimeout(() => {
            removeAlert()
        },5000)
        return () => clearTimeout(timeout)
    },[list]) // 마지막 리스트 상태값 변경되고 마지막 alert가 3초 뒤 사라짐 
    return (
        <p className={`alert alert-${type}`}>
            {msg}
        </p>
    );
};

export default Alert;