// import axios from "axios";
// import { Button, Form, Input, Switch, DatePicker, message } from 'antd';
// import { useNavigate } from "react-router-dom";
// export default function Add() {
//     let nav = useNavigate()
//     const [messageApi, contextHolder] = message.useMessage();

//     const token = JSON.parse(localStorage.getItem('user'))
//     const onFinish = (values) => {
        
//         let data = JSON.stringify({
//             "data": {
//                 ...values,
                
//             }
//         });
//         let config = {
//             method: 'post',
//             maxBodyLength: Infinity,
//             url: 'https://backoffice.nodemy.vn/api/tasks',
//             headers: {

//                 Authorization: Bearer`${token.jwt}`,
//                 'Content-Type': 'application/json',
//                 'Access-Control-Allow-Origin': '*'
//             },
//             data: data
//         };

//         axios(config)
//             .then((response) => {
//                 let txtData = JSON.stringify(response.data)
//                 localStorage.getItem("user", txtData)
//                 console.log(response.data.data);

//                 messageApi.open({
//                     type: 'success',
//                     content: `Thêm task ${values.title} thành công`,

//                 });
//                 setTimeout(() => {
//                     window.location.href = '/home';
//                 }, 2000);
//             })
//             .catch((error) => {
//                 messageApi.open({
//                     type: 'error',
//                     content: 'Thua, hết cứu!!!',
//                 });
//             });


//     }
//     const onFinishFailed = (errorInfo) => {
//         console.log('Failed:', errorInfo);
//     };
//     // const configDate = {
//     //     rules: [
//     //         {
//     //             type: 'object',
//     //             required: true,
//     //             message: 'Chọn giờ đi bro!!!',
//     //         },
//     //     ],
//     // };

//     return (
//         <>
//             {contextHolder}
//             <Form
//                 className='add-form'
//                 name="basic"
//                 labelCol={{
//                     span: 8,
//                 }}
//                 wrapperCol={{
//                     span: 12,
//                 }}
//                 style={{
//                     maxWidth: 600,
//                 }}
//                 initialValues={{

//                 }}
//                 autoComplete="off"
//             >
//                 <Form.Item
//                     label="Task"
//                     name="title"
//                     rules={[
//                         {
//                             required: true,
//                             message: 'Vui lòng không bỏ trống!!!',
//                         },
//                     ]}
//                 >
//                     <Input />
//                 </Form.Item>
//                 <Form.Item
//                     wrapperCol={{
//                         offset: 8,
//                         span: 16,
//                     }}
//                 >
//                     <Form.Item name="complete" label="Trạng thái" valuePropName="checked">
//                         <Switch />
//                     </Form.Item>
//                     {/* <Form.Item name="date" label="Deadline:" {...configDate}>
//                         <DatePicker />
//                     </Form.Item> */}
//                     <span>
//                         <Button type="primary" onClick={onFinish}>
//                             Thêm task
//                         </Button>
//                         <Button type="primary" onClick={() => {
//                             nav("/home")
//                         }} >
//                             Quay lại danh sách
//                         </Button>
//                     </span>

//                 </Form.Item>

//             </Form>
//         </>
//     )


// }


import React, { useRef, useState } from 'react';
import axios from 'axios';

export default function Add() {
  const [todos, setTodos] = useState([]);
  const todoInputRef = useRef(null);
  let token = JSON.parse(localStorage.getItem('user'))

  const handleAdd = () => {
    const taskText = todoInputRef.current.value;
  if (taskText) {
    // Check if the task already exists in the list
    const existingTodo = todos.find((todo) => todo.title === taskText);
    if (existingTodo) {
      alert('Task already exists');
      return;
    }

    const newTask = {
      title: taskText,
      date: new Date().toISOString(),
      complete: false,
    };
      const config = {
        method: 'post',
        url: 'https://backoffice.nodemy.vn/api/tasks',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.jwt}`,
        },
        data: JSON.stringify({ data: newTask }),
      };

      axios.request(config)
        .then((response) => {
          const { data } = response;
          // Thêm công việc mới vào danh sách
          setTodos([...todos, data]);
          // Xóa giá trị trong input
          todoInputRef.current.value = '';
          window.location.href=('/home')
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <input type="text" ref={todoInputRef} />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}
