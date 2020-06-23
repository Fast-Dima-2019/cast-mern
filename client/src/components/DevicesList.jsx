import React from 'react'
import { Link } from 'react-router-dom';

export const DevicesList = ({devices}) => {

  if (!devices.length) {
    return <p className='center'>Устройств нет</p>
  }

  return <>
    <table className="highlight">
      <thead>
      <tr>
        <th>№</th>
        <th>Наименование</th>
        <th>Токен</th>
        <th>Открыть</th>
        {/*<th>Удалить</th>*/}
      </tr>
      </thead>

      <tbody>
      {devices.map((device, index) => {
        return (
            <tr key={device.id}>
              <td>{index + 1}</td>
              <td>{device.name}</td>
              <td>{device.id}</td>
              <td><Link to={`/detail/${device.id}`}>Открыть</Link></td>
              {/*<td><Link to={`/detail/${device.id}`}>Удалить</Link></td>*/}
            </tr>
        )
      })}
      </tbody>
    </table>
  </>
}