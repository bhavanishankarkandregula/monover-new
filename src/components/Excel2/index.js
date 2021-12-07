import axios from "axios"
import React, { useState, useEffect } from "react"
import { useAlert } from "react-alert"
import ReactDataSheet from "react-datasheet"
import { useParams } from "react-router"
import { url } from "../../GlobalUrl"
import ScreenTop from "../mobileComp/ScreenTop"
import Top from "../Top"
import "./DatatableStyles.css"
import MaterialTable from "material-table"

function Excel2() {
    const [columns, set_columns] = useState(null)
    const [data, set_data] = useState([])
    const [loading, set_loading] = useState(true)

    const { sub_project_id, sub_project_name } = useParams()
    const [state, setState] = useState({
        documents: []
    })
    const alert = useAlert()

    const handleChange = (obj) => {
        return setState({
            ...state,
            ...obj
        })
    }

    const modify_columns = (keys) => {
        const modified_columns = columns
        keys.forEach((key) => {
            if (modified_columns.some((col) => col.field === key)) return
            return modified_columns.push({ field: key, title: key })
        })
        set_columns(modified_columns)
    }

    const load_sub_project_details = () => { }


    const get_sub_project_documents = () => {
        set_loading(true)
        return axios
            .get(`${url}/api/subproject/${sub_project_id}/document/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then((res) => {
                console.log(res.data)
                handleChange({ documents: res.data })
                res.data.forEach((doc, index) => {
                    const modified_data = data
                    const row = {}
                    row.document_name = doc.document_name
                    set_columns(Object.entries(doc.document_content?.SummaryFields))
                    if (doc.document_content) {
                        const parsed = doc.document_content
                        if (parsed.length > 0) {
                            parsed.forEach((item) => {
                                const keys = Object.keys(item)
                                modify_columns(keys)
                                Object.entries(item).forEach(([key, value]) => {
                                    row[key] = value
                                })
                            })
                        }
                    } else {
                        alert.error(`No document content found in ${doc.document_name}`)
                    }
                    modified_data.push(row)
                    set_data(data)
                })
                set_loading(false)
            })
            .catch((err) => {
                console.error(err)
                set_loading(false)
                alert.error("Failed to load sub projects")
            })
    }

    // const get_document_details = () => {
    //   const urlParams = new URLSearchParams(window.location.search)
    //   const document_id = urlParams.get("document_id")
    //   return axios.get(`${url}/api/document/${document_id}/`)
    //     .then(res => {
    //       handleChange({ document_details: res.data })
    //     }).catch((err) => {
    //       console.error(err)
    //       alert.error("Failed to load document details")
    //     })
    // }

    useEffect(() => {
        get_sub_project_documents()
    }, [])

    console.log(columns, data)
    return (
        <div className="main" style={{ width: "100%" }}>
            <ScreenTop />
            <Top />
            <h1 style={{ marginTop: "20px", fontWeight: "500", fontSize: "32px" }}>{sub_project_name}</h1>
            {/* <MaterialTable
                style={{ marginTop: "30px" }}
                key={JSON.stringify(columns) + JSON.stringify(data)}
                isLoading={loading}
                title={sub_project_name}
                columns={columns}
                data={data}
                options={{
                    exportButton: true
                }}
            /> */}
            {columns && columns.map(([key, value]) => (
                { key }
            ))}
        </div>
    )
}

export default Excel2