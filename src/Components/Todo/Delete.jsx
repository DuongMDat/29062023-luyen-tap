import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Delete() {

    useEffect(() => {
        let params = useParams()
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `https://backoffice.nodemy.vn/api/tasks/${params.id}`,
            headers: {
            }
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                let txtData = JSON.stringify(response.data)
                localStorage.getItem('user', txtData)
            })
            .catch((error) => {
                console.log(error);
            });

    }, [])
}