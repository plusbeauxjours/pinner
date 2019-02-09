import React from "react";
import Loader from "../../Components/Loader";
import Photo from "../../Components/Photo";
import Wrapper from "../../Components/Wrapper";
import styled from "src/Styles/typed-components";

const SWrapper = styled(Wrapper)`
  max-width: 650px;
`;

const FeedPresenter = ({ data, loading }) => {
  if (loading) {
    return <Loader />;
  } else if (data) {
    const { feed: { cards = [] } = {} } = data;
    return (
      <SWrapper>
        {cards &&
          cards.map(card => (
            <Photo
              key={card.id}
              id={card.id}
              inline={true}
              creatorAvatar={card.creator.profile.avatar}
              creatorUsername={card.creator.username}
              location={card.location}
              photoUrl={card.file}
              likeCount={card.likeCount}
              commentCount={card.commentCount}
              caption={card.caption}
              comments={card.comments}
              createdAt={card.createdAt}
            />
          ))}
      </SWrapper>
    );
  } else {
    return null;
  }
};

export default FeedPresenter;
