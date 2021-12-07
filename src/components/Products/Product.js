import React, { useState } from "react";
import { Image, Modal, Button, Form, Row, Col } from "react-bootstrap";
import { url } from "../../GlobalUrl";
import { RiDeleteBin6Fill, FaEdit } from "react-icons/all";

const Product = ({ product, getProducts }) => {
  const [action, setAction] = useState(null);

  const [name, setName] = useState("");
  const [productNumber, setProductNumber] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

  const fetchProductData = (id) => {
    fetch(`${url}/api/detailProducts/${id}/`)
      .then((res) => {
        return res.json().then((data) => {
          setName(data.name);
          setProductNumber(data.product_number);
          setPrice(data.price);
          setStock(data.stock);
          setImage(data.files[0].image);
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleShow = (item, id) => {
    setAction(item);
    setShow(true);
    if (item === "edit") {
      fetchProductData(id);
    }
  };

  const deleteProduct = (id) => {
    fetch(`${url}/api/detailProducts/${id}/`, {
      method: "DELETE",
    }).then((res) => {
      return res.json().then(() => {
        handleClose();
        getProducts();
      });
    });
  };

  const updateProduct = (id) => {
    var bodyFormData = new FormData();
    bodyFormData.append("name", name);
    bodyFormData.append("product_number", productNumber);
    bodyFormData.append("stock", stock);
    bodyFormData.append("price", price);
    bodyFormData.append("files", image);
    fetch(`${url}/api/detailProducts/${id}/`, {
      method: "PATCH",
      body: bodyFormData,
    })
      .then((res) => {
        return res.json().then(() => {
          handleClose();
          getProducts();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="bw-card my-3">
        <div className="d-flex justify-content-between align-items-center">
          {product.files.length > 0 ? (
            <Image
              src={url + product.files[0]?.image}
              height={100}
              width={130}
              style={{ borderRadius: "5%" }}
            />
          ) : (
            <Image
              src="https://cdn5.vectorstock.com/i/1000x1000/57/69/product-promotion-line-icon-concept-sign-outline-vector-29875769.jpg"
              height={100}
              width={130}
              style={{ borderRadius: "5%" }}
            />
          )}
          <div>
            <h5 style={{ marginBottom: 4, padding: 0 }}>
              <strong>{product.name}</strong>
            </h5>

            <p
              style={{ fontSize: "13px", padding: 0, margin: 0 }}
              className="text-secondary"
            >
              Quantity: {product.stock}
            </p>
            <p
              style={{ fontSize: "13px", padding: 0, margin: 0 }}
              className="text-secondary"
            >
              Product Number: {product.product_number}
            </p>

            <h5 style={{ marginTop: 4 }} className="text-secondary">
              $ {product.price}
            </h5>
          </div>
          <div className="mr-3" style={{ cursor: "pointer" }}>
            <div
              className="my-2"
              onClick={() => handleShow("edit", product.id)}
            >
              <FaEdit size={20} color="gray" />
            </div>
            <div
              className="my-2"
              onClick={() => handleShow("delete", product.id)}
            >
              <RiDeleteBin6Fill size={20} color="gray" />
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {action === "delete" ? "Delete Product" : "Edit Product"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {action === "delete" ? (
            <p>Are you sure you want to delete this item.</p>
          ) : (
            <Form>
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
                </Form.Group>
              </Row>
            </Form>
          )}
        </Modal.Body>

        <Modal.Footer>
          {action === "delete" ? (
            <>
              <Button variant="secondary">No</Button>
              <Button
                onClick={() => deleteProduct(product.id)}
                variant="primary"
              >
                Yes
              </Button>
            </>
          ) : (
            <>
              <Button variant="secondary">Close</Button>
              <Button
                onClick={() => updateProduct(product.id)}
                variant="primary"
              >
                Save Changes
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Product;
