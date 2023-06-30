import { useEffect, useState } from "react";
import { Pagination } from 'antd';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
export default function Home() {
    let nav = useNavigate()
    let [task, setTask] = useState([])
    const [pageInfo, setPageInfo] = useState({
        total: 9,
        pageSize: 6,
        page: 1
    })
    useEffect(() => {
        let config = {
            method: 'get',
            url: `https://backoffice.nodemy.vn/api/tasks?pagination[page]=${pageInfo.page}&pagination[pageSize]=${pageInfo.pageSize}&sort[0]=id:desc`
        }
        axios(config)
            .then(function (res) {
                let list = res?.data?.data
                setTask(list)
                setPageInfo({
                    ...pageInfo,
                    total: res?.data?.meta?.pagination?.total
                })
            })
    }, [pageInfo.page, pageInfo.pageSize])
    let logOut = () => {
        localStorage.removeItem('user')
        nav("/")
    }


    function deleteTask(id){
    // let token = JSON.parse(localStorage.getItem('user'))

    //     let config = {
    //         method: 'delete',
    //         maxBodyLength: Infinity,
    //         url: `https://backoffice.nodemy.vn/api/tasks/${id}`,
    //         headers: {
    //             'Authorization': `Bearer ${token.jwt}    ` ,
    //             'Content-Type': 'application/json',
    //         }
    //     };

    //     axios.request(config)
    //         .then((response) => {
    //             console.log(JSON.stringify(response.data));
    //             // let txtData = JSON.stringify(response.data)
    //             // localStorage.getItem('user', txtData)
    //             // window.location.reload();
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    }
    return (
        <div>
            <Pagination simple defaultCurrent={1} total={pageInfo.total} page={pageInfo.page} pageSize={pageInfo.pageSize}
                onChange={(trang, size) => {
                    setPageInfo({
                        ...pageInfo,
                        page: trang,
                        pageSize: size
                    })
                }}
            />
            {task.map(item => {
                return <h5 key={item.id}>
                    Task {item.id}: {item?.attributes?.title}
                    <button onClick={() => {
                        nav(`/${item.id}`)
                    }}>Chi tiet</button>
                    <button onClick={deleteTask(item.id)}>Xoa</button>
                </h5>
            })}
            <button onClick={logOut}>
                Đăng xuất
            </button>
        </div>
    )

}