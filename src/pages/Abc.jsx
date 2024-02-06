import axios from 'axios'
import React from 'react'

const Abc = () => {
  axios.get(
    "https://port-0-backend-book-pharmacy-umnqdut2blqqhv7sd.sel5.cloudtype.app/hello"
  ).then((res)=>console.log(res));

  return (
    <div>


    </div>
  )
}

export default Abc