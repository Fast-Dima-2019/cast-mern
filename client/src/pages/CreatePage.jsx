import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'

export const CreatePage = (props) => {
  const {request} = useHttp()
  const auth = useContext(AuthContext)
  const history = useHistory()
  const [devName, setDevName] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
        const data = await request('/api/device/generate', 'POST',
            {name: devName, description: description},
            {Authorization: `Bearer ${auth.token}`}
        )
        // console.log('out', data)
        history.push(`/detail/${data.id}`)
      } catch (e) {
      }

    }
  }

  return <>
    <h1>Create Page</h1>
    <div className="row">
      <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
        <div className="input-field">
          <input
              placeholder="Укажите имя устройства"
              id="name" name="devName"
              type="text"
              value={devName}
              onChange={e => setDevName(e.target.value)}
          />
          <label htmlFor="name">Name</label>
        </div>

        <div className="input-field">
          <input
              placeholder="Укажите описание"
              id="description" name="description"
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              onKeyPress={pressHandler}
          />
          <label htmlFor="description">Name</label>
        </div>

      </div>
    </div>
  </>
}