import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, Switch, DatePicker, message } from 'antd';
import axios from "axios";

export default function Update() {
    let params = useParams()
    let [detail, setDetail] = useState({})
    let nav = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = (values) => {
        let date = values.date.format('YYYY-MM-DD')
        let data = JSON.stringify({
            "data": {
                ...values,
                date
            }
        });
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://backoffice.nodemy.vn/api/tasks',
            headers: {

                'Content-Type': 'application/json',

            },
            data: data
        };

        axios(config)
            .then((response) => {
                let txtData = JSON.stringify(response.data)
                localStorage.getItem("user", txtData)
                console.log(response.data.data);
form.setF
                messageApi.open({
                    type: 'success',
                    content: `Sửa task ${values.id} thành công`,

                });
                setTimeout(() => {
                    window.location.href = '/home';
                }, 2000);
            })
            .catch((error) => {
                messageApi.open({
                    type: 'error',
                    content: 'Thua, hết cứu!!!',
                });
            });


    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const configDate = {
        rules: [
            {
                type: 'object',
                required: true,
                message: 'Chọn giờ đi bro!!!',
            },
        ],
    };
    useEffect(() => {
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://backoffice.nodemy.vn/api/tasks/${params.id}`,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        axios(config)
            .then(response => {
                setDetail(response?.data?.data)
                let txtData = JSON.stringify(response.data)
                localStorage.getItem("user", txtData)

            })
            .catch((error) => {
                console.log(error);
            });
    }, [])
    return (
        <>
            {contextHolder}
            <Form
                className='update-form'
                name="update"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 12,
                }}
                style={{
                    maxWidth: 600,
                }}
                // initialValues={{
                //     title:detail?.attributes.title,
                //     date:detail?.attributes.date,
                //     compelete:detail?.attributes.complete
                // }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Task"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng không bỏ trống!!!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Form.Item name="complete" label="Trạng thái" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                    <Form.Item name="date" label="Deadline:" {...configDate}>
                        <DatePicker />
                    </Form.Item>
                    <span>
                        <Button type="primary" htmlType="submit" >
                            Update                        </Button>
                        <Button type="primary" onClick={() => {
                            nav("/home")
                        }} >
                            Quay lại danh sách
                        </Button>
                    </span>

                </Form.Item>

            </Form>
        </>
    )


}