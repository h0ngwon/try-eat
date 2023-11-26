import soso from '../assets/안찜하기.png';
import likeIt from '../assets/찜하기.png';
import styled from 'styled-components';
function Like({ currentUserInfo, item }) {
    if (!currentUserInfo || !currentUserInfo.likeList) return <Heart src={soso} />;
    console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb', currentUserInfo);

    const isLiked = currentUserInfo.likeList.includes(item.id);

    return <>{isLiked ? <Heart src={likeIt} /> : <Heart src={soso} />}</>;
}

export default Like;
const Heart = styled.img`
    width: 100%;
    object-fit: cover;
`;
