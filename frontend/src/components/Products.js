import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Products() {
  return (
    <div>
        Products
        <Link to="new"> New</Link>
        <Outlet />
    </div>
  )
}

export default Products