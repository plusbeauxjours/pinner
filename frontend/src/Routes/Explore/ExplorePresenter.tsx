import React from "react";
import Loader from "src/Components/Loader";
import UserGrid from "../../Components/UserGrid";
import { Explore } from "src/types/api";

interface IProps {
  data?: Explore;
  loading: boolean;
  inline: boolean;
  toggleInline: () => void;
}

const ExplorePresenter: React.SFC<IProps> = ({
  data: { latestUsers: { users = null } = {} } = {},
  loading,
  inline,
  toggleInline
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && users) {
    return (
      <>
        <p onClick={toggleInline}>see all</p>
        {users && <UserGrid users={users} inline={inline} />}
      </>
    );
  } else {
    return null;
  }
};

export default ExplorePresenter;
