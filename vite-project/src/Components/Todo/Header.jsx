import axios from "axios";
import { useEffect, useState } from "react";
export default function Debounce(){
let [Loc,setLoc]=useState("")

useEffect(() => {
  const getData = setTimeout(() => {
    axios
      .get(`https://api.postalpincode.in/pincode/${Loc}`)
      .then((response) => {
        console.log(`${Loc}`);
      });
  }, 500);

  return () => clearTimeout(getData);
}, [Loc]);

return(
  <input type="text" 

  onChange={(event)=>setLoc(event.target.value)}
  />
)
}


// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";


// export default function LocName() {
//   const [loc, setLoc] = useState("");
//   const [locRes, setLocRes] = useState([]);
//   const nav = useNavigate();

//   useEffect(() => {
//     const filter = () => {
//       let config = {
//         method: 'get',
//         url: `https://backoffice.nodemy.vn/api/tasks?pagination[page]=1&pagination[pageSize]=10&sort[0]=id:desc`


//       };

//       axios(config)
//         .then((response) => {
//           const data = response.data.data;
//           console.log(data)
//           if (Array.isArray(data)) {
//             setLocRes(response.data.data);
//           } else {
//             setLocRes([]);
//           }
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     };

//     const timeout = setTimeout(() => {
//       if (loc !== "") {
//         filter();
//       } else {
//         setLocRes([]);
//       }
//     }, 100);

//     return () => clearTimeout(timeout);
//   }, [loc]);



//   return (
//     <div>
//       <input
//         placeholder="Tìm task..."
//         value={loc}
//         onChange={(event) => setLoc(event.target.value)}
//       />

//       {locRes.map((item) => (
//         <h5 key={item?.id}>

//           Task {item?.id}: {item?.attributes?.title}
//           <button onClick={() => {
//             nav("/:id")
//           }
//           }>Chi tiet</button>
//         </h5>
//       ))}
//     </div>
//   );
// }


// import { useSelector } from "react-redux"
// import React from 'react';
// import { UserOutlined } from '@ant-design/icons';
// import { Input } from 'antd';
// export default function Debounce() {

//   const user = useSelector(stateTong => stateTong.user.value)

//   const [x, setX] = useState("")
//   let timer;

//   return (
//     <Input
//       size="large"
//       placeholder="large size"
//       onChange={(e) => {
//         clearTimeout(timer)
//         setTimeout(() => {
//           console.log(e.target.value);
//           setX(e.target.value)
//         }, 1000);
//       }}


//       prefix={<UserOutlined />} />
//   )
// }