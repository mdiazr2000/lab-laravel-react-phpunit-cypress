import React, {useState, useEffect} from 'react';
import {getFilesByUserEndpoint, getUploadEndpoint, API_ENDPOINT, BACKEND_URL, getUpdateFileNameEndpoint} from "../../core/api/endpoints";
import {PostUploadRequest, GetRequest, PutRequest, PostRequest} from "../../core/api/api-request";
import { useStoreon } from 'storeon/react';
import ErrorView from "../../components/error/errorview";
import NotificationView from "../../components/notification/notification";
import "./dasboard.css";
import { Container,Row,Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import Echo from "laravel-echo"
import Pusher from "pusher-js";

export default function Dashboard() {

    let navigate = useNavigate();

    const { dispatch, auth } = useStoreon('auth');
    const [fileSelected, setFileSelected] = useState(null);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [filesUser, setFilesUser] = useState(null);

    const [selectedItem, setSelectedItem] = useState(null);
    const [newName, setNewName] = useState(null);

    const options = {
        broadcaster: "pusher",
        key: "123456_key",
        cluster: "mt1",
        forceTLS: false,
        encrypted: false,
        wsHost: '127.0.0.1',
        wsPort: 6001,
        //authEndpoint is your apiUrl + /broadcasting/auth
        authEndpoint: BACKEND_URL + "/broadcasting/auth",
        // As I'm using JWT tokens, I need to manually set up the headers.
        auth: {
            headers: {
                Authorization: "Bearer " + auth.accessToken,
                Accept: "application/json"
            }
        }
    };

    const echo = new Echo(options);

    useEffect(() => {
        echo.private(`fileszipped.`+ auth.id)
            .listen('FileZipped', (e) => {
                console.log(e.fileUser.name);
                setMessage(e.fileUser.name + ' is ready for download!!');
                getAllFilesUser()
            });
    }, [])

    useEffect(() => {
        getAllFilesUser();
    }, [])

    const updateFileName = async () => {
        if (selectedItem) {
            const url = getUpdateFileNameEndpoint(selectedItem.id);
            const result = await PutRequest(url , {
                'name' : newName
            }, auth.accessToken);
            result.status === 401 && navigate('/');
            result.status !== 200 && setError(result.data.error);
            if (result.status == 200) {
                setSelectedItem(null);
                setNewName('');
                getAllFilesUser();
            }

        }

    };

    const getAllFilesUser = async () => {
        const url = getFilesByUserEndpoint();

        const result = await GetRequest(url , auth.accessToken);
        result.status === 401 && navigate('/');
        result.status !== 200 && setError(result.data.error);
        result.status == 200
        && setFilesUser(result.data.files);

    }

    const uploadFile = async () => {
        const data = new FormData()
        data.append('file', fileSelected)
        // console.log(fileSelected);
        let url = getUploadEndpoint();

        const result = await PostUploadRequest(url , data, auth.accessToken);
        result.status === 401 && navigate('/');
        (result && result.status !== 200) && setError(result.data.error);
       // (result && result.status === 200) && setMessage(result.data.message);
       // (result && result.status === 200) && getAllFilesUser();
    }


    return(
        <div style={{display: 'flex'}}>
            <div className="container-dashboard">
                {error && <ErrorView error={error}  />}
                {message && <NotificationView message={message}  />}
              <div style={{width: '900px', paddingTop: '30px'}}>
               <div><h3>Upload file</h3></div>
              <div className="form-row" style={{width: '900px'}}>
                <div className="form-group form-for-update" style={{width: '900px',
                    display: 'flex'}}>
                    <label className="text-white p-20">Select File :</label>
                    <input type="file" style={{width: '500px'}} className="form-control p-20" name="upload_file"
                           onChange={(event) => {
                               setFileSelected(event.target.files[0]);
                    }} />
                    <button type="submit" className="btn btn-dark" onClick={uploadFile}>Upload File</button>
                </div>

            </div>
                  {selectedItem && (
                      <div className="form-group label-input form-for-update">
                          <label className="p-20">Name of file</label>
                          <input style={{width: '500px'}} type="text" className="form-control p-20"
                                 value={newName}
                                 onChange={(event) => {
                                     setNewName(event.target.value);
                                 }}
                                  />
                          <button type="button" className="btn btn-dark" onClick={updateFileName}>Save</button>
                      </div>
                  ) }
                  <div></div>



                    <div style={{paddingTop:'30px'}} >
                        <Container>
                            <Row className="header-table">
                                <Col>Name</Col>
                                <Col>Status</Col>
                                <Col>User</Col>

                                <Col>Size</Col>

                                <Col>Download</Col>
                                <Col>Edit</Col>
                            </Row>
                            {
                                filesUser && filesUser.length &&  filesUser.map(item =>
                                {
                                  let hrefUrl = API_ENDPOINT + "/downloadfile/" + item.id;
                                  return <Row className="header-row-items" key={item.id}>
                                      <Col className="txt-overflow">{item.name}</Col>
                                      <Col className={item.status == 'Upload' ? 'color-upload' : 'color-compressed'} >{item.status}</Col>
                                      <Col>{item.user.name}</Col>
                                      <Col>{item.size}</Col>
                                      <Col>{item.path_zip == '' ? 'Not Download Yet' : <a href={hrefUrl}>Ready For Download! </a>}</Col>
                                      <Col><a href="#" onClick={() => {setSelectedItem(item); setNewName(item.name) }}> Edit</a></Col>
                                    </Row>
                                })
                            }


                        </Container>
                    </div>

            </div>
            </div>
        </div>
    );
}