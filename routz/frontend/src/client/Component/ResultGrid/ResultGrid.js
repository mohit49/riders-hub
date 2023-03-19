import React from 'react'
import Button from 'react-bootstrap/Button';
import { Result } from 'antd';
function ResultGrid({status,title,subTitle, href1, href2}) {

  return (
    <Result
    status={status}
    title={title}
    subTitle={subTitle}
    extra={[
      <Button href={href1} type="primary" key="console">
        View Event
      </Button>,
      <Button key="buy">Buy Again</Button>,
    ]}
  />
  )
}

export default ResultGrid