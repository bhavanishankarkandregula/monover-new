import React, { useState } from 'react'
import { Image, Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { url } from '../../GlobalUrl'
import { RiDeleteBin6Fill, FaEdit } from 'react-icons/all'
import { width } from 'dom-helpers'
import {PlusOneOutlined } from '@material-ui/icons'
//import { DeleteOutline } from 'react-icons/ti'
//import { DeleteOutline } from '@material-ui/icons/Delete'
//import {EditOutline } from '@material-ui/icons/Edit'\
import DeleteOutline from "@material-ui/icons/Delete"
import  EditOutlined  from '@material-ui/icons/Edit'
import FileCopyOutlined from '@material-ui/icons/InsertDriveFile';
import SaveIcon from '@material-ui/icons/Save';
import Product from './Product'
import CommonModal1 from "./comman"
import CommonModal2 from "./comman1"
import CommonModal3 from "./comman2"
import axios from 'axios'
const CardProduct = ({ product, getProducts ,client}) => {
    const [action, setAction] = useState(null)
    const [commonModal1, setCommonModal1] = useState(false)
    const [commonModal2, setCommonModal2] = useState(false)
    const [commonModal3, setCommonModal3] = useState(false)
// console.log(Product.catalog)
    const [name, setName] = useState('')
    const [msg, setMsg] = useState("")
    const [msg1, setMsg1] = useState("")
    const [msg2, setMsg2] = useState("")
  const commonToggle1 = () => setCommonModal1(!commonModal1)
  const commonToggle2 = () => setCommonModal2(!commonModal2)
  const commonToggle3 = () => setCommonModal3(!commonModal2)
    const [productNumber, setProductNumber] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [image, setImage] = useState(null)






    console.log("productttttttttttttttttttttttttttttttttttttttt",product)
    const [show, setShow] = useState(false)
    const handleClose = () => {
        setShow(false)
    }

    const fetchProductData = (id) => {
        fetch(`${url}/api/detailProducts/${id}/`)
            .then(res => {
                return res.json().then((data) => {
                    setName(data.name)
                    setProductNumber(data.product_number)
                    setPrice(data.price)
                    setStock(data.stock)
                    setImage(data.files[0].image)
                    getProducts()
                })
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    const handleShow = (item, id) => {
        setAction(item)
        setShow(true)
        if (item === "edit") {
            fetchProductData(id)
        }
    }

    const deleteProduct = (id) => {
        fetch(`${url}/api/detailProducts/${id}/`, {
            method: 'DELETE'
        })
            .then(res => {
                return res.json().then(() => {
                    handleClose()
                    getProducts()
                })
            })
    }
    const [open, setOpen] = React.useState(0);
    const [opened, setOpened] = React.useState();
    const [stateed, setstateed] = useState('');
const [iid,setid]=useState('')
const [indexed,setindex]=useState('')
//alert(iid)
const[refresh,setRefresh]=useState(false)


const handleClick1 = (id,catalog,index,ind) => {
    //  alert(catalog)
    setid(id)
    setindex(index)
    // alert(index)
     alert(ind)
     setstateed(catalog);
     setOpened(id)
   //setop(ind)
    // alert(iid)
setop(false)
//  if(index==0)
//  {
//     setOpen(!open);
    
//  }
//  else
//  {alert("false")} 
}


    const handleClick = (id,catalog,index,ind,from,to,pri) => {
        //  alert(catalog)
        setid(id)
        setindex(index)
        setfromqty(from)
        settoqty(to)
        setPriceed(pri)
         setstateed(catalog);
         setOpen(id)
         setop(id)
        // alert(iid)

    //  if(index==0)
    //  {
    //     setOpen(!open);
        
    //  }
    //  else
    //  {alert("false")} 
}


    const handledelete = (id) => {
        //  alert(id)
        setid(id)
        // alert(iid)
     
var result=axios.delete(`${url}/api/catalog-products/${id}/`)
getProducts()
console.log(result)
        // setOpen(!open);
       
    }

    const [state,setState]=useState({rows:[]})
    const [toqty,settoqty]=useState('')
    const [fromqty,setfromqty]=useState('')
    const [priceed,setPriceed]=useState('')
const [array,setArray]=useState([])
    const handleChange = idx => e => {
        console.log(idx)
        const { name, value } = e.target;
        const rows = [...state.rows];
        rows[idx] = {
          [name]: value
        };
        setState({
          rows
        });
        array.push({[name]:value})
        console.log(state)
      };
      const handleAddRow = () => {
        const item = {
          fromqty: "",
          toqty: "",
          price:""
        };
        setState({
          rows: [...state.rows, item]
        });
      }
     const  handleRemoveRow = () => {
        setState({
          rows: state.rows.slice(0, -1)
        });
      };



      const sendData1=()=> {
        //alert("a")
                var err = false;
                if ( fromqty == '') {
                    setMsg("Please Enter From Quantity !")
                    setCommonModal1(true)
                //   setMessage("Please Enter Deal  Name !")
                //   setCommonModal1(true)
                // alert("Please Enter From Quantity")
                  err=true
                } 
                if(toqty == '') {
                //   setMsg("Please Select Client Name!")
                //   setCommonModal(true)
                setMsg1("Please Enter to Quantity !")
                setCommonModal2(true)
                // alert("Please Enter to Quantity")
                  err=true
              
            
                }
                
                if(priceed == '') {
                    //   setMsg("Please Select Client Name!")
                    //   setCommonModal(true)
                    // alert("Please Enter price")
                    setMsg2("Please Enter Price !")
                    setCommonModal3(true)
                      err=true
                  
                
                    }
                  
                
                if(!err) {
                  handleadd1()
                  getProducts()
                //   props.toggle()
                }
              }
const handleadd1=()=>{
//     alert(iid)
// alert(stateed)

    var body={catalog:stateed,from_quantity:fromqty,to_quantity:toqty,price:priceed}
     console.log(JSON.stringify(body))
axios.put(`${url}/api/catalog-products/${iid}/`,
            { 
                // method: 'PUT',
                body:body
            })
            .then(res => {
               
                    console.log("datatdddddddddddddddddddddddddddddt",res)
// setOpen(open)
setop('')                  
setOpen('')
                    getProducts()
                    setfromqty('')
                    settoqty('')
                    setPriceed('')
                    setid('')
setstateed('')
                    // setStock('')
            
            })
            .catch((err) => {

                console.log(err);
                setOpen('')
                getProducts()
              
                alert("err")
            })





    console.log("state",body)
}

      const sendData=()=> {
        //alert("a")
                var err = false;
                if ( fromqty == '') {
                    setMsg("Please Enter From Quantity !")
                    setCommonModal1(true)
                //   setMessage("Please Enter Deal  Name !")
                //   setCommonModal1(true)
                // alert("Please Enter From Quantity")
                  err=true
                } 
                if(toqty == '') {
                //   setMsg("Please Select Client Name!")
                //   setCommonModal(true)
                setMsg1("Please Enter to Quantity !")
                setCommonModal2(true)
                // alert("Please Enter to Quantity")
                  err=true
              
            
                }
                
                if(priceed == '') {
                    //   setMsg("Please Select Client Name!")
                    //   setCommonModal(true)
                    // alert("Please Enter price")
                    setMsg2("Please Enter Price !")
                    setCommonModal3(true)
                      err=true
                  
                
                    }
                  
                
                if(!err) {
                  handleadd()
                  getProducts()
                //   props.togle()
                }
              }
const handleadd=()=>{
//     alert(iid)
// alert(stateed)

    var body={catalog:stateed,from_quantity:fromqty,to_quantity:toqty,price:priceed}
     console.log(JSON.stringify(body))
axios.put(`${url}/api/catalog-products/${iid}/`,
            { 
                // method: 'PUT',
                body:body
            })
            .then(res => {
               
                    console.log("datatdddddddddddddddddddddddddddddt",res)
// setOpen(open)
                   setOpen('')
                   setop('')
                    getProducts()
                    setfromqty('')
                    settoqty('')
                    setPriceed('')
                    setid('')
setstateed('')
                    // setStock('')
            
            })
            .catch((err) => {

                console.log(err);
                setOpen('')
                getProducts()
              
                alert("err")
            })





    console.log("state",body)
}

      const handleRemoveSpecificRow = (idx) => () => {
        const rows = [...state.rows]
        rows.splice(idx, 1)
        this.setState({ rows })
      }
    const updateProduct = (id) => {
        var bodyFormData = new FormData()
        bodyFormData.append('name', name)
        bodyFormData.append('product_number', productNumber)
        bodyFormData.append('stock', stock)
        bodyFormData.append('price', price)
        bodyFormData.append('files', image)
        fetch(`${url}/api/detailProducts/${id}/`,
            {
                method: 'PATCH',
                body: bodyFormData
            })
            .then(res => {
                return res.json().then(() => {
                    handleClose()
                    getProducts()
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

const [op,setop]=useState('')
    return (
        <div  style={{  display: "flex",
        flexDirection: "row",flexWrap:'wrap'}}>


{(product.length === 0) && <h3 style={{marginLeft:'300px'}} className='m-5 text-center'><b style={{marginLeft:'530px',marginTop:'70px'}}>No Catalog</b></h3>}
    {product.map((produc,index) => (
           
            <div  className='bw-card'
            style={{
            border: "0.5px solid #dfe6e9",
            borderRadius: 5,
            // display: "flex",
            // flexDirection: "row",
        
            marginTop:'9px',
            width:'418px',
            height:'223px',
            marginBottom:'16px',
            marginLeft:'20px'
            
          }}
          >
               {/* {produc.catalog_products.map((pro)=>( 
                 <div>   */}
              {/* <b style={{marginLeft:'21px',marginBottom:'10px',marginTop:'10px'}}>{product.name}</b> */}

                <div className="d-flex" >
                
              
                        <Image style={{ borderRadius: '5%',margin:'12px',borderRadius: '5%' ,marginLeft:'20px',marginTop:'28px' }} src='https://cdn5.vectorstock.com/i/1000x1000/57/69/product-promotion-line-icon-concept-sign-outline-vector-29875769.jpg' height={150} width={98}  /> 
                    <div style={{marginTop:'49px'}}>
                     <div  style={{}}>  
                    {produc.catalog_products.map((pro,ind)=>( 
                        <div>
                        {/* {ind<=2? */}
                         {op !==pro.id &&<div> 
                    <Row style={{marginLeft:'5px',marginTop:'7px',fontWeight:'490',fontSize:17}}>
                       
                            <b style={{fontWeight:'490',width:'138px'}}>Price ({pro.from_quantity}-{pro.to_quantity})</b><b style={{marginLeft:"0px",fontWeight:'490',width:'55px'}}>${pro.price}</b>
                            <EditOutlined style={{marginLeft:'20px',fontSize:19,marginTop:'2px',cursor:'pointer'}} onClick={()=>handleClick(pro.id,pro.catalog,index,ind,pro.from_quantity,pro.to_quantity,pro.price)} size={10} color="gray" />
                            <DeleteOutline onClick={()=>handledelete(pro.id)} style={{marginLeft:'18px',cursor:'pointer',fontSize:19,marginTop:'2px'}} />
                           
                            </Row>
                             </div>
}
{/* :<b></b>}  */}
{open===pro.id &&<div>
 <Row style={{marginTop:'10px'}}>
<input  style={{width:'75px',marginLeft:'22px',height:'20px'}} type='text'name='fromqty'  value={fromqty}
onChange={(event)=>setfromqty(event.target.value)}placeholder='qty(from)'></input>
<input  style={{width:'57px',marginLeft:'5px',height:'20px'}} type='text'name='toqty'value={toqty}
onChange={(event)=>settoqty(event.target.value)}placeholder='qty(To)'></input>
<input  style={{width:'51px',marginLeft:'5px',height:'20px'}} type='text'name='price'value={priceed}
onChange={(event)=>setPriceed(event.target.value)}placeholder='price'></input>
<SaveIcon onClick={()=>sendData()} style={{marginLeft:'17px',cursor:'pointer',fontSize:19}} />
<DeleteOutline style={{marginLeft:'19px',cursor:'pointer',fontSize:19}} />
</Row>


</div>

} 




 
                           
                             </div>
                            ))} 


{opened===index && 
<Row style={{marginTop:'10px'}}>
<input  style={{width:'75px',marginLeft:'22px',height:'20px'}} type='text'name='fromqty'  
onChange={(event)=>setfromqty(event.target.value)}placeholder='qty(from)'></input>
<input  style={{width:'57px',marginLeft:'5px',height:'20px'}} type='text'name='toqty'
onChange={(event)=>settoqty(event.target.value)}placeholder='qty(To)'></input>
<input  style={{width:'51px',marginLeft:'5px',height:'20px'}} type='text'name='price'
onChange={(event)=>setPriceed(event.target.value)}placeholder='price'></input>
<SaveIcon onClick={()=>sendData1()} style={{marginLeft:'17px',cursor:'pointer',fontSize:19}} />
<DeleteOutline  style={{marginLeft:'19px',cursor:'pointer',fontSize:19}} />
</Row>
                    }                  
                     
                        
             
                {/* </tbody>
              </table> */}
              <b onClick={()=>handleClick1(index)} style={{cursor:'pointer',background:'#7f8fa6',borderRadius:'5px',width:'800px',marginLeft:'5px'}}>
   <b style={{marginLeft:'40px',marginRight:'40px',fontWeight:'bold',color:'white',fontSize:24}}>+</b>
       
      
</b>






                                       {/* {!open?<div>
                                           {index==0?<b>f</b>:<b></b>}
                              

                                        <Row style={{marginTop:'10px'}}>
                            <input  style={{width:'75px',marginLeft:'22px',height:'20px'}} type='text'name='fromqty'  
                          onChange={(event)=>setfromqty(event.target.value)}placeholder='qty(from)'></input>
                            <input  style={{width:'57px',marginLeft:'5px',height:'20px'}} type='text'name='toqty'
                          onChange={(event)=>settoqty(event.target.value)}placeholder='qty(To)'></input>
                            <input  style={{width:'51px',marginLeft:'5px',height:'20px'}} type='text'name='price'
                          onChange={(event)=>setPriceed(event.target.value)}placeholder='price'></input>
                            <SaveIcon onClick={()=>sendData()} style={{marginLeft:'17px',cursor:'pointer',fontSize:19}} />
                            <DeleteOutline style={{marginLeft:'19px',cursor:'pointer',fontSize:19}} />
                            </Row>
                              </div>:<b></b>}              */}
                                          {/* {!open?<b>ddddddddddddddddddd</b>:<b></b>} */}
                            </div>
                            {/* {!open?<div>
                              

                            ffffffffffffff
                            </div>:<b></b>}  */}
      


                      
                    </div>
                   
                </div>
                {/* </div>
                     ))}  */}
            </div>
    ))}
        
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{action === "delete" ? "Delete Product" : "Edit Product"}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {action === "delete" ? (
                        <p>Are you sure you want to delete this item.</p>
                    ) : (
                        <Form>
                            <Form.Group>
                                <Form.Control type="text" placeholder="Product Name"
                                    value={name} onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>

                            <Row>
                                <Form.Group as={Col}>
                                    <p>From Qty1</p>
                                    <Form.Control type="text" placeholder="Product Number"
                                        value={productNumber} onChange={(e) => setProductNumber(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Control type="text" placeholder="Price"
                                        value={price} onChange={(e) => setPrice(e.target.value)}
                                    />
                                </Form.Group>
                            </Row>


                            <Row>
                                <Form.Group as={Col}>
                                    <Form.Control type="text" placeholder="Stock"
                                        value={stock} onChange={(e) => setStock(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Control
                                        type="file"
                                        required
                                        name="file"
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                </Form.Group>
                            </Row>

                        </Form>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    {action === "delete" ? (
                        <>
                            <Button variant="secondary">No</Button>
                            <Button onClick={() => deleteProduct(product.id)} variant="primary">Yes</Button>
                        </>
                    ) : (
                        <>
                            <Button variant="secondary">Close</Button>
                            <Button onClick={() => updateProduct(product.id)} variant="primary">Save Changes</Button>
                        </>
                    )}
                </Modal.Footer>
            </Modal>
           
            <CommonModal2 modal={commonModal2} toggle={commonToggle2} msg={msg1} />
            <CommonModal3 modal={commonModal3} toggle={commonToggle3} msg={msg2} />
            <CommonModal1 modal={commonModal1} toggle={commonToggle1} msg={msg} />
                  
        </div >
    )
}

export default CardProduct
