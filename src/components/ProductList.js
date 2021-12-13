import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../GlobalUrl";
import ScreenTop from "./mobileComp/ScreenTop";
import Loader from './Loader'
import FilePreview from "./DragAndDrop/FilePreview2";
import Top from "./Top";
import "./Top.css";
import { useHistory } from "react-router";
import {
    Container,
    Tooltip,
    OverlayTrigger,
    Row,
    Col,
} from "react-bootstrap";
import IconButton from "@material-ui/core/IconButton";
import renderHTML from "react-render-html";
import Snackbar from "@material-ui/core/Snackbar";


import CommonModal1 from "./Products/comman"
import CommonModal2 from "./Products/comman1"
import CommonModal3 from "./Products/comman2"
import { Input,Select } from "@material-ui/core";
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import Product from './Products/CardProduct'
import { MdAdd } from 'react-icons/all'
import Share from './Share'
import {
    FaChevronDown,
    AiOutlineFileZip,
    SiMicrosoftexcel,
    BiSort,
    BiMenuAltLeft
} from "react-icons/all";
import { Link } from 'react-router-dom'
import AddFolder2 from "../images/folder-add2.png";
import sharedFolder from '../images/shared-folder.png'
import ClientModal from './comps/ClientModal'
import { Button,Modal, Form } from 'react-bootstrap'
import { DeleteOutline } from "@material-ui/icons";
import CloseIcon from"@material-ui/icons/Close";
import { useParams } from "react-router";
const ProductList = ({match}) => {
    var id=match.params.id
    // alert(id)
var params=useParams()
var f=params.id

//alert(f)
  // var c= match.history
//    console.log("ccccccccccccc",c)
    const history = useHistory()
    const [clients, setClients] = useState([])
    const [documents, setDocuments] = useState([])
    const [loading, setLoading] = useState(false)
    const [showClientModal, setShowClientModal] = useState(false)
    const [open, setOpen] = React.useState(false);




    const handleClose4 = () => {
        setOpen(false);
      };
    

    const [commonModal1, setCommonModal1] = useState(false)
    const [commonModal2, setCommonModal2] = useState(false)
    const [commonModal3, setCommonModal3] = useState(false)
// console.log(Product.catalog)

    const [msg, setMsg] = useState("")
    const [msg1, setMsg1] = useState("")
    const [msg2, setMsg2] = useState("")
  const commonToggle1 = () => setCommonModal1(!commonModal1)
  const commonToggle2 = () => setCommonModal2(!commonModal2)
  const commonToggle3 = () => setCommonModal3(!commonModal3)

    const handleClose1 = () => setShowClientModal(false);

    const alldocsId = useState([]);
    const alldocsPath = useState([]);
const [allproducts,setAllProdcut]=useState([])

const showProducts=()=>{
fetch(`${url}/api/createProducts/`)

.then(res => {
    return res.json().then(data => {
        console.log(data)
        setAllProdcut(data)
        // handleClose()
        // getProducts()
        // setName('')
        // setProductNumber('')
        // setPrice('')
        // setStock('')
    })
})
.catch((err) => {
    console.log(err);
})


}
    const [products, setProducts] = useState([])
    const [name, setName] = useState('')
    const [productNumber, setProductNumber] = useState('')



const [fromqty,setfromqty]=useState('')
const [toqty,setqty]=useState('')
const [price,setprice]=useState('')

  
    const [stock, setStock] = useState('')
    const [image, setImage] = useState(null)

    const [show, setShow] = useState(false)
    const handleClose = () => {
        setShow(false)
    }
    const handleShow = () => {
        setShow(true)
    }

    const getProducts =async () => {
        var clientid=id
   
const { data } = await axios.get(`${url}/api/catalog-create/?client_id=${f}`, {
    // "id": projectId
}, {
    headers: {
        'Content-Type': "application/json",
         Authorization: `Bearer ${localStorage.getItem("token")}`
    }
    
})
console.log("lolollllllllllllllllllllllllllllllllllllll",data)
setProducts(data)
        // fetch(`${url}/api/createProducts/`)
        //     .then(res => {
        //         return res.json().then(data => {
        //             console.log("lolollllllllllllllllllllllllllllllllllllll",data)
        //             setProducts(data)
        //         })
        //     })
    }

    useEffect(() => {
      fetchClient()
        getProducts()
        showProducts()
    }, [])

const [message1 ,setError]=useState('')
const [open1,setOpen1]=useState(false)
    const sendData=()=> {
//alert("a")
        var err = false;
        if ( name == '') {
    
        //   setMessage("Please Enter Deal  Name !")
        //   setCommonModal1(true)
        setMsg1("Please Select Product Name ")
        setCommonModal2(true)
        // alert("Please Select Product Name")
          err=true
        } 
        // if(productNumber == '') {
        // //   setMsg("Please Select Client Name!")
        // //   setCommonModal(true)
        // alert("Please Enter From Quantity")
        //   err=true
      
    
        // }
        
        // if(price == '') {
        //     //   setMsg("Please Select Client Name!")
        //     //   setCommonModal(true)
        //     alert("Please Enter to Quantity")
        //       err=true
          
        
        //     }
        //     if(stock == '') {
        //         //   setMsg("Please Select Client Name!")
        //         //   setCommonModal(true)
        //         alert("Please Enter price")
        //           err=true
              
            
        //         }
        
        if(!err) {
          addProducts()
        //   props.toggle()
        }
      }
      let count = 0
      const token = localStorage.getItem("token")
    const addProducts = async() => {
        // var bodyFormData = new FormData()
        // bodyFormData.append('name', name)
        // bodyFormData.append('product_number', productNumber)
        // bodyFormData.append('stock', stock)
        // bodyFormData.append('price', price)
        // bodyFormData.append('files', image)

// var id=id
console.log("array",array)

// array.forEach((value,index)=>{
//     if(value.fromqty)
//     {
//         pricing_list.push(value)
//     }
//     else if(value.toqty)
//     {
//         pricing_list.push(value)
//     }

//     else if(value.price)
//     {
//         pricing_list.push(value)
//     }
// })
// console.log("pricing_list",pricing_list)










var obj = {
   
    from_quantity:'',
    to_quantity:'',
    price:'',
   

}

// let count = 0

// if ( fromqty == '') {
//     setMsg("Please Enter From Quantity ")
//     setCommonModal1(true)
// //   setMessage("Please Enter Deal  Name !")
// //   setCommonModal1(true)
// // alert("Please Enter From Quantity")
//   err=true
// } 
// if(toqty == '') {
// //   setMsg("Please Select Client Name!")
// //   setCommonModal(true)
// setMsg1("Please Enter to Quantity ")
// setCommonModal2(true)
// // alert("Please Enter to Quantity")
//   err=true


// }

// if(price == '') {
//     //   setMsg("Please Select Client Name!")
//     //   setCommonModal(true)
//     // alert("Please Enter price")
//     setMsg2("Please Enter Price ")
//     setCommonModal3(true)
//       err=true
  

//     }
  

var err = false;
var msg = "";
if ( fromqty == '') {

    err = true;
    msg += "<b>Please Enter From Quantity ...<b><br><br>";
    // setMsg("Please Enter From Quantity !")
    // setCommonModal1(true)
//   setMessage("Please Enter Deal  Name !")
//   setCommonModal1(true)
// alert("Please Enter From Quantity")
//   err=true
} 
else if(toqty == '') {
//   setMsg("Please Select Client Name!")
//   setCommonModal(true)

err = true;
msg += "<b>Please Enter To Quantity ...<b><br><br>";
// setMsg1("Please Enter to Quantity !")
// setCommonModal2(true)
// // alert("Please Enter to Quantity")
//   err=true


}

else if(price == '') {
    //   setMsg("Please Select Client Name!")
    //   setCommonModal(true)
    // alert("Please Enter price")
    
    err = true;
    msg += "<b>Please Enter Price ...<b><br><br>";
    // setMsg2("Please Enter Price !")
    // setCommonModal3(true)
    //   err=true
  

    }
  
    if (err) {
        setErrorMessage(msg);
        setOpen(true);
      }
if(!err) {
if(array.length<=2)
{console.log(token)
    var body={from_quantity:fromqty,to_quantity:toqty,price:price}
    pricing_list.push(body)
    // console.log("gg",JSON.stringify({id:id,productid:name,pricing_list}))
    var c={id:id,productid:name,pricing_list}
    console.log("gg",JSON.stringify(c))
      await axios
        .post(url + "/api/catalog-create/", {
         body:c
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((res) => {
           console.log("RESP", res);
           getProducts()
           handleClose()
          if (res.status === 200) {
            // setMsg(title + " folder added successfully !")
            // setCommonModal(true)
            // // alert(title +" added successfully !")
            // subProjectListApi()
          }
      
        })
        .catch((err) => {
          console.log("ERROR", err)
        //   setMsg("Error!")
        //   setCommonModal(true)
        //   // alert("Error !");
        //   handleClear()
        })
    // }
    




    console.log("pricing_list",c)
    // var c=JSON.stringify ({id:id,pricing_list})
}
    //alert("a")}
else
{
array.forEach((value,index)=>{
    
     count = count + 1
     if (count == 0)
    {
        console.log("count",count)
        console.log(value)
        obj.productid = name
        // pricing_list.push( obj)
    }
     
    if (count == 1)
    {
        console.log("count",count)
        console.log(value)
        obj.from_quantity = value.fromqty
        // pricing_list.push( obj)
    }
    if (count == 2)
    {
        console.log("count",count)
        console.log(value)
        
        obj.to_quantity = value.toqty

    }

    if ( count == 3)
    {
        console.log(value)
        console.log("count",count)
        obj.price = value.price
         pricing_list.push(obj)
         obj=
         { 
           
             from_quantity:'',
         to_quantity:'',
         price:''
      
    }
        count = 0
    }
    // pricing_list.push(obj)
    // pricing_list.push(obj)
    // if (count == 4)
    // {   console.log(value)
    //     console.log("count",count)
    //     obj.id = id
    //     pricing_list.push(obj)
    //     count = 0
    // }
    
  
    
    



 })
 console.log("pricing_list",JSON.stringify ({id:id,productid:name,pricing_list}))
var c={id:id,productid:name,pricing_list}
await axios
.post(url + "/api/catalog-create/", {
 body:c
}, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
.then((res) => {
   console.log("RESP", res);
   getProducts()
  if (res.status === 200) {
    handleClose()
   
    // setMsg(title + " folder added successfully !")
    // setCommonModal(true)
    // // alert(title +" added successfully !")
    // subProjectListApi()
  }

})
.catch((err) => {
  console.log("ERROR", err)
//   setMsg("Error!")
//   setCommonModal(true)
//   // alert("Error !");
//   handleClear()
})
}


}



        // var body={id:id,productid:name,from_quantity:productNumber,to_quantity:price,price:stock}
        // fetch(`${url}/api/catalog-create/`,
        //     { headers: { 
        //     'Content-Type': 'application/json' 
        // },
        //         method: 'POST',
        //         body:JSON.stringify(body)
        //     })
        //     .then(res => {
        //         return res.json().then(data => {
        //             console.log("datatdddddddddddddddddddddddddddddt",data)

        //             handleClose()
        //             getProducts()
        //             setName('')
        //             setProductNumber('')
        //             setPrice('')
        //             setStock('')
        //         })
        //     })
        //     .catch((err) => {

        //         console.log(err);
        //     })
    }

    const [errorMessage, setErrorMessage] = useState("");
const [array,setArray]=useState([])

    let pricing_list = []

    const [state,setState]=useState({rows:[0]})
    const handleChange = idx => e => {
        //  console.log(""e.target)
        // console.log(idx)
        const { name, value } = e.target;
        const rows = [...state.rows];
        rows[idx] = {
          [name]: value
        };
    //  const v={name:value}
       array.push({[name]:value}) ;
    //    setArray([...array,{[name]:value}])
    //  alert(JSON.stringify(array))

    //     state.rows.push(value)
  
               setState({
                rows
        });
        // alert(JSON.stringify(state))
      };
      const handleAddRow = () => {

// setfromqty()
// setqty()
// setprice()


var err = false;
var msg = "";

if ( fromqty == '') {

    err = true;
    msg += "<b>Please Enter From Quantity ...<b><br><br>";
    // setMsg("Please Enter From Quantity !")
    // setCommonModal1(true)
//   setMessage("Please Enter Deal  Name !")
//   setCommonModal1(true)
// alert("Please Enter From Quantity")
//   err=true
} 
else if(toqty == '') {
//   setMsg("Please Select Client Name!")
//   setCommonModal(true)

err = true;
msg += "<b>Please Enter To Quantity ...<b><br><br>";
// setMsg1("Please Enter to Quantity !")
// setCommonModal2(true)
// // alert("Please Enter to Quantity")
//   err=true


}

else if(price == '') {
    //   setMsg("Please Select Client Name!")
    //   setCommonModal(true)
    // alert("Please Enter price")
    
    err = true;
    msg += "<b>Please Enter Price ...<b><br><br>";
    // setMsg2("Please Enter Price !")
    // setCommonModal3(true)
    //   err=true
  

    }
  
    if (err) {
        setErrorMessage(msg);
        setOpen(true);
      }
if(!err) {
    array.push({fromqty},{toqty},{price})
console.log("tttttttttttttttttttttttrray",array)

setfromqty(null)
setqty(null)
setprice(null)


        const item = {
          fromqty: "",
          toqty: "",
          price:"",
        };
    setState({
          rows: [...state.rows,item]
        });
//   handleadd(catalog)
//   props.toggle()
}




// array.push({fromqty},{toqty},{price})
// console.log("tttttttttttttttttttttttrray",array)

// setfromqty(null)
// setqty(null)
// setprice(null)


//         const item = {
//           fromqty: "",
//           toqty: "",
//           price:"",
//         };
//     setState({
//           rows: [...state.rows,item]
//         });
      }
     const  handleRemoveRow = () => {
        setState({
          rows: state.rows.slice(0, -1)
        });

    
            console.log("sli",array);
             var sliced = array.slice(0,-3);
          console.log(sliced);
     
      };
      const handleRemoveSpecificRow = (idx) => () => {
        const rows = [...state.rows]
        rows.splice(idx, 1)
        setState({ rows })
      }

    console.log("datatdddddddddddddddddddddddddddddt",products)
    const fetchClients = async () => {
        setLoading(true)
        const { data } = await axios.get(url + '/api/all-project', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        setClients(data)
    }

    useEffect(() => {
        fetchClients()
        setLoading(false)
    }, [])

    // useEffect(() => {
    //     folders.map(folder => {
    //         folder.docs_set.map(doc => {
    //             alldocsId.push(doc.id)
    //             alldocsPath.push(doc.file)
    //         })
    //     })
    //     documents.map((doc) => {
    //         alldocsId.push(doc.id);
    //         alldocsPath.push(doc.file);
    //     });
    //     localStorage.setItem("alldocs", JSON.stringify(alldocsId.slice(2)));
    //     localStorage.setItem("alldocsPath", JSON.stringify(alldocsPath.slice(2)));
    // }, [documents]);



const sethandle=async(event)=>{
 // alert(event.target.value)
  // console.log(event.target.value)
  var v=event.target.value
// gethandle(v)
//setProducts(0)
  var clientid=id
   
const { data } = await axios.get(`${url}/api/catalog-create/?client_id=${v}`, {
    // "id": projectId
}, {
    headers: {
        'Content-Type': "application/json",
         Authorization: `Bearer ${localStorage.getItem("token")}`
    }
    
})
console.log("bhoot",data)
setProducts(data)
        // fetch(`${url}/api/createProducts/`)
        //     .then(res => {
        //         return res.json().then(data => {
        //             console.log("lolollllllllllllllllllllllllllllllllllllll",data)
        //             setProducts(data)
        //         })
        //     })

}

    const [client,setClient]=useState([])
    const fetchClient = async () => {
      // setLoading(true)
      // const { data } = await axios.get(url + '/api/all-project', {
          
      const { data } = await axios.get(url + '/api/all-project', {
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
          }
      })
      setClient(data)
      // alert(data)
  }
console.log("clients",client)
    return (
        <div 
        style={{position: 'relative',
        /* margin: 0 3rem 3rem 3rem; */
        width: '80%',
        // minWidth: '190%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
        }}
        >
            <div className="main" style={{width:'125%',marginLeft:'270px'}}>
                          <ScreenTop />
            <Top />
            </div>
            {loading && <Loader />}
            <Container>
                <Row>
                    <Col>
                        <div>
                            <div>
                                <div> 
                                    {/* <OverlayTrigger
                                        placement={"top"}
                                        overlay={<Tooltip>Add Product</Tooltip>}
                                    > */}
                                        <img
                                            alt="folder-icon-add"
                                            // className="c-pointer"
                                            src={AddFolder2}
                                            style={{ width: "51px", height: "51px",marginLeft:'20px',cursor:'pointer' }}
                                            onClick={handleShow}
                                        />
                                    {/* </OverlayTrigger> */}

                                    <p className='text-center'><b style={{display:'flex',fontSize:9,marginLeft:'15px'}}>Add Catalogue</b></p>
                                </div>


                                
                
            
                                <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Catalogue</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {/* <Form> */}
                        {/* <Form.Group> */}



           
         

<Form.Group as={Row}>
                       
                        <select style={{width:'100%',height:'40px',background:'white',marginLeft:'16px',borderColor:'#DCDCDC',marginRight:'16px'}} defaultValue="" type="select" name="selectMulti" id="exampleSelectMulti"multyple 
             
             onChange={(e) => setName(e.target.value)}
           >
                <option hidden value="">Select Product</option>
             {allproducts.map(produc => (
               <option key={produc.id} value={produc.id}>{produc.name}</option>
             ))}
           </select> 
      
           </Form.Group>
      
           {state.rows.map((item, idx) => (
              
                     <Row>
                            <Form.Group as={Col}>
                            <b style={{fontSize:12}}>From Qty {idx+1}</b>
                                <Form.Control type="text" placeholder="From qty"
                                    //   value={productNumber} onChange={(e) => setProductNumber(e.target.value)}
                                      name='fromqty'
                                    //   value={stock} 
                                    onChange={(event)=>setfromqty(event.target.value)}
                                    //   value={state.rows[idx].fromqty}
                                    //   onChange={handleChange(idx)}
                                        />
                            </Form.Group>

                            <Form.Group as={Col} style={{marginTop:'24px'}}>
                                <Form.Control type="text" placeholder="To qty"name='toqty'
                                  onChange={(event)=>setqty(event.target.value)} 
                        //          value={state.rows[idx].toqty}
                        //   onChange={handleChange(idx)} 
                                    //  onChange={(e) => setPrice(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group as={Col}style={{marginTop:'24px'}}>
                                <Form.Control type="text" placeholder="price"name='price'
                                   onChange={(event)=>setprice(event.target.value)}
                                    //  value={state.rows[idx].price}
                                    //  onChange={handleChange(idx)}
                                />
                            </Form.Group> 
                            <CloseIcon size={30} style={{marginTop:'30px',color:'red',marginRight:'13px'}} onClick={handleRemoveRow} />
                            {/* <button
                onClick={handleRemoveRow}
                className="btn btn-danger float-right"
              >
                Delete Last Row
              </button> */}
                        </Row>
                     ))}

                        {/* <Row>
                            <Form.Group as={Col}>
                                <Form.Control type="text" placeholder="price"
                                    value={stock} onChange={(e) => setStock(e.target.value)}
                                />
                            </Form.Group> 

                         
                        </Row> */}

                
                

<Button onClick={handleAddRow} variant="primary" style={{width:'90px'}}><AddOutlinedIcon /></Button>
        
                   {/* <button onClick={handleAddRow} className="btn btn-primary">
                Add Row
              </button> */}
              
                  {/* <tr>
                    <th className="text-center"> # </th>
                    <th className="text-center"> Name </th>
                    <th className="text-center"> Mobile </th>
                    <th />
                  </tr>
             
                  {state.rows.map((item, idx) => (
                    <tr id="addr0" key={idx}>
                      <td>{idx}</td>
                      <td>
                        <input
                          type="text"
                          name="name"
                          value={state.rows[idx].name}
                          onChange={handleChange(idx)}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="mobile"
                          value={state.rows[idx].mobile}
                          onChange={handleChange(idx)}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={handleRemoveSpecificRow(idx)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
               
              <button onClick={handleAddRow} className="btn btn-primary">
                Add Row
              </button>
              <button
                onClick={handleRemoveRow}
                className="btn btn-danger float-right"
              >
                Delete Last Row
              </button>
             */}
      





                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary"show={show}  onClick={handleClose} closeButton>Cancel</Button>
                    <Button onClick={sendData} variant="primary">Create</Button>
                </Modal.Footer>
            </Modal>
                                   
                            </div>
                            
                        </div> 
<Row style={{width:'125.3%'}}>
<h4 style={{marginLeft:'35px',fontWeight:'bold'}}>Catalog List</h4>


<div style={{marginLeft:'20px',background:'#dfe4ea',height:'29px',borderRadius:'10px',width:180,marginTop:'3px'}}>
                                <div>
                                    {/* <BiSort />
                                    <BiMenuAltLeft className='mr-2' /> */}
                                    <select onChange={(event)=>sethandle(event)} style={{marginLeft:'8px',marginRight:'8px',background:'#dfe4ea',borderColor:'#dfe4ea',fontWeight:'bold',marginTop:'1px',borderRadius:'9px'}}>
                                    <option style={{marginLeft:'28px'}} hidden value="">Select Costomer &nbsp;&nbsp;&nbsp;&nbsp;</option>
                                      
                                      {client.map((cli)=>(
                                       <option style={{width:50,maxWidth:30}} value={cli.id}>{cli. project_name}</option>
                                      ))}
                                     
                                        {/* <option>Date</option>
                                        <option>Size</option> */}
                                        </select>
                                   
                                </div>
                            </div> 
{/* <h5 style={{marginLeft:'20px',marginTop:'5px',background:'#dfe4ea',fontWeight:500,borderRadius:'8px',width:'183px',height:'28px'}}><b style={{marginLeft:'9px',fontWeight:500}}>Star Clients Pricing</b></h5> */}

<div style={{ marginLeft: 'auto',background:'#dfe4ea',height:'29px',borderRadius:'10px',marginTop:'3px'}}>
                                <div>
                                    <BiSort />
                                    <BiMenuAltLeft className='mr-2' />
                                    <select  style={{WebkitAppearance:'none',background:'#dfe4ea',borderColor:'#dfe4ea',fontWeight:500,marginTop:'1px',borderRadius:'9px'}}>
                                        <option>Most Recent</option>
                                        <option>Date</option>
                                        <option>Size</option>
                                        </select>
                                   
                                     <FaChevronDown className='ml-2' />
                                </div>
                            </div> 

</Row>

                        <Row style={{display:'flex',flexDirection:'row',width:'125%',marginLeft:'0px'}}>
                 {/* {products.map((pro) => ( */}
                  
                    {/* // pro.catalog_products.map((product)=>( */}
                    {/* <Col key={products.clientid} xs={12} md={4}> */}
                        <Product product={products} getProducts={getProducts} client={products.client}/>
                    {/* </Col> */}
                        {/* // )) */}
                 
                {/* ))}  */}
            </Row>




                        {/* {((Product.length === 0) && documents.length === 0) && <h3 className='m-5 text-center'>No Documents</h3>}
                        {Product.map(client => (
                            <div
                                key={client.id}
                                className="bz-card"
                                style={{ minHeight: "13rem", marginBottom: "55px", marginTop: "55px", width: "100%" }}
                            >
                                <div className='d-flex flex-row justify-content-between'>
                                    <h3 style={{ fontWeight: 'bold' }}>{client.project_name}</h3>
                                    <div>
                                        <FaChevronDown size={30} className='ml-5 mb-3' />
                                        <div className='d-flex flex-row align-items-center'>
                                            <AiOutlineFileZip size={25} className='mr-2' />
                                            <Share item='folder' id={client.id} />
                                            <SiMicrosoftexcel size={25} />
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex flex-wrap'>
                                    {client.sub_project.map(deal => (
                                        <div key={deal.id} className='ml-4 mr-2 pr-2' style={{ borderRight: '2px #909090 solid' }}>
                                            {deal.documents.map((doc, index) => (
                                                <div key={doc.id} style={{ marginTop: "10px", marginBottom: "20px" }}>
                                                    {(index < 2) && <FilePreview file={doc} />}
                                                </div>
                                            ))}
                                            <p className='text-center' style={{ fontWeight: 'bold' }}>{deal.sub_project_name}<span className='text-primary'
                                                style={{ cursor: 'pointer' }} onClick={() => history.push(`/deals/${client.id}`)}>(Show More)</span></p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))} */}
                    </Col>
                </Row>
            </Container>
        <CommonModal2 modal={commonModal2} toggle={commonToggle2} msg={msg1} />
            {/* <CommonModal3 modal={commonModal3} toggle={commonToggle3} msg={msg2} />
            <CommonModal1 modal={commonModal1} toggle={commonToggle1} msg={msg} /> */}
            {/* <ClientModal show={showClientModal} handleClose={handleClose} /> */}
        

            <Snackbar
        anchorOrigin={{
          vertical: "up",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={6000}
        width={1500}
        onClose={handleClose4}
        message={renderHTML(errorMessage)}

        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose4}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
        </div>
    )
}

export default ProductList
