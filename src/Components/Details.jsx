import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Detail() {
    let [detail, setDetail] = useState(null)
    let nav = useNavigate()
    let params = useParams()
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
        <div>
            <button onClick={() => {
                nav('/home')
            }}>Trang chu</button>

            
            {detail ? <h1>{detail?.attributes?.title}

            </h1> : "Khong co gi o day ca!!!"}
        </div>
    )
}