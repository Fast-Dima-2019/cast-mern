import React from 'react'

export const DeviceCard = ({device}) => {

  const strBody = `{\n"token": "${device.id}",\n"code": ${device.userId}\n}`
  // console.log(device)

  return <>
    <h3>Устройство</h3>

    <p>Name: {device.name}</p>
    <p>Описание: {device.description}</p>
    <p>Token: {device.id}</p>

    {/*<p>Client: {link.devices.id_client}</p>*/}
    {/*<p>Metrics: {link.devices.metrics}</p>*/}
    <br/>
    <span>body -> for request</span>
    <div className="row">
      <form className="col s12">
        <div className="row">
          <div className="input-field col s12" style={{height: '200px'}}>
            <textarea id="textarea" readOnly style={{resize: 'none'}}
                      value={strBody}/>
            {/*<label htmlFor="textarea1">body for request</label>*/}
          </div>
        </div>
      </form>
      {/* todo disabled*/}
      <button className="btn  waves-effect waves-light"
              type="send" name="action">Отправить -> ${device.user.email}
      </button>
    </div>

  </>
}