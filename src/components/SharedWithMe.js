import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../GlobalUrl";
import ScreenTop from "./mobileComp/ScreenTop";
import Loader from './Loader'
import FilePreview from "./DragAndDrop/FilePreview2";
import Top from "./Top";
import {
    Container,
    Row,
    Col,
} from "react-bootstrap";
import {
    FaUserCircle,
    RiUserShared2Line,
} from "react-icons/all";
import PreviewFile from "./DragAndDrop/PreviewFile";


const SharedWithMe = () => {
    const [folders, setFolders] = useState([])
    const [documents, setDocuments] = useState([])
    const [loading, setLoading] = useState(true)

    const alldocsId = useState([]);
    const alldocsPath = useState([]);

    const fetchSharedFolders = async () => {
        setLoading(true)
        const { data } = await axios.get(url + '/api/shared/documents', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        setLoading(false)
        setFolders(data.sub_projects)
        setDocuments(data.documents)
    }

    useEffect(() => {
        fetchSharedFolders()
    }, [])

    useEffect(() => {
        folders.map(folder => {
            folder.docs_set.map(doc => {
                alldocsId.push(doc.id)
                alldocsPath.push(doc.file)
            })
        })
        documents.map((doc) => {
            alldocsId.push(doc.id);
            alldocsPath.push(doc.file);
        });
        localStorage.setItem("alldocs", JSON.stringify(alldocsId.slice(2)));
        localStorage.setItem("alldocsPath", JSON.stringify(alldocsPath.slice(2)));
    }, [documents]);


    return (
        <div className='main' style={{ width: '100%' }}>
            <ScreenTop />
            <Top />
            {loading && <Loader />}
            <Container>
                <Row>
                    <Col>
                        <h1 className='text-center mt-5 mb-5 pt-3 pb-3'>Shared With Me</h1>
                        {((folders.length === 0) && documents.length === 0) && <h3 className='m-5 text-center'>No Documents</h3>}
                        {folders.map(folder => (
                            <div
                                key={folder.id}
                                className="bz-card"
                                style={{ minHeight: "13rem", marginBottom: "55px", marginTop: "55px", width: "100%" }}
                            >
                                <div>
                                    <h2 className='m-3'>{folder.sub_project_name}</h2>
                                </div>
                                <div className='d-flex flex-wrap'>
                                    {folder.docs_set.map(doc => (
                                        <div key={doc.id} className="col-12 col-md-6 col-xl-4" style={{ marginTop: "10px", marginBottom: "20px" }}>
                                            <PreviewFile file={doc} />
                                        </div>
                                    ))}
                                </div>
                                <div className='d-flex justify-content-end'>
                                    {folder.shared_by_details.map(doc => (
                                        <div key={doc.shared_by.id}>
                                            <div>
                                                <div className='text-center' style={{ fontWeight: '700' }}><RiUserShared2Line /> Shared by:</div>
                                            </div>
                                            <div>
                                                <div className='d-flex justify-content-around'>
                                                    {doc.shared_by.profile_picture ? <img src={url + doc.shared_by.profile_picture} style={{ height: '40px', width: '40px', borderRadius: '50%' }} /> :
                                                        <FaUserCircle size={30} />}
                                                    <div className='m-2' style={{ fontWeight: '500' }}>{doc.shared_by.first_name} {doc.shared_by.last_name}</div>
                                                </div>
                                                <div style={{ fontSize: '12px' }}>{doc.shared_by.email}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        {documents.length ? <h2 className='text-center m-5 p-3'>Documents</h2> : null}
                        {documents.length ? <div className='bz-card d-flex flex-wrap' style={{ minHeight: "13rem", marginBottom: "55px", marginTop: "55px", width: "100%" }}>
                            {documents.map(doc => (
                                <div key={doc.id} className="col-12 col-md-6 col-xl-4 px-0 px-md-4" style={{ marginTop: "10px", marginBottom: "20px" }}>
                                    <PreviewFile file={doc} />
                                </div>
                            ))}
                        </div> : null}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default SharedWithMe
