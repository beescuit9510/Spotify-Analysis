import React from 'react'
import Loading from './Loading'
import Flex from './Flex'

const Button = ({ isLoading = false, className, children, ...rest }) => {
  return (
    <button className={`${className ? className : ''}`} {...rest}>
      <Flex className='justify-center items-center relative'>
        <Loading className={`absolute ${isLoading ? '' : 'hidden'}`} />
        <div className={`${isLoading ? 'invisible' : ''}`}>{children}</div>
      </Flex>
    </button>
  )
}

export default Button
