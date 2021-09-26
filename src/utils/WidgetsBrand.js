import React, {useContext, useState, useEffect} from 'react';
import {CWidgetBrand, CRow, CCol} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import axios from "axios";
import {ContextApi} from "./ContextApi";
import {Button, Modal, Typography} from "@material-ui/core";
import {BeatLoader, ClipLoader} from "react-spinners";

const WidgetsBrand = (props) => {
  const {User} = useContext(ContextApi);
  const [user] = User;
  const [facebook, setFacebook] = useState({});
  const [facebookPosts, setFacebookPosts] = useState([]);
  const [linkedin, setLinkedin] = useState({});
  const [linkedinPosts, setLinkedinPosts] = useState([]);
  const [twitter, setTwitter] = useState({});
  const [twitterPosts, setTwitterPosts] = useState([]);
  const [instagram, setInstagram] = useState({});
  const [title, setTitle] = useState({});
  const [modal, setModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [value, setValue] = useState(false);
  const current_user = props.username;
  useEffect(() => {
    (async () => {
      const userData = (await axios.get(`https://connectexbackend.herokuapp.com/user/credentials?username=${current_user}`)).data.data;
      if (userData !== null) {
        await axios.get(`https://connectexbackend.herokuapp.com/facebook?email=${userData.facebook}`).then(response => {
          setFacebook(response.data.data.data)
          setFacebookPosts(response.data.data.posts)
        }).catch(error => console.log(error));
        await axios.get(`https://connectexbackend.herokuapp.com/linkedin?email=${userData.linkedin}`).then(response => {
          setLinkedin(response.data.data.data)
          setLinkedinPosts(response.data.data.posts)
        }).catch(error => console.log(error));
        await axios.get(`https://connectexbackend.herokuapp.com/twitter?username=${userData.twitter}`).then(response => {
          setTwitter(response.data.data.data)
          setTwitterPosts(response.data.data.posts)
        }).catch(error => console.log(error));
        await axios.get(`https://connectexbackend.herokuapp.com/instagram?username=${userData.instagram}`).then(response => setInstagram(response.data.data)).catch(error => console.log(error));
      }
      setValue(true);
    })()
  }, [user.email, current_user])

  const PackageDetails = () => {
    if (title === 'Facebook') {
      return <>
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
          <td>1</td>
          <td>{instagram.username}</td>
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
    } else if (title === 'Linkedin') {
      return <>
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
          {linkedinPosts.length > 0 ?
            linkedinPosts.map((linkedin, index) => {
              return <tr key={index}>
                <td>{index + 1}</td>
                <td>{linkedin.email}</td>
                <td>{linkedin.package}</td>
                <td>{linkedin.post_details}</td>
                <td>{linkedin.createdAt ? linkedin.createdAt.split('T')[0] : ''}</td>
                <td>{linkedin.updatedAt ? linkedin.updatedAt.split('T')[0] : ''}</td>
              </tr>
            })
            : null
          }
          </tbody>
        </table>
      </>
    } else if (title === 'Twitter') {
      return <table className="table table-bordered table-hover table-secondary">
        <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Package</th>
          <th>Status</th>
          <th>Posts</th>
          <th>Followers</th>
          <th>Followers Gained</th>
          <th>Follow Requests</th>
          <th>StartedAt</th>
          <th>UpdatedAt</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>1</td>
          <td>{twitter.username}</td>
          <td>{twitter.package}</td>
          <td>{twitter.status}</td>
          <td>{twitter.posts}</td>
          <td>{twitter.followers}</td>
          <td>{twitter.followers_gained}</td>
          <td>{twitter.follow_requests}</td>
          <td>{twitter.createdAt ? twitter.createdAt.split('T')[0] : ''}</td>
          <td>{twitter.updatedAt ? twitter.updatedAt.split('T')[0] : ''}</td>
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
        rightFooter="Friends"
        leftHeader={value ? String(facebook.posts ? facebook.posts : 0) : <BeatLoader color="black"/>}
        leftFooter="Posts"
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
        rightFooter="Followers"
        leftHeader={value ? String(instagram.follow_requests ? instagram.follow_requests : 0) :
          <BeatLoader color="black"/>}
        leftFooter="Follow Requests"
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
        rightHeader={value ? String(linkedin.connections ? linkedin.connections : 0) : <BeatLoader color="black"/>}
        rightFooter="Connections"
        leftHeader={value ? String(linkedin.requests ? linkedin.requests : 0) : <BeatLoader color="black"/>}
        leftFooter="Requests"
        onClick={() => handleClick('Linkedin')}
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
        rightHeader={value ? String(twitter.followers ? twitter.followers : 0) : <BeatLoader color="black"/>}
        rightFooter="Followers"
        leftHeader={value ? String(twitter.follow_requests ? twitter.follow_requests : 0) :
          <BeatLoader color="black"/>}
        leftFooter="Requested"
        color="twitter"
        onClick={() => handleClick('Twitter')}
      >
        <CIcon
          name="cib-twitter"
          height="52"
          className="my-4"
        />
      </CWidgetBrand>
    </CCol>
  </CRow>
}

export default WidgetsBrand
