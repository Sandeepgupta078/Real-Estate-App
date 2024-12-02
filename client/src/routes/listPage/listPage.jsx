import React from 'react'
import './listPage.scss'
import { listData } from '../../lib/data'
import Filter from '../../components/Filter/Filter'
import Card from '../../components/card/card'
import Map from '../../components/map/map'

const ListPage = () => {
    
    const data = listData;

  return (
    <div className='listPage'>
        <div className="listContainer">
            <div className="wrapper">
                <Filter />
                {data.map((item) => (
                    <Card key={item.id} item={item} />
                ))}
            </div>
        </div>
        <div className="mapContainer">
            <Map items={data}/>
        </div>
    </div>
  )
}

export default ListPage