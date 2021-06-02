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
  const [facebookPosts, setFacebookPosts] = useState({});
  const [instagram, setInstagram] = useState({});
  const [title, setTitle] = useState({});
  const [modal, setModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [value, setValue] = useState(false);
  useEffect(() => {
    axios.get(`/facebook?email=${user.email}`).then(response => {
      setFacebook(response.data.data.data)
      setFacebookPosts(response.data.data.posts)
    }).finally(() => setValue(true));
    axios.get(`/instagram?email=${user.email}`).then(response => setInstagram(response.data.data)).finally(() => setValue(true));
  }, [user.email])

  const PackageDetails = () => {
    if (title === 'Facebook') {
      return <>
        <h4>Subscription Status <span
          className={facebook.status === "Live" ? 'text-success' : 'text-danger'}>{facebook.status}</span></h4>
        <table className="table table-bordered table-hover table-secondary">
          <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Package</th>
            <th>Post Title</th>
            <th>StartedAt</th>
            <th>UpdatedAt</th>
          </tr>
          </thead>
          <tbody>
          {facebookPosts.length > 0 ?
            facebookPosts.map((facebook, index) => {
              return <tr key={index}>
                <td>{index + 1}</td>
                <td>{facebook.email}</td>
                <td>{facebook.package}</td>
                <td>{facebook.post_details}</td>
                <td>{facebook.createdAt ? facebook.createdAt.split('T')[0] : ''}</td>
                <td>{facebook.updatedAt ? facebook.updatedAt.split('T')[0] : ''}</td>
              </tr>
            })
            : null
          }
          </tbody>
        </table>
      </>
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
          <Button onClick={() => setModal(false)} className='text-center btn-secondary'>Back</Button>
        </div>
      </Modal>
      <CWidgetBrand
        color="facebook"
        rightHeader={value ? String(facebook.friends ? facebook.friends : 0) :
          <BeatLoader color="black"/>}
        rightFooter="friends"
        leftHeader={value ? String(facebook.posts ? facebook.posts : 0) : <BeatLoader color="black"/>}
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
        rightHeader={value ? String(instagram.followers ? instagram.followers : 0) : <BeatLoader color="black"/>}
        rightFooter="followers"
        leftHeader={value ? String(instagram.follow_requests ? instagram.follow_requests : 0) :
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
