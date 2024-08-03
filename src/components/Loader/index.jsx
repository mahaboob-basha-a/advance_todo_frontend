import React from 'react'
import { ThreeDots } from 'react-loader-spinner';
import './index.css';

const Loader = () => {
  return (
    <div className='loader-page'>
        <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#6572ffc9"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    </div>
  )
}

export default Loader