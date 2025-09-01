import React from 'react'

const AuthLayout = ({children}) => {
  // children is a special React prop that represents whatever JSX you wrap inside
  return <div className="flex justify-center pt-40">{children}</div>; // {children} → whatever content you wrapped inside AuthLayout gets injected here.
}

export default AuthLayout