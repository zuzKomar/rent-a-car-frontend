import { Flex, Item, TabList, Tabs } from "@adobe/react-spectrum";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname.split("/")[1];
  const user: any = sessionStorage.getItem("user");

  const handleLogout = async () =>
    await fetch(`${process.env.NEST_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email: "email", password: "password" }),
      mode: "cors",
      credentials: "include",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });

  return (
    <Flex justifyContent="center" direction="column">
      {user && <h2>{`Logged as ${user!.firstName + " " + user.lastName}`}</h2>}
      <Flex direction="row" justifyContent="center">
        <Tabs
          aria-label="navigation"
          density="compact"
          selectedKey={currentPath}>
          <TabList>
            <Item key="">
              <Link to="/">Home</Link>
            </Item>
            <Item key="cars">
              <Link to="/cars">Cars</Link>
            </Item>
            <Item key="rents">
              <Link to="/rents">Rents</Link>
            </Item>
            <Item key="user">
              <Link to="/user">User</Link>
            </Item>
          </TabList>
        </Tabs>
        <>
          {user ? (
            <button onClick={() => handleLogout()}>Sign out</button>
          ) : (
            <button
              onClick={() => {
                navigate("/auth/signin");
              }}>
              Sign in
            </button>
          )}
        </>
      </Flex>
    </Flex>
  );
};

export default Navbar;
