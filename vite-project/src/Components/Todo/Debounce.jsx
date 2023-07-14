import axios from "axios"
import { useEffect, useState } from "react"

export default function Debounce() {

    let [filter, setFilter] = useState("")

    useEffect(() => {
        let getData = setTimeout(() => {
            let config = {
                method: "get",
                url: `https://api.postalpincode.in/pincode/${Loc}`
            }
            axios(config)
                .then(res => {
                    console.log(`${filter}`);
                })
        }, 1000);
    }, [filter])
    return
}