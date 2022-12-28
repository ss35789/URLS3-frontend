
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { backUrl } from '../../variable/url';
import QR from 'qrcode.react';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';

// 버튼 쓸때 여기 참고 https://mui.com/material-ui/react-button/#outlined-buttons

import {
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  TwitterShareButton,
  TwitterIcon,
  LineShareButton,
  LineIcon
} from 'react-share';
import { AccessToken } from '../../variable/token';
const Main = () => {
  const { t } = useTranslation();
  const [url, setUrl] = useState('');
  const [copyUrl, setCopyUrl] = useState('Make your URL short!');
  const [copied, setCopied] = useState(false);
  const [qrVision, setQR] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(copyUrl);
    setCopied(true);
    setQR(true);
    setTimeout(() => {
      setCopied(false);
      setQR(false);
    }, 3000);
  };
  const urlHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  }, []);
  const [toggle, setToggle] = useState(true);
  const toggleState = () => setToggle(!toggle);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post(`${backUrl}/s3/`, {
      target_url: url,
      short_by_words: toggle
    }, {
      withCredentials: true,
      headers: {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        Authorization: `Bearer ${AccessToken}`,
        'Content-Type': 'application/json',
        accept: 'application/json'
      }
    })
    //  data.s3_url!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      .then(json =>
        setCopyUrl(json.data.s3_url)
      )
      .catch(() => window.alert('에러'));
  };
  return (
        <MainContainer>
          <MainDiv>
            <form onSubmit={onSubmit}>
              <Input name="url" onChange={urlHandler} placeholder="paste here to make your URL short" style={{ height: '40px' }}/>&nbsp;
              <Button id="postUrl" type="submit" variant={'contained'} color={'primary'} >Make URL</Button>&nbsp;
              <Button onClick={toggleState} variant={'contained'} color={'secondary'} >{toggle ? 'random_encoding' : 'noun-adj_combination'}</Button>
            </form>
          </MainDiv>
          <FirstDiv style={{ backgroundColor: 'white' }}>
            <Link className="slink" style={{ height: '40px', marginTop: '20%' }}>{copyUrl}</Link>
          </FirstDiv>
          {copied ? <Button variant={'contained'} color={'success'}>{t('copied')}</Button> : <Button onClick={copy} variant={'outlined'}>{t('copy')}</Button>}
          <br/><br/>
          {qrVision ? <QR id="qr-gen" size={100} value={url} includeMargin={false} fgColor={'black'} style={{ margin: '1px' }}/> : <QRDiv></QRDiv>}

          <ThirdDiv>
            Something Here - ThirdDiv
          </ThirdDiv>
          <Br/>
          <FourthDiv>
            Technology - FourthDiv
          </FourthDiv>
          <FloatingDiv>
            <FacebookShareButton style={{ bottom: '0.5em', position: 'fixed', right: '5em' }} url={url}>
              <FacebookIcon size={30} round={true} borderRadius={24}></FacebookIcon>
            </FacebookShareButton>
            <FacebookMessengerShareButton style={{ bottom: '0.5em', position: 'fixed', right: '7em' }} url={url} appId={''}>
              <FacebookMessengerIcon size={30} round={true} borderRadius={24}></FacebookMessengerIcon>
            </FacebookMessengerShareButton>
            <TwitterShareButton style={{ bottom: '0.5em', position: 'fixed', right: '9em' }} url={url}>
              <TwitterIcon size={30} round={true} borderRadius={24}></TwitterIcon>
            </TwitterShareButton>
            <LineShareButton style={{ bottom: '0.5em', position: 'fixed', right: '11em' }} url={url}>
              <LineIcon size={30} round={true} borderRadius={24}></LineIcon>
            </LineShareButton>
            <p style={{ color: 'white', bottom: '0.05em', position: 'fixed', left: '2em', fontFamily: 'Arial', fontSize: '13px' }}>© 2022. Team-Discipline All rights reserved.</p>
          </FloatingDiv>
        </MainContainer>
  );
};
const MainContainer = styled.div`
  text-align: center;
  background-color:white;
`;
const MainDiv = styled.div`
  padding-top: 25px;
  padding-bottom: 25px;
  text-align: center;
  background-color: black;
`;

const Input = styled.input`
  display: inline-block;
  font-weight: 400;
  width: 50%;
  font-size: 20px;
  background-color: #1d1d1f;
  border-radius: 8px;
  border: 0;
  color: white;
  outline: none;
  padding-bottom: 10px;
`;

const FirstDiv = styled.div`
  display: inline-flex;
  font-weight: 400;
  outline: none;
  //width:40%;
  height:40%;
  font-size:20px;
  margin-top: 4%;
`;
const Link = styled.div`
  font-weight: 400;
  border:#1d1d1f 0.1rem solid;
  border-radius: 8px;
  outline: none;
  //width: auto;
  min-width: 500px;
  height: auto;
  margin:10px;
`;
const FloatingDiv = styled.div`
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
`;
const Br = styled.div`
  background-color: grey;
  opacity: 0.5;
  height: 0.1rem;
  width: 90%;
  margin-left:5%;
  margin-right:5%;
`;
const ThirdDiv = styled.div`
  display: inline-block;
  outline: none;
  position: center;
  width:100%;
  padding-bottom:4%;
`;
const FourthDiv = styled.div`
  display: inline-block;
  outline: none;
  position: center;
  width:100%;
  padding-top:5%;
  padding-bottom:5%;
`;

const QRDiv = styled.div`
  height: 100px;
  width: 100px;
  display: inline-block;

`;
export default Main;
