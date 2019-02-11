import React from "react";
import PhotoPresenter from "./PhotoPresenter";
import Me from "../Me";
import { Mutation } from "react-apollo";
import { TOGGLE_LIKE_CARD, ADD_COMMENT } from "./PhotoQueries";
import {
  likeCard,
  likeCardVariables,
  addComment,
  addCommentVariables
} from "src/types/api";

class ToggleLikeMutation extends Mutation<likeCard, likeCardVariables> {}
class AddCommentMutation extends Mutation<addComment, addCommentVariables> {}

interface IProps {
  inline: boolean;
  creatorAvatar: string;
  creatorUsername: string;
  location: string;
  photoUrl: string;
  likeCount: number;
  commentCount: number;
  caption: string;
  createdAt: string;
  comments: any;
  isLiked: boolean;
  id: number;
}

interface IState {
  newComment: string;
  isLiked: boolean;
  likeCount: number;
  selfComments: any;
}

class PhotoContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      newComment: "",
      isLiked: props.isLiked,
      likeCount: props.likeCount,
      selfComments: []
    };
  }
  public render() {
    const {
      inline,
      creatorAvatar,
      creatorUsername,
      location,
      photoUrl,
      commentCount,
      caption,
      createdAt,
      comments,
      id
    } = this.props;
    const { newComment, isLiked, likeCount, selfComments } = this.state;
    return (
      <AddCommentMutation
        mutation={ADD_COMMENT}
        variables={{ cardId: id, message: newComment }}
        onCompleted={this.addSelfComment}
      >
        {addComment => {
          this.addComment = addComment;
          return (
            <ToggleLikeMutation
              mutation={TOGGLE_LIKE_CARD}
              variables={{ cardId: id }}
            >
              {toggleLike => {
                this.toggleLike = toggleLike;
                return (
                  <Me>
                    {me => {
                      this.currentUser = me.user.username;
                      return (
                        <PhotoPresenter
                          inline={inline}
                          creatorAvatar={creatorAvatar}
                          creatorUsername={creatorUsername}
                          location={location}
                          photoUrl={photoUrl}
                          likeCount={likeCount}
                          commentCount={commentCount}
                          caption={caption}
                          createdAt={createdAt}
                          comments={comments}
                          updateNewComment={this.updateNewComment}
                          newComment={newComment}
                          isLiked={isLiked}
                          onLikeClick={this.onLikeClick}
                          selfComments={selfComments}
                          onKeyUp={this.onKeyUp}
                        />
                      );
                    }}
                  </Me>
                );
              }}
            </ToggleLikeMutation>
          );
        }}
      </AddCommentMutation>
    );
  }
  public updateNewComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value }
    } = event;
    this.setState({
      newComment: value
    } as any);
  };
  public onKeyUp = event => {
    const { keyCode } = event;
    if (keyCode === 13) {
      this.addComment();
    } else {
      return;
    }
  };
  public onLikeClick = () => {
    const { likeCount, isLiked } = this.props;
    this.toggleLike;
    this.setState(state => {
      let likeNumber;
      if (!isLiked) {
        if (likeCount === state.likeCount) {
          likeNumber = likeCount + 1;
        } else {
          likeNumber = likeCount;
        }
      } else {
        if (likeCount === state.likeCount) {
          likeNumber = likeCount - 1;
        } else {
          likeNumber = likeCount;
        }
      }
      return {
        isLiked: !state.isLiked,
        likeCount: likeNumber
      };
    });
  };
  public addSelfComment = data => {
    const { newComment } = this.state;
    const {
      addComment: { comment }
    } = data;
    if (comment) {
      this.setState(state => {
        return {
          selfComments: [
            ...state.selfComments,
            {
              id: comment.id,
              username: comment.creator.username,
              message: newComment
            }
          ],
          newComment: ""
        };
      });
    }
  };
}

export default PhotoContainer;
