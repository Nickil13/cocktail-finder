import React from 'react'

export default function Loading({children}) {
    return (
        <div className="p-5">
            <h2 className="text-center text-4xl p-10 text-indigo-400">{children ? children : 'Loading...'}</h2>
        </div>
    )
}
