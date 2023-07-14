import axios from "axios";
import { Button, Form, Input, Switch, DatePicker, message } from 'antd';
import { useNavigate, useParams } from "react-router-dom";
export default function Update() {
  let nav = useNavigate()
  var params = useParams()
  const [messageApi, contextHolder] = message.useMessage();

  let token = JSON.parse(localStorage.getItem('user'))



  let onFinish = (values) => {

    var data = JSON.stringify({
      "data": { ...values }
    });
    useEffect(() => {
      let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `https://backoffice.nodemy.vn/api/tasks/${params.id}`,
        headers: {

          Authorization: Bearer`${token.jwt}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        data: data
      };

      axios(config)
        .then((response) => {
          let txtData = JSON.stringify(response.data)
          localStorage.getItem("user", txtData)

          setDetail(response.data.data)
          messageApi.open({
            type: 'success',
            content: `Cập nhật task ${values.id} thành công`,

          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((error) => {
          messageApi.open({
            type: 'error',
            content: 'Không cập nhật được, hết cứu!!!',
          });
        });

    }, [])

  }
  let onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };






  return (
    <>
      {contextHolder}
      <Form
        className='add-form'
        name="Update"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 12,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{

        }}
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

          <span>
            <Button onClick={onFinish}>
              Thêm task
            </Button>
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