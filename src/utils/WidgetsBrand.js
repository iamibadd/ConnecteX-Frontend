import React, {useContext, useState, useEffect} from 'react';
import {CWidgetBrand, CRow, CCol} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import axios from "axios";
import {ContextApi} from "./ContextApi";
import {Button, Modal, Typography} from "@material-ui/core";
import {BeatLoader, ClipLoader} from "react-spinners";

const WidgetsBrand = () => {
  const {User} = useContext(ContextApi);
  const [user] = User;
  const [facebook, setFacebook] = useState({});
  const [instagram, setInstagram] = useState({});
  const [title, setTitle] = useState({});
  const [modal, setModal] = useState(false);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    axios.get(`/facebook?email=${user.email}`).then(response => setFacebook(response.data.data));
    axios.get(`/instagram?email=${user.email}`).then(response => setInstagram(response.data.data));
  }, [user.email])

  const PackageDetails = () => {
    if (title === 'Facebook') {
      return <table className="table table-bordered table-hover table-secondary">
        <thead>
        <tr>
          <th>#</th>
          <th>Email</th>
          <th>Package</th>
          <th>Status</th>
          <th>Posts</th>
          <th>Friends</th>
          <th>StartedAt</th>
          <th>UpdatedAt</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{facebook._id}</td>
          <td>{facebook.email}</td>
          <td>{facebook.package}</td>
          <td>{facebook.status}</td>
          <td>{facebook.posts}</td>
          <td>{facebook.followers}</td>
          <td>{facebook.createdAt ? facebook.createdAt.split('T')[0] : ''}</td>
          <td>{facebook.updatedAt ? facebook.updatedAt.split('T')[0] : ''}</td>
        </tr>
        </tbody>
      </table>
    } else if (title === 'Instagram') {
      return <table className="table table-bordered table-hover table-secondary">
        <thead>
        <tr>
          <th>#</th>
          <th>Email</th>
          <th>Package</th>
          <th>Status</th>
          <th>Followers</th>
          <th>Followers Gained</th>
          <th>Follow Requests</th>
          <th>StartedAt</th>
          <th>UpdatedAt</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{instagram._id}</td>
          <td>{instagram.email}</td>
          <td>{instagram.package}</td>
          <td>{instagram.status}</td>
          <td>{instagram.followers}</td>
          <td>{instagram.followers_gained}</td>
          <td>{instagram.follow_requests}</td>
          <td>{instagram.createdAt ? instagram.createdAt.split('T')[0] : ''}</td>
          <td>{instagram.updatedAt ? instagram.updatedAt.split('T')[0] : ''}</td>
        </tr>
        </tbody>
      </table>
    }
  }
  const handleClick = title => {
    setTitle(title);
    setModal(true);
    setLoader(true);
    setTimeout(function () {
      setLoader(false)
    }, 500);
  }
  return <CRow>
    <CCol sm="6" lg="3">
      <Modal
        open={modal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        disableAutoFocus={true}
        className="m-auto w-75 h-50 text-center"
      >
        <div className="text-center bg-white">
          <Typography variant={'h4'} color={'primary'}>{title}</Typography>
          <br/>
          {loader ? <ClipLoader color={'black'} loading={true} size={100}/> : PackageDetails()}
          <br/>
          <Button onClick={() => setModal(false)} className='text-center btn-secondary'>Cancel</Button>
        </div>
      </Modal>
      <CWidgetBrand
        color="facebook"
        rightHeader={facebook.followers !== undefined ? String(facebook.followers) : <BeatLoader color="black"/>}
        rightFooter="friends"
        leftHeader={facebook.posts !== undefined ? String(facebook.posts) : <BeatLoader color="black"/>}
        leftFooter="posts"
        onClick={() => handleClick('Facebook')}
      >
        <CIcon
          name="cib-facebook"
          height="52"
          className="my-4"
        />
      </CWidgetBrand>
    </CCol>

    <CCol sm="6" lg="3">
      <CWidgetBrand
        color="instagram"
        rightHeader={instagram.followers !== undefined ? String(instagram.followers) : <BeatLoader color="black"/>}
        rightFooter="followers"
        leftHeader={instagram.follow_requests !== undefined ? String(instagram.follow_requests) :
          <BeatLoader color="black"/>}
        leftFooter="follow requests"
        onClick={() => handleClick('Instagram')}
      >
        <CIcon
          name="cib-instagram"
          height="52"
          className="my-4"
        />
      </CWidgetBrand>
    </CCol>

    <CCol sm="6" lg="3">
      <CWidgetBrand
        color="linkedin"
        rightHeader="500+"
        rightFooter="contracts"
        leftHeader="292"
        leftFooter="feeds"
      >
        <CIcon
          name="cib-linkedin"
          height="52"
          className="my-4"
        />
      </CWidgetBrand>
    </CCol>

    <CCol sm="6" lg="3">
      <CWidgetBrand
        rightHeader="12"
        rightFooter="events"
        leftHeader="4"
        leftFooter="meetings"
        color="gradient-warning"
      >
        <CIcon
          name="cil-calendar"
          height="52"
          className="my-4"
        />
      </CWidgetBrand>
    </CCol>
  </CRow>
}

export default WidgetsBrand
