import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const HomeBtn = styled.div`
  position: fixed;
  border-radius: 15px;
  font-size: 30px;
  top: 50px;
  left: 100px;
`;

export default function Layout() {
  return (
    <>
      <HomeBtn>
        <Link to={""}>&larr; HOME</Link>
      </HomeBtn>
      <Outlet />
    </>
  );
}
