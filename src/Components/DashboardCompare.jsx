import React from 'react'

const DashboardCompare = ({item}) => {
  return (
    <div className="flex bg-white py-3 px-6 lg:gap-24 md:gap-6 rounded-lg">
            <div className="flex flex-col gap-y-4">
              <p className="mb-0">Total</p>
              <h4 className="text-xl">${item.price}</h4>
            </div>
            <div className="flex flex-col gap-y-4">
              <h6 className=" font-semibold flex gap-4 justify-end items-center"> <span className='text-2xl'>{item.icon}</span> <span>{item.tradeoff}%</span></h6>
              <p className="mb-0">Compared To {item.comparedTo}</p>
            </div>
    </div>
  )
}

export default DashboardCompare
