import { Flex, View } from "@adobe/react-spectrum";
import logo from "../img/logo1.jpeg";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <Flex direction="column" justifyContent="center" width="100%">
      <View backgroundColor="static-black" width="100%">
        <div
          style={{
            margin: "0 auto",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}>
          <img
            src={logo}
            alt="rent a car logo"
            style={{ width: "200px", height: "100px" }}
          />
          <Navbar />
        </div>
      </View>
    </Flex>
  );
};

export default Header;
