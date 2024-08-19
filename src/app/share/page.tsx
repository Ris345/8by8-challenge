'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { PageContainer } from '@/components/utils/page-container';
import { UserContext } from '@/contexts/user-context';
import { useContextSafely } from '@/hooks/use-context-safely';
import { isSignedIn } from '@/components/guards/is-signed-in';
import { useRouter } from 'next/navigation';


export default isSignedIn(function Progress() {
  const { user, restartChallenge } = useContextSafely(
    UserContext,
    'UserContext',
  );
  const [openModal, setOpenModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const toggleInvite = useRef(null);
  const router = useRouter()


  const copyLink = () => {
    navigator.clipboard.writeText(`8by8.us/share/${user?.inviteCode}`)
    setCopied(true)
    triggershareAPI()
  }
  
  const triggershareAPI = () => {
    
    console.log('this api has been triggered')
    
  }
  
  return (
    <PageContainer>
      <h2>Invite Friends</h2>
      <button onClick={() => router.push('/progress')}>Back</button>
      <p>
        Invite friends to support your challenge by taking an action: register to vote, get election reminders or take the 8by8 challenge. If you are curious preview what they will see.
      </p>
      <div> <button onClick={copyLink}>Copy</button>: 8by8.us/share/{user?.inviteCode}</div>
    </PageContainer>
  );
});
