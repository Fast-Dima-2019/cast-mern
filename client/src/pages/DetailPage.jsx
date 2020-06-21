import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext';
import {Loader} from '../components/Loader';
import {DeviceCard} from '../components/DeviceCard';

export const DetailPage = (props) => {
  const {request, loading} = useHttp()
  const [device, setDevice] = useState(null)
  const {token} = useContext(AuthContext)
  const deviceId = useParams().id

  const getDevice = useCallback(async () => {
    try {
      const fetched = await request(`/api/device/${deviceId}`, 'GET', null,
          {Authorization: `Bearer ${token}`}
      )
      setDevice(fetched)
    } catch (e) {
    }
  }, [token, deviceId, request])

  useEffect(() => {
    getDevice()
  }, [getDevice])
  if (loading) {
    return <Loader/>
  }

  return <>
    {/*<h1>Detail Page</h1>*/}
    {!loading && device && <DeviceCard device={device}/>}
  </>
}