import React from 'react'
import { Button, Modal } from 'antd';


const CustomModal = (props) => {
    const {title,open,perfomTask,hideModal} = props;
  return (
    <Modal
        title="Confirmation"
        style={{"color":"black"}}
        open={open}
        onOk={perfomTask}
        onCancel={hideModal}
        okText="Ok"
        cancelText="Cancel"
      >
        
        <p>{title}</p>
      </Modal>
  )
}

export default CustomModal
