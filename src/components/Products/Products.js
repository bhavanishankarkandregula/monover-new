import React, { useState, useEffect } from "react";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import Top from "../Top";
import ScreenTop from "../mobileComp/ScreenTop";
import { url } from "../../GlobalUrl";
import Product from "./Product";
import { MdAdd } from "react-icons/all";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [productNumber, setProductNumber] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const getProducts = () => {
    fetch(`${url}/api/createProducts`).then((res) => {
      return res.json().then((data) => {
        setProducts(data);
      });
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const addProducts = () => {
    var bodyFormData = new FormData();
    bodyFormData.append("name", name);
    bodyFormData.append("product_number", productNumber);
    bodyFormData.append("stock", stock);
    bodyFormData.append("price", price);
    bodyFormData.append("files", image);
    fetch(`${url}/api/createProducts/`, {
      method: "POST",
      body: bodyFormData,
    })
      .then((res) => {
        return res.json().then((data) => {
          console.log(data);
          handleClose();
          getProducts();
          setName("");
          setProductNumber("");
          setPrice("");
          setStock("");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="main " style={{ width: "99%" }}>
      <ScreenTop />
      <Top />
      <Row>
        <Col xs={12} md={6}>
          <div className="my-2 px-4">
            <h1>My Products</h1>
            <p className="text-secondary">
              The products added here will be able to be recognised from
              invoices and documents, Happy invoicing!
            </p>
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div className="d-flex justify-content-end align-self-center mt-5 px-3">
            <Button onClick={handleShow} variant="primary">
              <MdAdd size={25} /> Add Product
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        {products.map((product) => (
          <Col key={product.id} xs={12} md={4} className="ml-4">
            <Product product={product} getProducts={getProducts} />
          </Col>
        ))}
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form className="">
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Row>
              <Form.Group as={Col}>
                <Form.Control
                  type="text"
                  placeholder="Product Number"
                  value={productNumber}
                  onChange={(e) => setProductNumber(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Control
                  type="text"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col}>
                <Form.Control
                  type="text"
                  placeholder="Stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Control
                  type="file"
                  required
                  name="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                {/* <FileBase type="file" multiple={false}
                                    onDone={({ base64 }) => setImage(base64)} /> */}
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button onClick={addProducts} disabled="true" variant="primary">
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Products;
