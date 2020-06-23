import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { DevicesList } from '../components/DevicesList'

export const DevicePage = (props) => {
  const {token} = useContext(AuthContext)
  const [devices, setDevices] = useState([])
  const {loading, request} = useHttp()

  const getDevices = useCallback(async () => {
    try {
      const fetched = await request(`/api/device`, 'GET', null,
          {Authorization: `Bearer ${token}`}
      )
      setDevices(fetched)
    } catch (e) {
    }
  }, [token, request])

  useEffect(() => {
    getDevices()
  }, [getDevices])

  if (loading) {
    return <Loader/>
  }

  return <>
    {/*<h1>Device Page</h1>*/}
    {!loading && <DevicesList devices={devices}/>}
  </>
}