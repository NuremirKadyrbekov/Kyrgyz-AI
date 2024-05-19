import React from 'react'
import Css from './GoogleResult.module.css'


function GoogleResults(props) {
    // const {results} = props
   const {results} = props

  return (
    <> 
    <h1>Google</h1>
    {results.map((result, index) => (
              <div className={Css.Container} key={index}>
                <h1><a href={result.link} target='_blanck'>{result.title}</a></h1>
                <p>{result.snippet}</p>
             </div>
            )) 
            }
    </>
         
  )
}

export default GoogleResults

