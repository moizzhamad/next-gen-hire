import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { APP_ID, SERVER_SECRET } from './constant';

const VedioPage = () => {
  const { id } = useParams();
  const roomID = id || "interview-room";

  const [meetingLink, setMeetingLink] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    let zpInstance = null;

    const myMeeting = async (element) => {
      if (!element) return;
      const appID = APP_ID;
      const serverSecret = SERVER_SECRET;

      let userName = "Interviewer";
      try {
        const stored = localStorage.getItem('User');
        if (stored) {
          const user = JSON.parse(stored);
          if (user.name) userName = user.name;
        }
      } catch (err) {
        // ignore JSON parse error
      }

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        Date.now().toString(),
        userName
      );

      zpInstance = ZegoUIKitPrebuilt.create(kitToken);

      const link = `${window.location.origin}/room/${roomID}`;
      setMeetingLink(link);

      zpInstance.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Copy link',
            url: link,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
      });
    };

    const element = document.getElementById('meeting-container');
    if (element) {
      myMeeting(element);
    }

    return () => {
      if (zpInstance && typeof zpInstance.destroy === 'function') {
        zpInstance.destroy();
      }
    };
  }, [roomID]);

  const copyToClipboard = () => {
    if (meetingLink) {
      navigator.clipboard.writeText(meetingLink);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <div id="meeting-container" style={{ width: '100%', height: '75vh', borderRadius: '8px', overflow: 'hidden' }}></div>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
        <button 
          onClick={copyToClipboard} 
          style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {copySuccess ? 'Copied Meeting Link!' : 'Copy Meeting Link'}
        </button>
        <Link 
          to='/CandidateReview' 
          style={{ padding: '10px 20px', backgroundColor: '#e53e3e', color: '#fff', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold' }}
        >
          End Meeting & Submit Review
        </Link>
        <Link 
          to='/' 
          style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: '#fff', borderRadius: '5px', textDecoration: 'none' }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default VedioPage;
